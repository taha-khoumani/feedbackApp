import React, { useState } from 'react'

//styles
import styles from "@/styles/css/feedbackDetails.module.css"

//next
import Image from 'next/image'
import PostReply from './PostReply'

//components
import Avatar from 'react-avatar'

//auth
import { useSession } from 'next-auth/react'

//state
import { useDispatch } from 'react-redux'
import { setMustSigninModal } from '@/state/slices/uiSlice'

export default function CommentReply(props) {
    const {feedbackId,commentId,replyData} = props
    const {content,userName,userUsername,userImg,replyingTo,isLast} = replyData
    const {status,data} = useSession()
    const [isReplyOpen,toggleReply] = useState(false)
    const dispatch = useDispatch()

    const lastStyles = {
        paddingBottom:"0",
    }

    function onToggleReplyHandler(){
        //auth
        if(status !== 'authenticated'){
            dispatch(setMustSigninModal({isOpen:true,value:'reply to a reply.'}))
            return;
        }
        toggleReply(!isReplyOpen)
    }

  return (
    <div className={styles.comment_replies} style={isLast ? lastStyles : {}}>
        <div className={styles.comment_metaData} >
            {
            userImg ?
            <Image src={userImg} alt={`${userName}'s profile picture`} width={40} height={40} /> :
            <Avatar 
                name={userUsername}
                size={40} 
                round={true} 
                textSizeRatio={2} 
            /> 
           }
            <div className={styles.comment_userInfo} >
                <p>{userName}</p>
                <p>{`@${userUsername}`}</p>
            </div>
            <button
                onClick={onToggleReplyHandler}
            >
                {isReplyOpen ? 'Cancel' : 'Reply'}
            </button>
        </div>
        <div className={`${styles.comment_content_content} reply`}>
            <p>
                <span className={styles.username}>
                    {`@${replyingTo}`}
                </span>
                {content}
            </p>
            <PostReply feedbackId={feedbackId} commentId={commentId} replyingTo={userUsername} replyStatus={{isReplyOpen,toggleReply}} />
        </div>
    </div>
  )
}
