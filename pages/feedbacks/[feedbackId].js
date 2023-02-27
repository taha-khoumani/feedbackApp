import React from 'react'

//next
import { useRouter } from 'next/router'

//data
import data from "@/data.js"

//components
import Feedback from '@/components/ui/Feedback'
import AddComment from '@/components/feedback/AddComment'
import Comments from '@/components/feedback/Comments'
import FeedbackNav from '@/components/feedback/FeedbackNav'

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
    <div>
        <FeedbackNav />
        <Feedback data={requestedFeedback} />
        <Comments />
        <AddComment />
    </div>
  )
}
