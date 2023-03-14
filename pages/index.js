import React from 'react'

//components
import Navbar from '@/components/home/Navbar'
import Content from '@/components/home/content/Content'

//metaData
import Head from 'next/head'

//styles
import styles from "@/styles/css/home.module.css"

//database
import { MongoClient } from "mongodb";

export default function Home(props) {
  return (
    <div id={styles.home}>
      <Head><title>Feedback</title></Head>
      <Navbar />
      <Content suggestionFeedbacks={JSON.parse(props.suggestionFeedbacks)} />
    </div>
  )
}

export async function getServerSideProps() {
  const client = await MongoClient.connect(`mongodb+srv://tagopi:${'DGakye2AgwDd8v2a'}@cluster0.8kpmakb.mongodb.net/?retryWrites=true&w=majority`)
  const feedbacks = client.db(process.env.databaseName).collection("feedbacks")
  const result = JSON.stringify(await feedbacks.find({status:"suggestion"}).toArray())


  return {
    props: {
      suggestionFeedbacks:result,
    },
  }
}