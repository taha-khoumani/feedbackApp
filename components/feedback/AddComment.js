import React, { useEffect, useState } from 'react'

//react
import { useRef } from 'react';

//styles
import styles from "@/styles/css/feedbackDetails.module.css"

//helper-functions
import { verifyComment } from '@/lib/helper-functions';

//components
import AuthFeedback from '../ui/AuthFeedback';

//state
import { useDispatch, useSelector } from 'react-redux';
import { setRequestComments } from '@/state/slices/uiSlice';

//auth
import { useSession } from 'next-auth/react';
import { nanoid } from 'nanoid'

export default function AddComment(props) {
  const dispatch = useDispatch()
  const {requestComments} = useSelector(store=>store.ui)
  const {data,status} = useSession() 

  const [comment,setComment] = useState({
    id:nanoid(),
    content:"",
    user:{
      name:'',
      username:'',
    },
    replies: [],
  })

  useEffect(()=>{
    if(status !== "authenticated") return;

    setComment(prev=>({
      ...prev,
      user:{
        name: `${data.user.firstName} ${data.user.lastName}`,
        username: data.user.userName,
      }
    }))

  },[status])

  function onChangeHandler(e){
    const el = e.target
    setComment(prev=>({
      ...prev,
      content:el.value,
      id:nanoid(),
    }))
  }

  //user validation feedback
  const [feedback,setFeedback] = useState({})

  const refTextarea = useRef(null)

  function changeHeight (el){
    el.style.height = "";
    el.style.height = `${el.scrollHeight}px`;
  }

  async function onPostHandler(e){
    e.preventDefault()

    if(verifyComment(comment).status === 'error'){
        setFeedback(verifyComment(comment))
        return;
    }

    //pending
    setFeedback({status:'pending',message:'Posting comment ...'})

    //post
    const result = await fetch('/api/comment',{
        method:"POST",
        body:JSON.stringify({
            commentData:comment,
            _id:props.feedbackId
        }),
        headers:{
            'Content-Type':'application/json',
        }
    })
    const jsonResult = await result.json()
    
    if(jsonResult.status !== 200){
      setFeedback({status:'error',message:jsonResult.message})
      return;
    }
    dispatch(setRequestComments('pending'))
  }

  useEffect(()=>{
    if(requestComments !== 'finished') return;
    setComment(prev=>({
      ...prev,
      content:''
    }))
    setFeedback({})
    dispatch(setRequestComments('no'))
  },[requestComments])

  return (
    <form 
      className={styles.add_comment}
      onSubmit={(e)=>{e.preventDefault()}}  
    >
      <p className={styles.add_comment_title} >Add Comment</p>
      <textarea 
        className='textarea_one'
        ref={refTextarea}
        name="" 
        value={comment.content}
        id="textarea" 
        cols="30" 
        rows="1" 
        placeholder='Type your comment here'
        onInput={()=>changeHeight(refTextarea.current)}
        onChange={onChangeHandler}
      >
      </textarea>
      { Object.keys(feedback).length !== 0 && <AuthFeedback data={feedback} />}
      <div className={styles.chrleft_post} >
        <p className={styles.characters_left}>250 Characters left</p>
        <button className='button_two' onClick={onPostHandler} >
          Post Comment
        </button>
      </div>
    </form>
  )
}
