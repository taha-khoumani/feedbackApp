import React from 'react'

//styles
import styles from "@/styles/css/feedbackDetails.module.css"

export default function AddComment() {
  return (
    <form className={styles.add_comment}>
      <p className={styles.add_comment_title} >Add Comment</p>
      <textarea 
        name="" 
        id="" 
        cols="30" 
        rows="10" 
        placeholder='Type your comment here'
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
