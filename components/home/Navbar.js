import React from 'react'

//styles
import styles from "@/styles/css/home.module.css"

//components
import Logo from "@/components/home/content/header/Logo"
import NavAuth from './content/header/NavAuth'
import Profile from './content/header/Profile'

//autothentification
import { useSession } from 'next-auth/react'

export default function Navbar() {
  const {data,status} = useSession()


  return (
    <div id={styles.navbar} >
        <Logo>
          <p>Search</p>
          { status === 'authenticated' ?  
            <Profile />:
            <NavAuth/> 
          }
        </Logo>
    </div>
  )
}
