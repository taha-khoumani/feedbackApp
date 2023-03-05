import React from 'react'

//components
import Navbar from '@/components/home/Navbar'
import Content from '@/components/home/content/Content'

//metaData
import Head from 'next/head'

//styles
import styles from "@/styles/css/home.module.css"

export default function Home() {


  return (
    <div id={styles.home}>
      <Head><title>Feedback</title></Head>
      <Navbar />
      <Content />
    </div>
  )
}
