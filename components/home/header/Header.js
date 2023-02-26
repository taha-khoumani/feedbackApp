import React from 'react'

//components
import Logo from './components/Logo'
import Filters from './components/Filters'
import Roadmap from './components/Roadmap'

//styles
import styles from "@/styles/css/header.module.css"

export default function Header() {
  return (
    <div id={styles.header}>
      <Logo />
      <Filters />
      <Roadmap />
    </div>
  )
}
