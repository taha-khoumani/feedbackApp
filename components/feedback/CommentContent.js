import React, { useState } from 'react'

//next
import Image from 'next/image'

//components
import PostReply from './PostReply'

//styles
import styles from "@/styles/css/feedbackDetails.module.css"

export default function CommentContent(props) {
    const {content,userImg,userName,userUsername,hasReplies} = props.commentContentData
    const [isReplyOpen,toggleReply] = useState(false)

  return (
    <div className={styles.comment_content} >
        <div className={styles.comment_metaData} >
            <Image src={userImg} alt={`${userName}'s profile picture`} width={40} height={40} />
            <div className={styles.comment_userInfo} >
                <p>{userName}</p>
                <p>{`@${userUsername}`}</p>
            </div>
            <button
                onClick={()=>toggleReply(!isReplyOpen)}
            >
                {isReplyOpen ? 'Cancel' : 'Reply'}
            </button>
        </div>
        <div className={`${styles.comment_content_content} comment${hasReplies?"Yes":"No"}Replies`}>
            <p>{content}</p>
            <PostReply replyStatus={{isReplyOpen,toggleReply}} />
        </div>
    </div>
  )
}
