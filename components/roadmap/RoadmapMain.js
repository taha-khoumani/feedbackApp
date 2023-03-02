import React from 'react'

//styles
import styles from "@/styles/css/roadmap.module.css"

//components
import OnMobileNav from './min-components/OnMobileNav'
import RoadmapStages from './min-components/RoadmapStages'

//data
import data from "@/data"

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

  return (
    <div className={styles.roadmap_main} >
      {false && <OnMobileNav />}
      <RoadmapStages roadmapData={roadmapData} />
    </div>
  )
}
