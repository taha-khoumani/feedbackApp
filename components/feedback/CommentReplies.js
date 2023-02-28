import React from 'react'

import CommentReply from "./CommentReply"

export default function CommentReplies(props) {
  const {commentRepliesData} = props

  if(!commentRepliesData){return null}

  const commentRepliesEls = commentRepliesData.map((reply,index,replies)=>{
    return(
      <CommentReply
        key={index}
        replyData={{
          content:reply.content,
          userImg:reply.user.image,
          userName:reply.user.name,
          userUsername:reply.user.username,
          replyingTo:reply.replyingTo,
          isLast: (index === replies.length-1) ,
        }}
      />
    )
  })

  return (
    <div>
      {commentRepliesEls}
    </div>
  )
}
