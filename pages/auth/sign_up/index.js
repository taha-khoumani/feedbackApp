import React, { useState } from 'react'

//components
import RouteContainer from '@/components/ui/RouteContainer'

//images
import google from '@/images/icons/google.png' 
import microsoft from '@/images/icons/microsoft.webp' 

//next
import Link from 'next/link'
import Image from 'next/image'

//styles
import styles from "@/styles/css/auth.module.css"

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

  return (
      <>
        <RouteContainer goBackRoute={"/"}>
          <div className={styles.main} >
            <p className={styles.title} >Sign up </p>
            <form
              onSubmit={(e)=>e.preventDefault()}
            >
              <div>
                <label htmlFor='first-name' >First Name</label>
                <input 
                  required
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
                  required
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
                  className='textarea_one' 
                  name="password"
                  value={userData.password}
                  onChange={onChangeHandler}
                />
              </div>
              <button className={`button_three ${styles.next}`} >Sign up</button>
            </form>
            {/* <div className={styles.thirdPartyAuth}>
          <button>
            Sign up with 
            <Image className={styles.google}  height={25} src={google} alt={"googleLogo"} /> 
          </button>
          <button>
            Sign up with
            <Image className={styles.microsoft} height={20}  src={microsoft} alt={"microsoftLogo"} />
          </button>
            </div> */}
          </div>
          <div className={styles.otherOption} >
            <p>Already have an account&nbsp;&nbsp;<Link href={"/auth/sign_in"} >Sign in here !</Link></p>
          </div>
        </RouteContainer>
      </>
  )
}