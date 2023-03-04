import React from 'react'

//components
import Feedback from '@/components/ui/Feedback'

//styles
import styles from "@/styles/css/roadmap.module.css"

export default function RoadmapFeedback(props) {
  const {data} = props
  console.log(data.title)
  const cStyles ={
    padding:" 0 24px 24px",
    borderRadius: "0 0 5px 5px",
    
  }

  function statusStyles (status){
    switch(status){
      case "planned":
        return "F49F85"
      break;

      case "in-progress":
        return "AD1FEA"
      break;
      case "live":
        return "62BCFA"
      break;
    }
  }

  return (
    <div className={styles.roadmap_feedbacks} >
        <div className={styles.status} style={{borderColor:`#${statusStyles(data.status)}`}} >
          <li className={styles[props.statusTitle]} >
            {props.statusTitle}
          </li>
        </div>
        <Feedback data={data} mobileMode={true} isLink={true} customStyles={cStyles} />
    </div>
  )
}
