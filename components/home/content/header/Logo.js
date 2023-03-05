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
      document.querySelector("#header_menu__1DIIo").classList.remove("menu-left")
      document.querySelector('#header_filter_roadmap__DVAvC').style.backgroundColor = "transparent"
      document.querySelector("#header_menu__1DIIo").classList.add("menu-right")
      document.body.style.position = "static"
      setTimeout(()=>dispatch(toggleMenu(boolean)),250) 
    }
  }
  
  useEffect(()=>{
    if(screenWidth > 768 && isMenuOpen === true){
      dispatch(toggleMenu(false))
      document.body.style.position = "static"
    }
  },[screenWidth])

  return (
    <div id={styles.logo}>
      <Image id={styles.bg_img} src={bg_3} alt={"background-img"} priority={true} />
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
