import React from 'react'

//styles
import styles from "@/styles/css/roadmap.module.css"
import stylesI from "@/styles/css/feedback.module.css"

//components
import OnMobileNav from './min-components/OnMobileNav'
import RoadmapStages from './min-components/RoadmapStages'
import NoRoadmapFeedbacks from './NoRoadmapFeedbacks'

//state
import {useSelector} from 'react-redux'

export default function RoadmapMain(props) {
  const {feedbacks} = props;
  const {screenWidth} = useSelector(store=>store.ui)


  // if no feedbacks in roadmap
  if(feedbacks.filter(feedback=>feedback.status !== 'suggestion').length === 0 && screenWidth > 767){
    return(
      <div id={stylesI.no_roadmap_feedback_wraper} >
        <div id={styles.no_roadmap_headers} >
            <div className={styles.stage_header} > 
                <p className={styles.stage_header_title} >Planned (0)</p>
                <p className={styles.stage_header_descripton}>Ideas prioritized for research</p>
            </div>
            <div className={styles.stage_header} > 
                <p className={styles.stage_header_title}>In-Progress (0)</p>
                <p className={styles.stage_header_descripton} >Currently being developed</p>
            </div>
            <div className={styles.stage_header} > 
                <p className={styles.stage_header_title} >Live (0)</p>
                <p className={styles.stage_header_descripton} >Released features</p>
            </div>
        </div>
        <NoRoadmapFeedbacks />
      </div>
    )  
  }

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
      {
        screenWidth < 768 && 
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
