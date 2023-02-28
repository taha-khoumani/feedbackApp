import React from 'react'

//next
import { useRouter } from 'next/router'

//data
import data from "@/data.js"

//components
import Feedback from '@/components/ui/Feedback'
import AddComment from '@/components/feedback/AddComment'
import CommentsSection from '@/components/feedback/CommentsSection'
import FeedbackNav from '@/components/feedback/FeedbackNav'

//styles
import styles from "@/styles/css/feedbackDetails.module.css"

export default function feedback() {
    const feedbackId = useRouter().query.feedbackId
    const feedbacks = data.productRequests
    const requestedFeedback = feedbacks.find(feedback=> `${feedback.id}` === feedbackId )

    if(!feedbacks){
      return <h1>Loading...</h1>
    }

    if(!requestedFeedback){
      return <h1>error</h1>
    }

  return (
    <div className={styles.feedback_details} >
        <FeedbackNav />
        <Feedback data={requestedFeedback} />
        <CommentsSection comments={requestedFeedback.comments} />
        <AddComment />
    </div>
  )
}
