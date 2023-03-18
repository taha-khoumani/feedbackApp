import React, { useEffect, useRef, useState } from 'react'

//styles
import styles from "@/styles/css/feedbackDetails.module.css"

//auth
import { useSession } from 'next-auth/react'

export default function PostReply(props) {
    const {replyingTo,replyStatus} = props
    const {isReplyOpen,toggleReply} = replyStatus
    const {data,status} = useSession()
    const [reply,setReply] = useState({
        content:"",
        replyingTo:'',
        user:{
            name:'',
            username:'',
        }
    })

    useEffect(()=>{
        if(status !== "authenticated") return;
    
        setReply(prev=>({
          ...prev,
          user:{
            name: `${data.user.firstName} ${data.user.lastName}`,
            username: data.user.userName,
          }
        }))
    
    },[status])

    const refTextarea = useRef()
    
    if(!isReplyOpen){return null}

    function changeHeight (el){
      el.style.height = "";
      el.style.height = `${el.scrollHeight}px`;
    }

  return (
        <form 
            className={styles.post_reply}
            onSubmit={(e)=>{
                e.preventDefault()
                toggleReply(false)
            }}  
        >
            <textarea 
                className='textarea_one'
                ref={refTextarea}
                name="" 
                id="textarea" 
                cols="20" 
                rows="1" 
                placeholder='Type your comment here'
                onInput={()=>changeHeight(refTextarea.current)}
            >
            </textarea>
            <button className='button_two'>
                Post Reply
            </button>
        </form>
    )
}
