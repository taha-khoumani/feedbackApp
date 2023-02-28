import React from 'react'

//next
import Image from 'next/image'

//styles
import styles from "@/styles/css/feedbackDetails.module.css"

export default function CommentContent(props) {
    const {content,userImg,userName,userUsername,hasReplies} = props.commentContentData

  return (
    <div className={styles.comment_content} >
        <div className={styles.comment_metaData} >
            <Image src={userImg} alt={`${userName}'s profile picture`} width={40} height={40} />
            <div className={styles.comment_userInfo} >
                <p>{userName}</p>
                <p>{`@${userUsername}`}</p>
            </div>
            <button>
                Reply
            </button>
        </div>
        <div className={`${styles.comment_content_content} comment${hasReplies?"Yes":"No"}Replies`}>
            <p>{content}</p>
        </div>
    </div>
  )
}
