import React, { useEffect, useRef } from 'react'

//components
import Stage from './Stage'

//styles
import styles from "@/styles/css/roadmap.module.css"

//state
import { useSelector } from 'react-redux'

export default function RoadmapStages(props) {
    const {planned,inProgress,live} = props.roadmapData
    // const {currentStage} = useSelector(store=>store.ui)
    const stages = useRef(null)

  return (
    <div ref={stages} className={styles.roadmap_stages} >
        <Stage stageData={planned} />
        <Stage stageData={inProgress} />
        <Stage stageData={live} />
    </div>
  )
}
