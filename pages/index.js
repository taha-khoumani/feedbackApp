import React, { useEffect } from 'react'

//components
import Header from '@/components/home/header/Header'
import Main from '@/components/home/Main'

//metaData
import Head from 'next/head'



export default function Home() {


  return (
    <>
      <Head><title>Feedback</title></Head>
      <Header />
      <Main />
    </>
  )
}
