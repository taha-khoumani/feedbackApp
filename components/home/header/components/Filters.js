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
        <button className="button-one">All</button>
        <button className="button-one">UI</button>
        <button className="button-one">UX</button>
      </div>
      <div>
        <button className="button-one">Enhancement</button>
        <button className="button-one">Bug</button>
      </div>
      <div>
        <button className="button-one">Feature</button>
      </div>
    </div>
  )
}
