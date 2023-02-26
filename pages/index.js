import React, { useEffect } from 'react'

//components
import Header from '@/components/home/header/Header'
import Main from '@/components/home/Main'

//metaData
import Head from 'next/head'

//redux
import { setScreenWidth } from '@/state/slices/uiSlice'
import { useDispatch } from 'react-redux'

export default function Home() {
  const dispatch = useDispatch()
  useEffect(()=>{
    window.addEventListener('resize',()=>{
      dispatch(setScreenWidth(window.innerWidth))
    })
  },[])

  return (
    <>
      <Header />
      <Main />
    </>
  )
}
