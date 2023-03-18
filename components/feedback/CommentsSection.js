import React from 'react'

//components
import Comments from './Comments'

//styles
import styles from "@/styles/css/feedbackDetails.module.css"

export default function CommentsSection(props) {
  const {comments,feedbackId} = props

  if(!comments){return null}

  return (
    <div className={styles.comments_section}>
      <p>{comments.length} Comments</p>
      <Comments feedbackId={feedbackId} comments={comments} />
    </div>
  )
}
