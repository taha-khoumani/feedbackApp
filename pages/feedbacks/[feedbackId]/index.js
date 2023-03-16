import React, { useEffect } from 'react'

//next
import { useRouter } from 'next/router'

//data
import data from "@/data.js"

//components
import Feedback from '@/components/ui/Feedback'
import AddComment from '@/components/feedback/AddComment'
import CommentsSection from '@/components/feedback/CommentsSection'
import FeedbackNav from '@/components/feedback/FeedbackNav'

//styles
import styles from "@/styles/css/feedbackDetails.module.css"

//state
import { useDispatch } from 'react-redux'
import { setScreenWidth } from '@/state/slices/uiSlice'

//database
import { MongoClient } from "mongodb";

export default function feedback(props) {
    const requestedFeedback = JSON.parse(props.requestedFeedback)
    const dispatch = useDispatch()

    useEffect(()=>{
      dispatch(setScreenWidth(window.innerWidth))

      function cleanup (){
        dispatch(setScreenWidth(window.innerWidth))
      }

      window.addEventListener('resize',cleanup)
    },[])

    if(!requestedFeedback){
      return <h1>error</h1>
    }
  return (
    <div className={styles.feedback_details} >
        <FeedbackNav prevRoute={props.history} isEditNeeded={true} feedbackOwner={requestedFeedback.user} />
        <Feedback data={requestedFeedback} />
        <CommentsSection comments={requestedFeedback.comments} />
        <AddComment />
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
      requestedFeedback:result,
      history:"/"
    }
  }
}