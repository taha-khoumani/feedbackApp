import React from 'react'

//components
import Header from './header/Header'
import Main from './main/Main'

//styles
import styles from "@/styles/css/home.module.css"

export default function Content(props) {
  let suggestionFeedbacks = []
  let nonSuggestionFeedbacks = {
    live:0,
    planned:0,
    inProgress:0,
  };

  props.feedbacks.forEach(feedback=>{
    switch(feedback.status){
      case 'suggestion':
        suggestionFeedbacks.push(feedback)
      break;
      case 'planned':
        nonSuggestionFeedbacks.planned++
      break;
      case 'live':
        nonSuggestionFeedbacks.live++
      break;
      case 'in-progress':
        nonSuggestionFeedbacks.inProgress++
      break;
    }
  })

  return (
    <div id={styles.content} >
        <Header nonSuggestionFeedbacks={nonSuggestionFeedbacks} />
        <Main suggestionFeedbacks={suggestionFeedbacks} />
    </div>
  )
}
