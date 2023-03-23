import React, { useEffect, useRef } from 'react'

//styles
import styles from "@/styles/css/roadmap.module.css"

//components
import RoadmapFeedback from './RoadmapFeedback'
import NoRoadmapFeedbacks from '../NoRoadmapFeedbacks'
import { useSelector} from 'react-redux'

export default function Stage(props) {
  const {title,description,feedbacks} = props.stageData
  const {screenWidth} = useSelector(store=>store.ui)

  let condition = feedbacks.length === 0 && screenWidth <=767

  const feedbacksEls = condition ?
  <NoRoadmapFeedbacks />
  :
   feedbacks.map((feedback)=>
    <RoadmapFeedback 
      data={feedback}
      statusTitle={title}
      key={feedback._id}
    />
    )

  return (
    <div className={styles.stage} >
        <div className={condition ? styles.stage_header_no_feedbacks :styles.stage_header} > 
          <p className={styles.stage_header_title} >{title} ({feedbacks.length})</p>
          <p className={styles.stage_header_descripton} >{description}</p>
        </div>
        <div className={styles.stage_feedbacks} >
          {feedbacksEls}
        </div>
    </div>
  )
}
