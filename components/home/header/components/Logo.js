//react
import React, { useEffect } from 'react'

//styles
import styles from "@/styles/css/header.module.css"

//redux
import { useSelector,useDispatch } from 'react-redux'
import { toggleMenu } from '@/state/slices/uiSlice'

//images
import bg_1 from "@/images/logoBg/background-header-1.png"
import bg_2 from "@/images/logoBg/background-header-2.png"
import bg_3 from "@/images/logoBg/background-header-3.png"
import close from  "@/images/icons/icon-close.svg"
import ham from "@/images/icons/icon-hamburger.svg"

//helper-functions:
import { mediaQueries} from '@/lib/helper-functions'

//next
import Image from 'next/image'

export default function Logo() {
  const imgsOptions = [bg_1,bg_2,bg_3]

  const {screenWidth,isMenuOpen} = useSelector(store=>store.ui)
  const dispatch = useDispatch()

  function toggleMenuHandler (boolean){
    //open-modal
    if(boolean){
      dispatch(toggleMenu(boolean))
      document.body.style.position = "fixed"
    }
    
    //close-modal
    else{
      dispatch(toggleMenu(boolean))
      document.body.style.position = "static"
    }
  }
  
  useEffect(()=>{
    if(screenWidth > 768 && isMenuOpen === true){
      toggleMenuHandler(false)
    }
  },[screenWidth])

  return (
    <div id={styles.logo}>
      <Image id={styles.bg_img} src={mediaQueries(imgsOptions,screenWidth)} alt={"background-img"} priority={true} />
      <div id={styles.logo_content}>
        <div>
          <h1>Audiophile</h1>
          <p>Feedback Board</p>
        </div>
        {
          screenWidth < 768 && 
          <Image 
            src={isMenuOpen ? close : ham} 
            alt="toggle-menu" property='true' 
            onClick={()=>toggleMenuHandler(!isMenuOpen)} 
          />
        }
      </div>
    </div>
  )
}
