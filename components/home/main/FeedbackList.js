import React from 'react'

//components
import Feedback from '../../ui/Feedback'
import NoFeedbacks from './NoFeedbacks'

//styles
import styles from "@/styles/css/main.module.css"

export default function FeedbackList(props) {
  const {feedbacks} = props

  if(!feedbacks){
    return(
      <NoFeedbacks />
    )
  }
  
  const feedbacksEls = feedbacks.map(feedback => 
    <Feedback 
      data={feedback} 
      key={feedback.id}
    />
  )

  return (

    <div id={styles.feedback_list}>
      {feedbacksEls}
    </div>
  )
}
