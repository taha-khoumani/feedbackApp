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


export default function feedback(props) {
    const feedbackId = useRouter().query.feedbackId
    const feedbacks = data.productRequests
    const requestedFeedback = feedbacks.find(feedback=> `${feedback.id}` === feedbackId )

    const dispatch = useDispatch()

    useEffect(()=>{
      dispatch(setScreenWidth(window.innerWidth))

      function cleanup (){
        dispatch(setScreenWidth(window.innerWidth))
      }

      window.addEventListener('resize',cleanup)
    },[])

    if(!feedbacks){
      return <h1>Loading...</h1>
    }

    if(!requestedFeedback){
      return <h1>error</h1>
    }

  return (
    <div className={styles.feedback_details} >
        <FeedbackNav prevRoute={props.history} />
        <Feedback data={requestedFeedback} />
        <CommentsSection comments={requestedFeedback.comments} />
        <AddComment />
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