import React from 'react'

///database
import { MongoClient } from 'mongodb'

//components
import FeedbackNav from '@/components/feedback/FeedbackNav'
import NewFeedback from '@/components/newfeedback/NewFeedback'

//styles
import styles from "@/styles/css/newandedit.module.css"

export default function edit(props) {
  return (
    <div id={styles.container} >
        <FeedbackNav prevRoute={props.history}  />
        <NewFeedback isEdit={true} data={JSON.parse(props.feedbackData)}/>
    </div>
  )
}

export async function getServerSideProps({req,params,resolvedUrl}){
  var ObjectId = require('mongodb').ObjectId; 
  const wantedFeedbackId = new ObjectId(params.feedbackId) 

  const client = await MongoClient.connect(`mongodb+srv://tagopi:${'DGakye2AgwDd8v2a'}@cluster0.8kpmakb.mongodb.net/?retryWrites=true&w=majority`)
  const feedbacks = client.db(process.env.databaseName).collection("feedbacks")
  const result = JSON.stringify(await feedbacks.findOne({_id:wantedFeedbackId}))

  return{
    props:{
      feedbackData:result,
      history:"/"
    }
  }
}