import React from 'react'

//components
import Feedback from '../../../ui/Feedback'
import NoFeedbacks from './NoFeedbacks'

//styles
import styles from "@/styles/css/main.module.css"

//helperFunction
import { sortFeedbacks } from '@/lib/helper-functions'

//state
import { useSelector} from 'react-redux'

export default function FeedbackList(props) {
  let {feedbacks} = props

  if(feedbacks.length === 0) {
    console.log("no shit")
    return <NoFeedbacks />
  }

  //filter&sort
  const {sortMethode,filter} = useSelector(store=>store.ui) 
  if(filter !== "all" ) {feedbacks = feedbacks.filter(feedback=>feedback.category === filter)}
  feedbacks = sortFeedbacks(feedbacks,sortMethode)
  
  if(feedbacks.length === 0) {
    console.log("no shit")
    return <NoFeedbacks inThisCategory={true} />
  }

  const feedbacksEls = feedbacks.map(feedback => 
    <Feedback 
      data={feedback} 
      key={feedback.id}
      isLink={true}
      customClass={'onHoverStyles'}
    />
  )

  return (

    <div id={styles.feedback_list}>
      {feedbacksEls}
    </div>
  )
}
