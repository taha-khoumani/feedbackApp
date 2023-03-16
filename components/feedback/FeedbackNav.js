import React from 'react'

//next
import Link from 'next/link'
import { useRouter } from 'next/router'

//styles
import styles from "@/styles/css/feedbackDetails.module.css"

//compoents
import GoBack from '../ui/GoBack'

//auth
import { useSession } from 'next-auth/react'



export default function FeedbackNav(props) {
  const {prevRoute,isEditNeeded}= props
  const feedbackId = useRouter().query.feedbackId
  const router = useRouter()
  const {data,status} = useSession()

  const currentUser = data?.user?.userName
  const feedbackOwner = props?.feedbackOwner

  return (
    <div className={styles.feedback_nav} >
      <GoBack prevRoute={prevRoute} />
      {
        isEditNeeded && feedbackOwner === currentUser &&
        <Link href={`/feedbacks/${feedbackId}/edit`} style={{marginLeft:"auto"}} >
          <button className='button_two' >Edit Feedback</button>
        </Link>
      }
    </div>
  )
}
