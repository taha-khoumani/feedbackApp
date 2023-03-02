import React from 'react'

//next
import Link from 'next/link'
import { useRouter } from 'next/router'

//styles
import styles from "@/styles/css/feedbackDetails.module.css"
import GoBack from '../ui/GoBack'



export default function FeedbackNav(props) {
  const {prevRoute,isEditNeeded}= props
  const feedbackId = useRouter().query.feedbackId

  return (
    <div className={styles.feedback_nav} >
      <GoBack prevRoute={prevRoute} />
      {
        isEditNeeded &&
        <Link href={`/feedbacks/${feedbackId}/edit`} style={{marginLeft:"auto"}} >
          <button className='button_two' >
            Edit Feedback
          </button>
        </Link>
      }
    </div>
  )
}
