import React, { useEffect, useRef } from 'react'

//styles
import styles from "@/styles/css/roadmap.module.css"

//components
import RoadmapFeedback from './RoadmapFeedback'

export default function Stage(props) {
  const {title,description,feedbacks} = props.stageData

  const feedbacksEls = feedbacks.map((feedback)=>
    <RoadmapFeedback 
      data={feedback}
      statusTitle={title}
      key={feedback._id}
    />
  )

  return (
    <div className={styles.stage} >
        <div className={styles.stage_header} > 
          <p className={styles.stage_header_title} >{title} ({feedbacks.length})</p>
          <p className={styles.stage_header_descripton} >{description}</p>
        </div>
        <div className={styles.stage_feedbacks} >
          {feedbacksEls}
        </div>
    </div>
  )
}
