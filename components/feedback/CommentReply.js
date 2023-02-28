import React from 'react'

//styles
import styles from "@/styles/css/feedbackDetails.module.css"

//next
import Image from 'next/image'

export default function CommentReply(props) {
    const {content,userName,userUsername,userImg,replyingTo,isLast} = props.replyData

    const lastStyles = {
        paddingBottom:"0",
    }

  return (
    <div className={styles.comment_replies} style={isLast ? lastStyles : {}}>
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
        <div className={`${styles.comment_content_content} reply`}>
            <p>
                <span>
                    {`@${replyingTo}`}
                </span>
                {content}
            </p>
        </div>
    </div>
  )
}
