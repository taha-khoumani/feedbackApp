import React, { useEffect, useRef, useState } from 'react'

//components
import Avatar from 'react-avatar';

//styles
import styles from "@/styles/css/header.module.css"

//next-auth
import { signOut, useSession } from "next-auth/react"

export default function Profile() {
    //state
    const [isProfileOpen,toggleProfile] = useState(false)

    const {data} = useSession()
    const {firstName,lastName} = data.user

    //click handlers
    function onProfilePictureClickHandler(){
        toggleProfile(prevState=>!prevState)
    }
    function onSignOutClickHandler(){
        signOut()
    }

    function toggleOff(e){
        const signout = document.querySelector('.header_profile_dropDown__Hu19q p')

        //if you clicked on signout : don't e.stopPropagation()
        if(e.target === signout) return;

        // if you clicked on something on the page and signout is open : e.stopPropagation()
        if(signout) {
            toggleProfile(false)
            e.stopPropagation()
        }
    }

    useEffect(()=>{
        document.body.addEventListener("click",toggleOff,true)
        return () => document.body.removeEventListener("click",toggleOff)
    },[])

  return (
    <div className={styles.profile_wraper} >
        <Avatar 
            name={firstName} 
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
