import React from 'react'

//next
import Link from "next/link"

//styles
import styles from "@/styles/css/header.module.css"

//state
import { toggleMenu } from '@/state/slices/uiSlice'
import { useDispatch, useSelector } from 'react-redux'

export default function Roadmap(props) {
  const {screenWidth} = useSelector(store=>store.ui)
  const dispatch = useDispatch()
  const {live,inProgress,planned} = props.nonSuggestionFeedbacks

  return (
    <div id={styles.roadmap}>
      <div>
        <p>Roadmap</p>
        <Link 
          href="/roadmap"
          onClick={()=>{
            dispatch(toggleMenu(false))
            document.body.style.position="static"
          }}  
        >View</Link>
      </div>
      <ul>
        <li>Planned <span>{planned}</span></li>
        <li>In-Progress <span>{inProgress}</span></li>
        <li>Live <span>{live}</span></li>
      </ul>
    </div>
  )
}
