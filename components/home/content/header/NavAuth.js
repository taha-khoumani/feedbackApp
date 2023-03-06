import React from 'react'

//styles
import styles from "@/styles/css/header.module.css" 

//next
import Image from 'next/image'
import { useRouter } from 'next/router'

export default function NavAuth() {
    const router = useRouter()
    function navigateTo (destination){
        router.push(destination)
    }

  return (
    <div id={styles.authentification_nav} >
        {
            true
            ?
            <div id={styles.not_auth}>
                <button 
                    className={`${styles.sign_in_button} button_three`}
                    onClick={()=>{
                        navigateTo("/auth/sign_in")
                    }}
                >
                    Sign in
                </button>

                <button 
                    className={`${styles.sign_up_button} button-one`} 
                    onClick={()=>{
                        navigateTo("/auth/sign_up")
                    }}
                >
                    Sign up
                </button>
            </div>
            :
            <Image 
                src={"/assets/user-images/image-george.jpg"} 
                alt={'your-profile-picture'} 
                priority={true}  
                width={45}
                height={45}
                id={styles.profile_picture}
            />
        }

    </div>
  )
}
