import React, { useEffect, useRef } from 'react'

//styles
import styles from "@/styles/css/roadmap.module.css"

//state
import { useDispatch, useSelector } from 'react-redux'
import { setcurrentStage } from '@/state/slices/uiSlice' 

export default function OnMobileNav(props) {
  const {planned,inProgress,live} = props.nums
  const {currentStage} = useSelector(store=>store.ui)
  const dispatch = useDispatch()

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

  function selectedStageStyles (stage){
    return (
      stage === currentStage 
      ?
      {color:"#3A4374"}
      :
      {}
    )
  }

  function onClickHandler (destination,stage){
    navigate(destination)
    dispatch(setcurrentStage(stage))
  }

  const hr = useRef(null)
  useEffect(()=>{
    const navigater = hr.current
    const currentPosition = window.getComputedStyle(navigater).margin
    let to;

    switch (currentStage){
      case "Planned": 
        to = "oneN"
      break;
      case "In-Progress":
        to = "twoN"
      break;
      case "Live":
        to = "threeN"
      break;
    }
    navigater.style.margin = `${currentPosition}`
    navigater.style.animationName = `${to}`

  },[currentStage])

  return (
    <div className={styles.OnMobileNav} >
      <div className={styles.OnMobileNav_cats}  >
        <p 
          onClick={()=>onClickHandler(1,"Planned")} 
          style={selectedStageStyles("Planned")} >
        Planned ({planned})</p>

        <p 
          onClick={()=>onClickHandler(2,"In-Progress")} 
          style={selectedStageStyles("In-Progress")} >
        In-Progress ({inProgress})</p>

        <p 
          onClick={()=>onClickHandler(3,"Live")} 
          style={selectedStageStyles("Live")} >
        Live ({live})</p>
      </div>
      <hr ref={hr} />
    </div>
  )
}
