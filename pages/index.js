import React from 'react'

//components
import Header from '@/components/home/header/Header'
import Main from '@/components/home/main/Main'

//metaData
import Head from 'next/head'

//styles
import styles from "@/styles/css/home.module.css"

export default function Home() {


  return (
    <div id={styles.home}>
      <Head><title>Feedback</title></Head>
      <Header />
      <Main />
    </div>
  )
}
