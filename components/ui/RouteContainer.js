import React from 'react'

//styles
import styles from "@/styles/css/ui.module.css"

//components
import GoBack from './GoBack'

export default function RouteContainer(props) {
  const {goBackRoute,children} = props

  return (
    <div className={styles.container}>
        {/* <GoBack prevRoute={goBackRoute} /> */}
        <div className={styles.content}>
            {children}
        </div>
    </div>
  )
}
