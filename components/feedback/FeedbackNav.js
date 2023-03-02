import React from 'react'
//next
import Image from 'next/image'
import Link from 'next/link'

//images
import leftIcon from "@/images/icons/icon-arrow-left.svg"

//styles
import styles from "@/styles/css/feedbackDetails.module.css"

export default function FeedbackNav(props) {
  const {prevRoute,isEditNeeded}= props

  return (
    <div className={styles.feedback_nav} >
      <Link href={prevRoute} style={{textDecoration:"none"}}>
        <div>
          <Image alt='go-back-icon' src={leftIcon}/>
          <p>Go Back</p>
        </div>
      </Link>
      {
        isEditNeeded &&
        <Link href={`/feedbacks/edit`} style={{marginLeft:"auto"}} >
          <button className='button_two' >
            Edit Feedback
          </button>
        </Link>
      }
    </div>
  )
}
