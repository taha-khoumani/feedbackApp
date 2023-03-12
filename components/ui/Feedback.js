  import React from 'react'

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
import { useSelector } from 'react-redux';

export default function Feedback(props) {
    const {title,description,category,upvotes,comments,id} = props.data

    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    const {screenWidth,isSortOpen} = useSelector(store=>store.ui)

    function upvoteHandler (e){
        e.stopPropagation()
    }

    const router = useRouter()

    function feedbackOnClickHandler(){
        if(props.isLink) router.push(`/feedbacks/${id}`)
    }


    const desktopComponent = (
        <div 
            className={`${styles.feedback} ${props?.customClass || ""}`} 
            style={props.customStyles ? props.customStyles :{}} 
            onClick={feedbackOnClickHandler}
        >
            <div className={styles.upvotes} >
                <button
                    onClick={(e)=> upvoteHandler(e)}
                >
                    <Image src={upvotesIcon} alt='upvote-icon'/>
                    {upvotes}
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
                <div className={styles.upvotes} >
                    <button
                        onClick={(e)=> upvoteHandler(e)}
                    >
                        <Image src={upvotesIcon} alt='upvote-icon'/>
                        {upvotes}
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
