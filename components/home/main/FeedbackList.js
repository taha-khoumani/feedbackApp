import React from 'react'

//components
import Feedback from '../../ui/Feedback'
import NoFeedbacks from './NoFeedbacks'

//styles
import styles from "@/styles/css/main.module.css"

//helperFunction
import { sortFeedbacks } from '@/lib/helper-functions'

//state
import { useSelector} from 'react-redux'

export default function FeedbackList(props) {
  let {feedbacks} = props

  if(!feedbacks){
    return(
      <NoFeedbacks />
    )
  }

  //sort
  const {sortMethode} = useSelector(store=>store.ui)
  // feedbacks = sortFeedbacks(feedbacks,sortMethode)
  
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
