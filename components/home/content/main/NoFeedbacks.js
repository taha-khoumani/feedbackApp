import React from 'react'
//next
import Image from 'next/image'
import { useRouter } from 'next/router'

//images
import noFeedback from "@/images/icons/illustration-empty.svg"

//styles
import styles from "@/styles/css/feedback.module.css"

//auth
import { useSession } from 'next-auth/react'

//state
import { useDispatch } from 'react-redux'
import { setMustSigninModal } from '@/state/slices/uiSlice'

export default function NoFeedbacks(props) {
  const {data,status} = useSession()
  const dispatch = useDispatch()
  const router = useRouter()

  function addFeedbackHandler(){   
    if(status !== "authenticated") {
        dispatch(setMustSigninModal({isOpen:true,value:'post a feedback.'}))
        return;
    }
    router.push("/feedbacks/new")
  }

  return (
    <div id={styles.no_feedback} >
        <Image id={styles.no_feedback_img} src={noFeedback} alt="no-feedbacks" />
        <p id={styles.no_feedback_title} >{`There is no feedback${props.inThisCategory ? " in this category " :" "}yet.`}</p>
        <p id={styles.no_feedback_description} >Got a suggestion? Found a bug that needs to be squashed?<br/>We love hearing about new ideas to improve our app.</p>
        <button onClick={addFeedbackHandler} className='button_two' style={{margin:"0"}}>
            + Add Feedback
        </button>
    </div>
  )
}
