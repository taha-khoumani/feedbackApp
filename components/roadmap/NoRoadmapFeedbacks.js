import React from 'react'

//next
import Image from 'next/image'
import { useRouter } from 'next/router'

//images
import noFeedback from "@/images/icons/illustration-empty.svg"

//styles
import stylesI from "@/styles/css/feedback.module.css"

//auth
import { useSession } from 'next-auth/react'

//state
import { useDispatch } from 'react-redux'
import { setMustSigninModal } from '@/state/slices/uiSlice'

export default function NoRoadmapFeedbacks() {
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
    return(
        <div id={stylesI.no_roadmap_feedback} >
            <Image id={stylesI.no_feedback_img} src={noFeedback} alt="no-feedbacks" />
            <p id={stylesI.no_feedback_title} >{`There is no roadmap feedback yet.`}</p>
            <p id={stylesI.no_feedback_description} >Got a suggestion? Found a bug that needs to be squashed?<br/>We love hearing about new ideas to improve our app.</p>
            <button onClick={addFeedbackHandler} className='button_two' style={{margin:"0"}}>
                + Add Feedback
            </button>
        </div>
    )         
}
