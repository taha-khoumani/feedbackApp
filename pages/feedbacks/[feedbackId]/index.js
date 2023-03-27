import React, { useEffect, useState } from 'react'

//metaData
import Head from 'next/head'

//components
import Feedback from '@/components/ui/Feedback'
import AddComment from '@/components/feedback/AddComment'
import CommentsSection from '@/components/feedback/CommentsSection'
import FeedbackNav from '@/components/feedback/FeedbackNav'
import MustSignInModal from '@/components/ui/MustSignInModal'

//styles
import styles from "@/styles/css/feedbackDetails.module.css"

//state
import { useDispatch, useSelector } from 'react-redux'
import { setRequestComments, setScreenWidth } from '@/state/slices/uiSlice'


//database
import { MongoClient } from "mongodb";

export default function feedback(props) {
    const {feedbackId,requestedFeedbackJSON} = props
    const [requestedFeedback,setRequestedFeedback] = useState(JSON.parse(requestedFeedbackJSON))
    const dispatch = useDispatch()
    const {requestComments} = useSelector(store=>store.ui)
    const [comments,setComments] = useState(requestedFeedback.comments)

    useEffect(()=>{
      if(requestComments !== 'pending') return;
      (async ()=>{
        const jsonResult = await fetch(`/api/get_comments/${feedbackId}`)
        const result = await jsonResult.json()
        setComments(result.comments)
        setRequestedFeedback(prev=>({...prev,comments:result.comments}))
        dispatch(setRequestComments('finished'))
      })()
    },[requestComments])

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
        <Head><title>{requestedFeedback.title}</title></Head>
        <FeedbackNav prevRoute={props.history} isEditNeeded={true} feedbackOwner={requestedFeedback.user}/>
        <Feedback data={requestedFeedback} />
        <CommentsSection feedbackId={requestedFeedback._id} comments={comments} />
        <AddComment feedbackId={requestedFeedback._id} />
        <MustSignInModal />
    </div>
  )
}

export async function getServerSideProps({req,params,resolvedUrl}){
  var ObjectId = require('mongodb').ObjectId; 
  const wantedFeedbackId = new ObjectId(params.feedbackId) 

  const client = await MongoClient.connect(`mongodb+srv://tagopi:${'DGakye2AgwDd8v2a'}@cluster0.8kpmakb.mongodb.net/?retryWrites=true&w=majority`)
  const feedbacks = client.db(process.env.DATABASE).collection("feedbacks")
  const result = JSON.stringify(await feedbacks.findOne({_id:wantedFeedbackId}))

  return{
    props:{
      requestedFeedbackJSON:result,
      history:"/",
      feedbackId:params.feedbackId,
    }
  }
}