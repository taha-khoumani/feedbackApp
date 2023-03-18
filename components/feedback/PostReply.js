import React, { useEffect, useRef, useState } from 'react'

//styles
import styles from "@/styles/css/feedbackDetails.module.css"

//auth
import { useSession } from 'next-auth/react'
import { nanoid } from 'nanoid'

//components
import AuthFeedback from '../ui/AuthFeedback'

//helpers
import { verifyComment } from '@/lib/helper-functions'

export default function PostReply(props) {
    const {replyingTo,replyStatus,feedbackId,commentId} = props
    const {isReplyOpen,toggleReply} = replyStatus
    const {data,status} = useSession()
    const [feedback,setFeedback] = useState({})
    const [reply,setReply] = useState({
        id:nanoid(),
        content:"",
        replyingTo:replyingTo,
        user:{
            name:'',
            username:'',
        }
    })

    function onChangeHandler(e){
        const el = e.target
        setReply(prev=>({
          ...prev,
          content:el.value
        }))
      }

    useEffect(()=>{
        if(status !== "authenticated") return;
    
        setReply(prev=>({
          ...prev,
          user:{
            name: `${data.user.firstName} ${data.user.lastName}`,
            username: data.user.userName,
          }
        }))
    
    },[status])

    const refTextarea = useRef()
    
    if(!isReplyOpen){return null}

    function changeHeight (el){
      el.style.height = "";
      el.style.height = `${el.scrollHeight}px`;
    }

    async function onSubmitHandler(e){
        e.preventDefault()

        //if error
        if(verifyComment(reply).status === 'error'){
            setFeedback(verifyComment(reply))
            return;
        }

        //pending
        setFeedback({status:'pending',message:'Posting reply ...'})

        //post
        const jsonResult = await fetch('/api/reply',{
            method:"POST",
            body:JSON.stringify({
                replyData:reply,
                _id:feedbackId,
                commentId:commentId,
            }),
            headers:{
                'Content-Type':'application/json',
            }
        })

        const result = await jsonResult.json()


        //if error
        if(result.status !== 200){
            setFeedback({status:'error',message:result.message})
            return;
        }

        //else
        setFeedback({status:'succes',message:result.message})
        setTimeout(()=>{
            setFeedback({})
            setReply(prev=>({
              ...prev,
              content:''
            }))
            toggleReply(false)
        },450)

    }

  return (
    <>
        <form 
            className={styles.post_reply}
            onSubmit={(e)=>{
                e.preventDefault()
                // console.log(replyingTo)
            }}  
        >
            <textarea 
                className='textarea_one'
                ref={refTextarea}
                name="" 
                value={reply.content}
                id="textarea" 
                cols="20" 
                rows="1" 
                placeholder='Type your comment here'
                onInput={()=>changeHeight(refTextarea.current)}
                onChange={onChangeHandler}
            >
            </textarea>
            <button className='button_two'>
                Post Reply
            </button>
        </form>
        { Object.keys(feedback).length !== 0 && <AuthFeedback data={feedback} />}
    </>
    )
}
