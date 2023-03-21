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

//backend
import { authOptions } from '@/pages/api/auth/[...nextauth]'
import { getServerSession } from "next-auth/next"

export async function getServerSideProps(context) {
  //if not auth
  const session = await getServerSession(context.req, context.res, authOptions)
  if (!session) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }

  //if current user !== feedback's owner
  var ObjectId = require('mongodb').ObjectId; 
  const wantedFeedbackId = new ObjectId(context.params.feedbackId) 
  const client = await MongoClient.connect(`mongodb+srv://tagopi:${'DGakye2AgwDd8v2a'}@cluster0.8kpmakb.mongodb.net/?retryWrites=true&w=majority`)
  const feedbacks = client.db(process.env.DATABASE).collection("feedbacks")
  let result = await feedbacks.findOne({_id:wantedFeedbackId})
  if(result.user !== session.user.userName){
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }


  //if everything is ok
  result = JSON.stringify(result)
  return{
    props:{
      feedbackData:result,
      history:"/"
    }
  }
}