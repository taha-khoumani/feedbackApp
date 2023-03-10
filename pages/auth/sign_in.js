import React, { useState } from 'react'

//components
import RouteContainer from '@/components/ui/RouteContainer'

//next
import Link from 'next/link'
import { useRouter } from 'next/router'

//styles
import styles from "@/styles/css/auth.module.css"

export default function signIn() {
  const [userData,setUserData] = useState({
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

  return (
    <RouteContainer goBackRoute={"/"} >
      <div className={styles.main}>
        <p className={styles.title} >Sign in </p>
        <form
          onSubmit={(e)=>e.preventDefault()}
        >
          <div>
            <label htmlFor='email'>Email</label>
            <input 
              required
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
              required
              id='password' 
              type="password" 
              className={`textarea_one ${styles.password}`} 
              name="password"
              value={userData.password}
              onChange={onChangeHandler}
            />
          </div>
          <div className={styles.buttons}>
            <Link className='button_two' href={"/"}>Cancel</Link>
            <button className={`button_three ${styles.next}`} >Sign in</button>
          </div>
        </form>
      </div>
      <div className={styles.otherOption}>
        <p>Don't have an account yet&nbsp;&nbsp;<Link href={"/auth/sign_up"} >Sign up here !</Link></p>
      </div>
    </RouteContainer>
  )
}
