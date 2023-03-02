import React from 'react'

//images
import leftIcon from "@/images/icons/icon-arrow-left.svg"

//styles
import styles from  "@/styles/css/ui.module.css"

//next
import Link from 'next/link'
import Image from 'next/image'

export default function GoBack(props) {
  const {prevRoute,customStyles} = props



  return (
    <Link 
      className={styles.go_back} 
      href={prevRoute}  
    >
      <Image alt='go-back-icon' src={leftIcon}/>
      <p style={customStyles ? customStyles : {}} >Go Back</p>
    </Link>
  )
}
