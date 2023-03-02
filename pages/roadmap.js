import React from 'react'

//components
import RoadmapMain from '@/components/roadmap/RoadmapMain'
import RoadmapNav from '@/components/roadmap/RoadmapNav'

//styles
import styles from "@/styles/css/roadmap.module.css"

export default function roadmap(props) {
  return (
    <div className={styles.roadmap} >
        <RoadmapNav prevRoute={props.history } />
        <RoadmapMain />
    </div>
  )
}

export async function getServerSideProps(context){

    return{
      props:{
        history: context.req.headers.referer 
      }
    }
}