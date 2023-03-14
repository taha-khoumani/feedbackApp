import React from 'react'

//data
import data from "@/data"

//styles
import styles from "@/styles/css/main.module.css"

//components
import FeedbackBar from './FeedbackBar'
import FeedbackList from './FeedbackList'

export default function Main(props) {
  const suggestions = props.suggestionFeedbacks


  return (
    <main id={styles.main}>
      <FeedbackBar />
      <FeedbackList feedbacks={suggestions} />
    </main>
  )
}