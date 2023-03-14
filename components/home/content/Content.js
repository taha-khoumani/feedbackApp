import React from 'react'

//components
import Header from './header/Header'
import Main from './main/Main'

//styles
import styles from "@/styles/css/home.module.css"

export default function Content(props) {
  return (
    <div id={styles.content} >
        <Header />
        <Main suggestionFeedbacks={props.suggestionFeedbacks} />
    </div>
  )
}
