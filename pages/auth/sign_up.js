import React, { useState } from 'react'

//components
import RouteContainer from '@/components/ui/RouteContainer'
import AuthFeedback from '@/components/ui/AuthFeedback'

//next
import Link from 'next/link'

//styles
import styles from "@/styles/css/auth.module.css"

//helper-functions
import { verifySignUp } from '@/lib/helper-functions'

export default function signUp() {
  const [userData,setUserData] = useState({
    firstName:"",
    lastName:'',
    email:"",
    password:'',
  })

  function onChangeHandler (e){
    const {name,value} = e.target
    setUserData(prevUserData=>({
      ...prevUserData,
      [name]:value,
    }))
  }

  const [feedback,setFeedback] = useState({})

  function onSubmitHandler(e){
    e.preventDefault()

    // check for front-end validation errors
    if(verifySignUp(userData).status === 'error'){
      setFeedback(verifySignUp(userData))
      return null;
    }

    //set pending state
    setFeedback({status:'pending',message:'Signing up...'})

    //send data
    fetch("/api/auth/sign_up",{
      method:'POST',
      body:JSON.stringify(userData),
      headers:{
        'Content-Type':'application/json',
      }
    })
      .then(res=> res.json())
      .then(res=> {
        //if error
        if(res.status !== 200){
          setFeedback({
            status:'error',
            message:res.message
          })
        } 
        
        //if no error
        else{
          setFeedback({status:'succes',message:res.message})
          
        }
      })
  }

  return (
      <>
        <RouteContainer goBackRoute={"/"}>
          <div className={styles.main} >
            <p className={styles.title} >Sign up </p>
            <form
              noValidate
              onSubmit={onSubmitHandler}
            >
              <div>
                <label htmlFor='first-name' >First Name</label>
                <input 
                  id='first-name'
                  type="text" 
                  className='textarea_one' 
                  name="firstName"
                  value={userData.firstName}
                  onChange={onChangeHandler}
                />
              </div>
              <div>
                <label htmlFor='last-name'>Last Name</label>
                <input 
                  id='last-name' 
                  type="text" 
                  className='textarea_one' 
                  name='lastName'
                  value={userData.lastName}
                  onChange={onChangeHandler}
                />
              </div>
              <div>
                <label htmlFor='email'>Email</label>
                <input 
                  id='email' 
                  type="email" 
                  className='textarea_one' 
                  name='email'
                  value={userData.email}
                  onChange={onChangeHandler}
                />
              </div>
              <div>
                <label htmlFor='password' >Password</label>
                <input 
                  id='password' 
                  type="password" 
                  className='textarea_one' 
                  name="password"
                  value={userData.password}
                  onChange={onChangeHandler}
                />
              </div>
              { Object.keys(feedback).length !== 0 && <AuthFeedback data={feedback} />}
              <div className={styles.buttons}>
                <Link className='button_two' href={"/"}>Cancel</Link>
                <button className={`button_three ${styles.next}`} >Sign up</button>
              </div>
            </form>
          </div>
          <div className={styles.otherOption} >
            <p>Already have an account&nbsp;&nbsp;<Link href={"/auth/sign_in"} >Sign in here !</Link></p>
          </div>
        </RouteContainer>
      </>
  )
}