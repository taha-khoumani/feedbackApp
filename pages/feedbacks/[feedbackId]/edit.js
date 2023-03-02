import React from 'react'

//components
import FeedbackNav from '@/components/feedback/FeedbackNav'
import NewFeedback from '@/components/newfeedback/NewFeedback'

//styles
import styles from "@/styles/css/newandedit.module.css"

export default function edit() {
  return (
    <div id={styles.container} >
        <FeedbackNav prevRoute={"/"} />
        <NewFeedback isEdit={true} />
    </div>
  )
}

export async function getServerSideProps(context){

    return{
      props:{
        history:context.req.headers.referer
      }
    }
}