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
    dispatch(setScreenWidth(window.innerWidth))
    window.addEventListener('resize',()=>{
      dispatch(setScreenWidth(window.innerWidth))
    })
  },[])

  return (
    <div id={styles.header}>
      <Logo />
      <Filter_Roadmap />
    </div>
  )
}
