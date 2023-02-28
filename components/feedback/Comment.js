import React from 'react'

//components
import CommentContent from './CommentContent'
import CommentReplies from "./CommentReplies"

//styles
import styles from "@/styles/css/feedbackDetails.module.css"

export default function Comment(props) {
    const {isFirst,commentData,isLast} = props

    const ifFirstStyles = {
        border:"none",
        paddingTop:"0",
    }

    const ifLastStyles = {
        paddingBottom:"20px"
    }

  return (
    <div className={styles.comment} style={isFirst ? ifFirstStyles :  (isLast ? ifLastStyles : {})  } >
        <CommentContent
            commentContentData={{
                content:commentData.content,
                userImg:commentData.user.image,
                userName:commentData.user.name,
                userUsername:commentData.user.username,
                hasReplies:commentData?.replies,
            }}
        />
        <CommentReplies 
            commentRepliesData={commentData.replies}
        />
    </div>
  )
}
