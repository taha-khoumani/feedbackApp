import React, { useState } from 'react'

//next
import Image from 'next/image'

//components
import PostReply from './PostReply'

//styles
import styles from "@/styles/css/feedbackDetails.module.css"

//profile picture
import Avatar from 'react-avatar'

//auth
import { useSession } from 'next-auth/react'

//state
import { useDispatch } from 'react-redux'
import { setMustSigninModal } from '@/state/slices/uiSlice'

export default function CommentContent(props) {
    const {content,userImg,userName,userUsername,hasReplies,feedbackId,commentId} = props.commentContentData
    const [isReplyOpen,toggleReply] = useState(false)

    const dispatch = useDispatch()

    //auth
    const {data,status} = useSession()

    function onClickHandler(){
        //auth
        if(!isReplyOpen && status !== 'authenticated'){
            dispatch(setMustSigninModal({isOpen:true,value:'reply to a comment.'}))
            return;
        }

        toggleReply(!isReplyOpen)
    }
    console.log(typeof content)
  return (
    <div className={styles.comment_content} >
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
                onClick={onClickHandler}
            >
                {isReplyOpen ? 'Cancel' : 'Reply'}
            </button>
        </div>
        <div className={`${styles.comment_content_content} comment${hasReplies?"Yes":"No"}Replies`}>
            <p>{content}</p>
            <PostReply commentId={commentId} feedbackId={feedbackId} replyingTo={userUsername} replyStatus={{isReplyOpen,toggleReply:toggleReply}} />
        </div>
    </div>
  )
}
