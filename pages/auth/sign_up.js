import React, { useState } from 'react'

//components
import RouteContainer from '@/components/ui/RouteContainer'
import AuthFeedback from '@/components/ui/AuthFeedback'

//next
import Link from 'next/link'
import { useRouter } from 'next/router'

//styles
import styles from "@/styles/css/auth.module.css"

//helper-functions
import { objectToLowerCase, verifySignUp } from '@/lib/helper-functions'

export default function signUp() {
  const [userData,setUserData] = useState({
    firstName:"",
    lastName:'',
    userName:'',
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
  const [showPassword,toggleShowPassword] = useState(true)
  const [feedback,setFeedback] = useState({})
  const router = useRouter()

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
      body:JSON.stringify(objectToLowerCase(userData)),
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
          setTimeout(()=>setFeedback({status:'pending',message:'Redirecting ...'}),500)
          setTimeout(()=>router.push("/auth/sign_in"),500)
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
                <label htmlFor='user-name' >User Name</label>
                <input 
                  id='user-name'
                  type="text" 
                  className='textarea_one' 
                  name="userName"
                  value={userData.userName}
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
                <label htmlFor='signup_password' >Password</label>
                <div className='textarea_one' style={{padding:0,display:"flex",alignItems:"center"}} >
                  <input
                    id='signup_password' 
                    type={showPassword ?'password':'text'} 
                    className={`${styles.password}`} 
                    name="password"
                    size={1}
                    value={userData.password}
                    onChange={onChangeHandler}
                  />
                  <i onClick={()=>toggleShowPassword(prev=>!prev)} className={`fa-solid fa-eye${!showPassword ? '-slash':""}`}></i>
                </div>
              </div>
              { Object.keys(feedback).length !== 0 && <AuthFeedback data={feedback} />}
              <div className={styles.buttons}>
                <Link onClick={()=>setFeedback({status:'pending',message:'Redirecting ...'})} className='button_two' href={"/"}>Cancel</Link>
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

//backend
import { authOptions } from '@/pages/api/auth/[...nextauth]'
import { getServerSession } from "next-auth/next"

export async function getServerSideProps(context) {
  const session = await getServerSession(context.req, context.res, authOptions)

  if (session) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }

  return {
    props: {},
  }
}