import React, { useEffect } from 'react'

//database
import { MongoClient } from "mongodb";

//components
import RoadmapMain from '@/components/roadmap/RoadmapMain'
import RoadmapNav from '@/components/roadmap/RoadmapNav'
import MustSignInModal from '@/components/ui/MustSignInModal';

//styles
import styles from "@/styles/css/roadmap.module.css"

//state
import { useDispatch } from 'react-redux'
import { setScreenWidth } from '@/state/slices/uiSlice'

export default function roadmap({feedbacks}) {

  const dispatch = useDispatch()

  useEffect(()=>{
    function setWidth() {dispatch(setScreenWidth(window.innerWidth))}
    setWidth()
    window.addEventListener('resize',setWidth)
    return () => window.removeEventListener('resize',setWidth)
  },[])

  //


  return (
    <div className={styles.roadmap} >
        <RoadmapNav  />
        <RoadmapMain feedbacks={JSON.parse(feedbacks)} />
        <MustSignInModal />
    </div>
  )
}

export async function getServerSideProps() {
  const client = await MongoClient.connect(`mongodb+srv://tagopi:${'DGakye2AgwDd8v2a'}@cluster0.8kpmakb.mongodb.net/?retryWrites=true&w=majority`)
  const feedbacks = client.db(process.env.DATABASE).collection("feedbacks")
  const result = JSON.stringify(await feedbacks.find().toArray())


  return {
    props: {
      feedbacks:result,
    },
  }
}