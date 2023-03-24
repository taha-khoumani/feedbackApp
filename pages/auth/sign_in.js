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

  const [showPassword,toggleShowPassword] = useState(true)
 
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
    setTimeout(()=>setFeedback({status:'pending',message:'Redirecting ...'}),500)
    setTimeout(()=>router.push("/"),500)

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
              style={{outline:"none"}}
            />
          </div>
          <div>
            <label htmlFor='signin_password' >Password</label>
            <div className='textarea_one' style={{padding:0,display:"flex",alignItems:"center"}} >
              <input
                id='signin_password' 
                type={showPassword ?'password':'text'} 
                className={`${styles.password}`} 
                name="password"
                size='1'
                value={userData.password}
                onChange={onChangeHandler}
              />
              <i onClick={()=>toggleShowPassword(prev=>!prev)} className={`fa-solid fa-eye${!showPassword ? '-slash':""}`}></i>
            </div>
          </div>
          { Object.keys(feedback).length !== 0 && <AuthFeedback data={feedback} />}
          <div className={styles.buttons}>
            <Link className='button_two' onClick={()=>setFeedback({status:'pending',message:'Redirecting ...'})} href={"/"}>Cancel</Link>
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