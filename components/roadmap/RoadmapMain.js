import React from 'react'

//styles
import styles from "@/styles/css/roadmap.module.css"

//components
import OnMobileNav from './min-components/OnMobileNav'
import RoadmapStages from './min-components/RoadmapStages'

//data
import data from "@/data"

//state
import {useSelector} from 'react-redux'

export default function RoadmapMain() {
  const {productRequests:feedbacks} = data;

  function findStatusInFeedbacks (status){
    return feedbacks.filter(feedback => feedback.status === status )
  }

  const roadmapData = {
    planned:{
      title:"Planned",
      description:"Ideas prioritized for research",
      feedbacks:findStatusInFeedbacks("planned"),
    },
    inProgress:{
      title:"In-Progress",
      description:"Currently being developed",
      feedbacks:findStatusInFeedbacks("in-progress"),
    },
    live:{
      title:"Live",
      description:"Released features",
      feedbacks:findStatusInFeedbacks("live")
    },
  }

  const {screenWidth} = useSelector(store=>store.ui)

  return (
    <div className={styles.roadmap_main} >
      {
        screenWidth <= 768 && 
        <OnMobileNav 
          nums={{
            planned:roadmapData.planned.feedbacks.length,
            inProgress:roadmapData.inProgress.feedbacks.length,
            live:roadmapData.live.feedbacks.length,
          }} 
        />
      }
      <RoadmapStages roadmapData={roadmapData} />
    </div>
  )
}
