import React from 'react'

//styles
import styles from "@/styles/css/main.module.css"

//components
import FeedbackBar from './FeedbackBar'
import FeedbackList from './FeedbackList'

export default function Main() {
  return (
    <main id={styles.main}>
      <FeedbackBar />
      <FeedbackList />
    </main>
  )
}
