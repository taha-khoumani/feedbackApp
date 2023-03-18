import React from 'react'

//components
import Comment from './Comment'

//styles
import styles from "@/styles/css/feedbackDetails.module.css"

export default function Comments(props) {
  const {comments,feedbackId} = props

  const commentsEls = comments.map((comment,index,comments)=>
    <Comment 
      isFirst={index === 0 ? true : false}
      isLast={index === comments.length-1 ? true : false }
      commentData={comment}
      key={comment.id}
      feedbackId={feedbackId}
    />
  )

  return (
    <div className={styles.comments} >
      {commentsEls}
    </div>
  )
}
