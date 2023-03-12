import React, { useState } from 'react'

//components
import Avatar from 'react-avatar';

//styles
import styles from "@/styles/css/header.module.css"

//next-auth
import { signOut } from "next-auth/react"

export default function Profile() {
    const [isProfileOpen,toggleProfile] = useState(false)

    //click handlers
    function onProfilePictureClickHandler(){
        toggleProfile(prevState=>!prevState)
    }
    function onSignOutClickHandler(){
        signOut({redirect:false})
    }

  return (
    <div className={styles.profile_wraper} >
        <Avatar 
            name={"taha"} 
            size={40} 
            round={true} 
            textSizeRatio={2} 
            onClick={onProfilePictureClickHandler}
        /> 
        {
            isProfileOpen &&
            <div className={styles.profile_dropDown}>
                <p onClick={onSignOutClickHandler} >Sign out</p>
            </div>
        }
    </div>
  )
}
