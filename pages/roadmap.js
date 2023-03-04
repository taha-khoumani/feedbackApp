import React, { useEffect } from 'react'

//components
import RoadmapMain from '@/components/roadmap/RoadmapMain'
import RoadmapNav from '@/components/roadmap/RoadmapNav'

//styles
import styles from "@/styles/css/roadmap.module.css"

//state
import { useDispatch } from 'react-redux'
import { setScreenWidth } from '@/state/slices/uiSlice'

export default function roadmap(props) {

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
        <RoadmapMain />
    </div>
  )
}

// export async function getServerSideProps(context){
//     const prevRoute = context.req.headers.referer

//     return{
//       props:{
//         history: prevRoute  
//       }
//     }
// }