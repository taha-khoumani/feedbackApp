import React from 'react'
import GoBack from '../ui/GoBack'

//styles
import styles from "@/styles/css/roadmap.module.css"

export default function RoadmapNav(props) {
  const goBackStyles ={
    color:"white",
  }
 
  return (
    <div className={styles.roadmap_nav} >
      <GoBack prevRoute={"/"} customStyles={goBackStyles} />
      <p className={styles.roadmap_nav_title} >Roadmap</p>
    </div>
  )
}
