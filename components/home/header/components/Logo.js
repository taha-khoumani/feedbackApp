//react
import React from 'react'

//styles
import styles from "@/styles/css/header.module.css"

//redux
import { useSelector } from 'react-redux'

//images
import bg_1 from "@/images/logoBg/background-header-1.png"
import bg_2 from "@/images/logoBg/background-header-2.png"
import bg_3 from "@/images/logoBg/background-header-3.png"

//helper-functions:
import { mediaQueries} from '@/lib/helper-functions'

//next
import Image from 'next/image'

export default function Logo() {
  const {screenWidth} = useSelector(store=>store.ui)
  
  const imgsOptions = [bg_1,bg_2,bg_3]

  return (
    <div id={styles.logo}>
      <Image src={mediaQueries(imgsOptions,screenWidth)} alt={"background-img"} priority={true} />
      <div id="logo-text">
        <h1>Audiophile</h1>
        <p>Feedback Board</p>
      </div>
    </div>
  )
}
