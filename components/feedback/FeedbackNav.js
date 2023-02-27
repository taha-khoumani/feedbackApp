import React from 'react'
//next
import Image from 'next/image'

//images
import leftIcon from "@/images/icons/icon-arrow-left.svg"

//styles
import styles from "@/styles/css/feedbackDetails.module.css"

export default function FeedbackNav() {
  return (
    <div className={styles.feedback_nav} >
      <div>
        <Image alt='go-back-icon' src={leftIcon}/>
        <p>Go Back</p>
      </div>
      <button className='button_two' >
        Edit Feedback
      </button>
    </div>
  )
}
