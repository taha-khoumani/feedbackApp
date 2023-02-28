import React, { useRef } from 'react'

//styles
import styles from "@/styles/css/feedbackDetails.module.css"

export default function PostReply(props) {
    const {isReplyOpen,toggleReply} = props.replyStatus

    if(!isReplyOpen){return null}

    const refTextarea = useRef(null)

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
