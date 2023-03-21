import React, { useState } from 'react'

//components
import RouteContainer from '@/components/ui/RouteContainer'
import AuthFeedback from '@/components/ui/AuthFeedback'

//next
import Link from 'next/link'
import { useRouter } from 'next/router'

//styles
import styles from "@/styles/css/auth.module.css"

//authorization
import { objectToLowerCase} from '@/lib/helper-functions'
import { signIn } from 'next-auth/react'
import { getSession } from 'next-auth'

export default function sign_in() {
  const [userData,setUserData] = useState({
    email:"",
    password:'',
  })

  const [feedback,setFeedback] = useState({})

  const router = useRouter()

  function onChangeHandler (e){
    const {name,value} = e.target
    setUserData(prevUserData=>({
      ...prevUserData,
      [name]:value,
    }))
  }

  async function onSubmitHandler(e){
    e.preventDefault()

    //set pending state
    setFeedback({status:'pending',message:'Signing in...'})
    
    //singning in
    const result = await signIn('credentials', {
      redirect: false,
      ...objectToLowerCase(userData)
    })

    //if error
    if(!result.ok){
      setFeedback({status:'error',message:result.error})
      return null;
    }

    //if not
    setFeedback({status:'succes',message:'Signed in succesefully'})
    setTimeout(()=>router.push("/"),450)

  }

  return (
    <RouteContainer goBackRoute={"/"} >
      <div className={styles.main}>
        <p className={styles.title} >Sign in </p>
        <form
          onSubmit={onSubmitHandler}
        >
          <div>
            <label htmlFor='email'>Email</label>
            <input 
              hide-details="auto"
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
              className={`textarea_one ${styles.password}`} 
              name="password"
              value={userData.password}
              onChange={onChangeHandler}
            />
          </div>
          { Object.keys(feedback).length !== 0 && <AuthFeedback data={feedback} />}
          <div className={styles.buttons}>
            <Link className='button_two' href={"/"}>Cancel</Link>
            <button className={`button_three ${styles.next}`}>Sign in</button>
          </div>
        </form>
      </div>
      <div className={styles.otherOption}>
        <p>Don't have an account yet&nbsp;&nbsp;<Link href={"/auth/sign_up"} >Sign up here !</Link></p>
      </div>
    </RouteContainer>
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