import React from 'react'

//styles
import styles from "@/styles/css/roadmap.module.css"

export default function OnMobileNav(props) {
  const {planned,inProgress,live} = props.nums
  function navigate (n){
    const navigater = document.querySelector(".roadmap_roadmap_stages__FAUDD")
    const currentPosition = window.getComputedStyle(navigater).left
    let to;

    switch (n){
      case 1: 
        to = "one"
      break;
      case 2:
        to = "two"
      break;
      case 3:
        to = "three"
      break;
    }
    navigater.style.left = `${currentPosition}`
    navigater.style.animationName = `${to}`
  }

  return (
    <div className={styles.OnMobileNav} >
      <div className={styles.OnMobileNav_cats}  >
        <p onClick={()=>navigate(1)} >Planned ({planned})</p>
        <p onClick={()=>navigate(2)} >In-Progress ({inProgress})</p>
        <p onClick={()=>navigate(3)} >Live ({live})</p>
      </div>
    </div>
  )
}
