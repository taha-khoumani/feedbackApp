import React, { useEffect, useRef, useState } from 'react'

//next
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'

//images
import plus from "@/images/icons/icon-new-feedback.svg"
import up from "@/images/icons/icon-arrow-up.svg"
import down from "@/images/icons/icon-arrow-down.svg"
import edit from "@/images/icons/icon-edit-feedback.svg"

//styles
import styles from "@/styles/css/newandedit.module.css"

//auth
import { getSession} from 'next-auth/react'

//helper-function
import { verifyFeedback } from '@/lib/helper-functions'

//components
import AuthFeedback from '../ui/AuthFeedback'

export default function NewFeedback(props) {
    if(!props.data && props.isEdit ){
        return <h1>this feedback doesn't exist</h1>
    }

    const [isCatOpen,toggleCat] = useState(false)
    const router = useRouter()

    //user validation feedback
    const [feedback,setFeedback] = useState({})

    const [feedbackData,setFeedbackData] = useState({
        title: props.isEdit ? props.data.title :  "" ,
        user:"",
        category: props.isEdit ? props.data.category : "feature",
        upvotes:{
            length:0,
            from:[]
        },
        status:"suggestion",
        description:props.isEdit ? props.data.description :  "" ,
        comments:[],
    })

    const refTextarea = useRef(null)

    function changeHeight (el){
      el.style.height = "";
      el.style.height = `${el.scrollHeight}px`;
    }

    function setCatHandler (e,cat){
        setFeedbackData(prev=>({
            ...prev,
            category:cat
        }))
        toggleCat(false)
        e.stopPropagation()
    }
    
    function toggleOff(){
        if(document.querySelector("#newandedit_filter_options___5rDB")){
            toggleCat(false)
        }
    }

    function capitalizeFirstLetter(string) {
        return string?.charAt(0).toUpperCase() + string?.slice(1);
    }

    useEffect(()=>{
        document.body.addEventListener("click",toggleOff);
        (async function getUserData() {
            const session = await getSession()
            setFeedbackData(prev=>({
                ...prev,
                user:session.user.userName,
            }))
        })();
        return () => document.body.removeEventListener("click",toggleOff)
    },[])

    function onChangeHandler(e){
        const el = e.target
        setFeedbackData(prev=>({
            ...prev,
            [el.name]:el.value
        }))
    }

    async function onSubmitHandler(e){
        e.preventDefault()

        if(verifyFeedback(feedbackData).status === 'error'){
            setFeedback(verifyFeedback(feedbackData))
            return;
        }

        //pending
        setFeedback({status:'pending',message:`${props.isEdit ? 'Updating' : 'Adding'} feedback ...`})

        //post
        const result = await fetch(`/api/${props.isEdit ? 'edit' : 'new'}`,{
            method: props.isEdit ? "PUT" : "POST",
            body:JSON.stringify({
                feedbackData:feedbackData,
                _id:props?.data?._id
            }),
            headers:{
                'Content-Type':'application/json',
            }
        })
        const jsonResult = await result.json()

        //if error
        if(jsonResult.status !== 200){
            setFeedback({status:'error',message:jsonResult.message})
            return;
        }

        //else
        setFeedback({status:'succes',message:jsonResult.message})
        setTimeout(()=>router.push(`/feedbacks/${jsonResult.newFeedbackId}`),450)
    }

    async function onDeleteHandler(e){
        //pending
        setFeedback({status:'pending',message:'Deleting feedback ...'})

        //post
        const result = await fetch(`/api/delete`,{
            method: 'DELETE',
            body:JSON.stringify({
                _id: props?.data?._id
            }),
            headers:{
                'Content-Type':'application/json',
            }
        })
        const jsonResult = await result.json()

        if(!result.ok){
            setFeedback({status:'error',message:jsonResult.message})
            return;
        }


        setTimeout(()=>router.push('/'),450)
    }

  return (
    <div id={styles.content} >
        <Image src={props.isEdit ? edit : plus} alt={'plus-icon'} width={56} height={56} />
        <h1>
            {   
                props.isEdit ?
                `Editing ‘${props.data.title}‘` :
                'Create New Feedback'
            }
        </h1>
        <form onSubmit={onSubmitHandler} >
            <div className={styles.inputgroup} >
                <label className={styles.inputtitle} htmlFor="feedback_title">Feedback Title</label>
                <label className={styles.inputdescription} htmlFor="feedback_title">Add a short, descriptive headline</label>
                <input 
                    style={{margin:0}} 
                    className='textarea_one' 
                    type="text" 
                    name="title"
                    id='feedback_title'
                    value={feedbackData.title}
                    onChange={onChangeHandler}
                />
            </div>
            <div className={styles.inputgroup} >
                <label className={styles.inputtitle}>Category</label>
                <label className={styles.inputdescription}>Choose a category for your feedback</label>
                <div className={styles.cat} >
                    <div 
                        onClick={(e)=>{e.stopPropagation();toggleCat(!isCatOpen)}} 
                        className='textarea_one' 
                        style={{cursor:"pointer",margin:0,display:"flex",alignItems:"center"}} 
                    >
                        <p style={{margin:"0 auto 0 0"}} >
                            
                            {
                                //if the category is UI or UX "wich have a lenght of 2 " toUpperCase the whole category 
                                //if it's not : upper case only the first letter
                                feedbackData.category.length === 2 ? 
                                feedbackData.category.toUpperCase() : 
                                capitalizeFirstLetter(feedbackData.category)
                            }
                        </p>
                        <Image src={isCatOpen ? up : down} alt='arrow' />
                    </div>
                    {
                        isCatOpen &&
                        <div id={styles.filter_options}>
                            <p onClick={(e)=>setCatHandler(e,"feature")}>Feature {feedbackData.category === "Feature" && <i className="fa-sharp fa-solid fa-check"></i>}</p>
                            <p onClick={(e)=>setCatHandler(e,"ui")}>UI {feedbackData.category === "UI" && <i className="fa-sharp fa-solid fa-check"></i>}</p>
                            <p onClick={(e)=>setCatHandler(e,"ux")}>UX {feedbackData.category === "UX" && <i className="fa-sharp fa-solid fa-check"></i>}</p>
                            <p onClick={(e)=>setCatHandler(e,"enhancement")}>Enhancement {feedbackData.category === "Enhancement" && <i className="fa-sharp fa-solid fa-check"></i>}</p>
                            <p onClick={(e)=>setCatHandler(e,"bug")}>Bug {feedbackData.category === "Bug" && <i className="fa-sharp fa-solid fa-check"></i>}</p>
                        </div>
                    }
                </div> 
            </div>
            <div className={styles.inputgroup} >
                <label className={styles.inputtitle} >Feedback Detail</label>
                <label className={styles.inputdescription} >Include any specific comments on what should be improved, added, etc.</label>
                <textarea 
                    style={{margin:0}} 
                    onInput={()=>changeHeight(refTextarea.current)} 
                    ref={refTextarea} 
                    className='textarea_one' 
                    cols="30" 
                    rows="1"
                    name="description"
                    value={feedbackData.description} 
                    onChange={onChangeHandler}
                ></textarea>
            </div>
            { Object.keys(feedback).length !== 0 && <AuthFeedback data={feedback} />}
            <div className={styles.button_div} style={props.isEdit ? {justifyContent:"space-between"} : {}} >
                {   props.isEdit 
                        ?
                    <>
                        <button className='button_delete' onClick={onDeleteHandler}  type='button'>Delete</button> 
                        <div className={styles.button_div} >
                            <Link href={"/"} ><button className='button_three'  type='button'>Cancel</button></Link>
                            <button className='button_two' type='submit' >Save Changes</button>
                        </div>
                    </>
                        :
                    <>
                        <Link href={"/"} ><button className='button_three'  type='button'>Cancel</button></Link>
                        <button className='button_two'  >Add Feedback</button>
                    </>
                }
            </div>
        </form>
    </div>
  )
}
