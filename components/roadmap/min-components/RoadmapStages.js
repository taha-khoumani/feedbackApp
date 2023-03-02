import React from 'react'

//components
import Stage from './Stage'

//styles
import styles from "@/styles/css/roadmap.module.css"

export default function RoadmapStages(props) {
    const {planned,inProgress,live} = props.roadmapData

  return (
    <div className={styles.roadmap_stages} >
        <Stage stageData={planned} />
        <Stage stageData={inProgress} />
        <Stage stageData={live} />
    </div>
  )
}
