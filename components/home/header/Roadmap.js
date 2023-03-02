import React from 'react'

//next
import Link from "next/link"

//styles
import styles from "@/styles/css/header.module.css"

export default function Roadmap() {
  return (
    <div id={styles.roadmap}>
      <div>
        <p>Roadmap</p>
        <Link href="/roadmap" >View</Link>
      </div>
      <ul>
        <li>Planned <span>2</span></li>
        <li>In-Progress <span>3</span></li>
        <li>Live <span>1</span></li>
      </ul>
    </div>
  )
}
