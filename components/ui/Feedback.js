import React, { useEffect, useRef, useState } from 'react'

//next
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';

//styles
import styles from "@/styles/css/feedback.module.css"

//images
import commentsIcon from "@/images/icons/icon-comments.svg"
import upvotesIcon from "@/images/icons/icon-arrow-up.svg"

//state
import { useDispatch, useSelector } from 'react-redux';
import { setMustSigninModal } from '@/state/slices/uiSlice';

//auth
import { useSession } from 'next-auth/react';

export default function Feedback(props) {
    const {title,description,category,upvotes,comments,_id} = props.data

    function capitalizeFirstLetter(string) {
        return string?.charAt(0).toUpperCase() + string?.slice(1);
    }

    const {screenWidth,isSortOpen} = useSelector(store=>store.ui)
    const [localeUpvotes,setLocaleUpvotes] = useState(upvotes)
    const [didUserUpvote,toggleUpvote] = useState()

    const dispatch = useDispatch()

    //auth
    const {data,status} = useSession() 
    const [auth,setAuth] = useState('')
    useEffect(()=>{
        if (status !== 'authenticated') return;
        setAuth(data.user.userName)
        toggleUpvote(localeUpvotes.from.find(user=>user === data.user.userName) === data.user.userName )
    },[status,localeUpvotes])

    async function onUpvoteHandler(e){
        e.stopPropagation()

        //auth
        if(status !== 'authenticated') {
            dispatch(setMustSigninModal({isOpen:true,value:'upvote a feedback.'}))
            return;
        }

        //update ui directly for better UX 
        setLocaleUpvotes(prev => ({
            length:  !didUserUpvote ? prev.length + 1 : prev.length - 1 ,
            from: !didUserUpvote ? prev.from.concat(auth) : prev.from.filter(username=> username !== auth)
        }))

        // post data in database
        const JSONresultPATCH = await fetch('/api/post_upvotes',{
            method:"PATCH",
            body:JSON.stringify({
                action:!didUserUpvote,
                from:auth,
                feedbackId:_id,
            }),
            headers:{
                'Content-Type':'application/json',
            }
        })
        const resultPATCH = await JSONresultPATCH.json()

        //handle error
        if(!JSONresultPATCH.ok){
            //revert the changes:
            setLocaleUpvotes(prev => ({
                length:  !didUserUpvote ? prev.length - 1 : prev.length + 1 ,
                from: !didUserUpvote ? prev.from.filter(username=> username !== auth) :  prev.from.concat(auth)
            }))
            //feedback
            alert(resultPATCH.message);
            return;
        }

        //get data from database
        const JSONresultGET = await fetch(`/api/get_upvotes/${_id}`)
        const resultGET = await JSONresultGET.json()

        //sync UI with database
        setLocaleUpvotes(resultGET.upvotes)
    }

    const router = useRouter()

    function feedbackOnClickHandler(){
        if(props.isLink) router.push(`/feedbacks/${_id}`)
    }


    const desktopComponent = (
        <div 
            className={`${styles.feedback} ${props?.customClass || ""}`} 
            style={props.customStyles ? props.customStyles :{}} 
            onClick={feedbackOnClickHandler}
        >
            <div className={styles.upvotes} >
                <button onClick={onUpvoteHandler} className={didUserUpvote?styles.upvoteOn:""} >
                    <i className="fa-solid fa-angle-up"></i>
                    {localeUpvotes.length}
                </button>
            </div>
            <div className={styles.infos} >
                <p className={styles.title}>{title}</p>
                <p className={styles.description}>{description}</p>
                <p className={styles.category}>{capitalizeFirstLetter(category)}</p>
            </div>
            <div className={styles.comments}>
                <Image alt='comments-icons' src={commentsIcon}/>
                <p>{comments ? comments.length : 0}</p>
            </div>
        </div>
    )

    const mobileComponent = (
        <div 
            className={`${styles.feedback_mobile} ${props?.customClass || ""}`} 
            style={props.customStyles ? props.customStyles :{}} 
            onClick={feedbackOnClickHandler}
        >
            <div className={styles.infos} >
                <p className={styles.title}>{title}</p>
                <p className={styles.description}>{description}</p>
                <p className={styles.category}>{capitalizeFirstLetter(category)}</p>
            </div>
            <div className={styles.upvotes_comments}>
                <div className={styles.upvotes}>
                    <button onClick={onUpvoteHandler}  className={didUserUpvote?styles.upvoteOn:""}>
                        <i className="fa-solid fa-angle-up"></i>
                        {localeUpvotes.length}
                    </button>
                </div>
                <div className={styles.comments}>
                    <Image alt='comments-icons' src={commentsIcon}/>
                    <p>{comments ? comments.length : 0}</p>
                </div>
            </div>
        </div>
    )

    if(props.mobileMode) return mobileComponent 
    
    else return screenWidth > 768 ? desktopComponent : mobileComponent
}
