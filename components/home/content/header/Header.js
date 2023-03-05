import React,{useEffect} from 'react'

//components
import Logo from './Logo'
import Filter_Roadmap from './Filter_Roadmap'

//styles
import styles from "@/styles/css/header.module.css"

//redux
import { setScreenWidth} from '@/state/slices/uiSlice'
import { useDispatch} from 'react-redux'

export default function Header() {
  const dispatch = useDispatch()

  useEffect(()=>{
    function setWidth() {dispatch(setScreenWidth(window.innerWidth))}
    setWidth()
    window.addEventListener('resize',setWidth)
    return () => window.removeEventListener('resize',setWidth)
  },[])

  return (
    <div id={styles.header}>
      <Filter_Roadmap />
    </div>
  )
}
