import React from 'react'

//styles
import styles from "@/styles/css/home.module.css"

//components
import Logo from "@/components/home/content/header/Logo"



export default function Navbar() {
  return (
    <div id={styles.navbar} >
        <Logo />
    </div>
  )
}
