import React from 'react'

//styles
import headerStyles from "@/styles/css/header.module.css"

//state
import { useDispatch,useSelector } from 'react-redux'
import { setFilter,toggleMenu } from '@/state/slices/uiSlice'

export default function Filters() {
  const {filter,isMenuOpen,screenWidth} = useSelector(store=>store.ui)
  const dispatch = useDispatch()

  function onClickHandler (filter){
    dispatch(setFilter(filter))
    if(isMenuOpen){
      document.querySelector("#header_menu__1DIIo").classList.remove("menu-left")
      document.querySelector('#header_filter_roadmap__DVAvC').style.backgroundColor = "transparent"
      document.querySelector("#header_menu__1DIIo").classList.add("menu-right")
      document.body.style.position = "static"
      setTimeout(()=>dispatch(toggleMenu(false)),250) 
    }
  }

  const selectedStyles={
    backgroundColor:"#4661E6",
    color:"white"
  }

  return (
    <div id={headerStyles.filters} >

      {
        screenWidth > 767 && screenWidth < 1024 
        ?
        <>
          {/* <p>Filters</p> */}
          {/* <div> */}
            {/* <div> */}
              <button style={filter==="all"?selectedStyles:{}} className="button-one" onClick={()=>onClickHandler("all")} >All</button>
              <button style={filter==="ui"?selectedStyles:{}} className="button-one" onClick={()=>onClickHandler("ui")} >UI</button>
              <button style={filter==="ux"?selectedStyles:{}} className="button-one" onClick={()=>onClickHandler("ux")} >UX</button>
              <button style={filter==="bug"?selectedStyles:{}} className="button-one" onClick={()=>onClickHandler("bug")} >Bug</button>
              <button style={filter==="enhancement"?selectedStyles:{}} className="button-one" onClick={()=>onClickHandler("enhancement")} >Enhancement</button>
            {/* </div> */}
            {/* <div> */}
              <button style={filter==="feature"?selectedStyles:{}} className="button-one" onClick={()=>onClickHandler("feature")} >Feature</button>
            {/* </div> */}
          {/* </div> */}
        </>
        :
        <>
          <div>
            <button style={filter==="all"?selectedStyles:{}} className="button-one" onClick={()=>onClickHandler("all")} >All</button>
            <button style={filter==="ui"?selectedStyles:{}} className="button-one" onClick={()=>onClickHandler("ui")} >UI</button>
            <button style={filter==="ux"?selectedStyles:{}} className="button-one" onClick={()=>onClickHandler("ux")} >UX</button>
          </div>
          <div>
            <button style={filter==="enhancement"?selectedStyles:{}} className="button-one" onClick={()=>onClickHandler("enhancement")} >Enhancement</button>
            <button style={filter==="bug"?selectedStyles:{}} className="button-one" onClick={()=>onClickHandler("bug")} >Bug</button>
          </div>
          <div>
            <button style={filter==="feature"?selectedStyles:{}} className="button-one" onClick={()=>onClickHandler("feature")} >Feature</button>
          </div>
        </>
      }
    </div>
  )
}
