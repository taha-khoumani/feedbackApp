import React from 'react'

//components
import FeedbackNav from '@/components/feedback/FeedbackNav'
import NewFeedback from '@/components/newfeedback/NewFeedback'

//styles
import styles from "@/styles/css/newandedit.module.css"
import GoBack from '@/components/ui/GoBack'

export default function New(props) {
  return (
    <div id={styles.container} >
        <GoBack prevRoute={"/"} />
        <NewFeedback />
    </div>
  )
}