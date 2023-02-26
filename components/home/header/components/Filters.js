import React from 'react'
import headerStyles from "@/styles/css/header.module.css"

export default function Filters() {
  // const filters = ["All","UI","UX","Enhancement","Bug","Feature"]

  // const filtersButtons = filters.map(filter=>
  //   <button
  //     key={filter}
  //     className={"button-one"}
  //   >
  //     {filter}
  //   </button>
  // )

  return (
    <div id={headerStyles.filters} >
      <div>
        <button class="button-one">All</button>
        <button class="button-one">UI</button>
        <button class="button-one">UX</button>
      </div>
      <div>
        <button class="button-one">Enhancement</button>
        <button class="button-one">Bug</button>
      </div>
      <div>
        <button class="button-one">Feature</button>
      </div>
    </div>
  )
}
