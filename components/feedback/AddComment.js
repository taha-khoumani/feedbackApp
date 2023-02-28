import React from 'react'

//react
import { useRef } from 'react';

//styles
import styles from "@/styles/css/feedbackDetails.module.css"

export default function AddComment() {
  const refTextarea = useRef(null)

  function changeHeight (el){
    el.style.height = "";
    el.style.height = `${textarea.scrollHeight}px`;
  }

  return (
    <form 
      className={styles.add_comment}
      onSubmit={(e)=>{e.preventDefault()}}  
    >
      <p className={styles.add_comment_title} >Add Comment</p>
      <textarea 
        ref={refTextarea}
        name="" 
        id="textarea" 
        cols="30" 
        rows="1" 
        placeholder='Type your comment here'
        onInput={()=>changeHeight(refTextarea.current)}
      >
        
      </textarea>
      <div className={styles.chrleft_post} >
        <p className={styles.characters_left}>250 Characters left</p>
        <button className='button_two'>
          Post Comment
        </button>
      </div>
    </form>
  )
}
