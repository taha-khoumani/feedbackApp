import React from 'react'
//next
import Image from 'next/image'

//images
import noFeedback from "@/images/icons/illustration-empty.svg"

//styles
import styles from "@/styles/css/feedback.module.css"

export default function NoFeedbacks(props) {

  return (
    <div id={styles.no_feedback} >
        <Image id={styles.no_feedback_img} src={noFeedback} alt="no-feedbacks" />
        <p id={styles.no_feedback_title} >{`There is no feedback${props.inThisCategory ? " in this category " :" "}yet.`}</p>
        <p id={styles.no_feedback_description} >Got a suggestion? Found a bug that needs to be squashed?<br/>We love hearing about new ideas to improve our app.</p>
        <button className='button_two' style={{margin:"0"}}>
            + Add Feedback
        </button>
    </div>
  )
}
