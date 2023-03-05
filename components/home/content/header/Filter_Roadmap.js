import React from 'react'


//styles
import styles from "@/styles/css/header.module.css"

//components
import Filters from './Filters'
import Roadmap from './Roadmap'

//state
import { useSelector,useDispatch } from 'react-redux'
import { toggleMenu } from '@/state/slices/uiSlice'

export default function Filter_Roadmap() {
    const dispatch = useDispatch()

    const {isMenuOpen,screenWidth} = useSelector(store=>store.ui)

    function toggleMenuHandler (boolean){
        //open-modal
        if(boolean){
            dispatch(toggleMenu(boolean))
            document.body.style.position = "fixed"
        }
        
        //close-modal
        else{
          document.querySelector("#header_menu__1DIIo").classList.remove("menu-left")
          document.querySelector('#header_filter_roadmap__DVAvC').style.backgroundColor = "transparent"
          document.querySelector("#header_menu__1DIIo").classList.add("menu-right")
          document.body.style.position = "static"
          setTimeout(()=>dispatch(toggleMenu(boolean)),250) 
        }
    }

    if(screenWidth < 768){
        return(
            isMenuOpen 
            &&
            <div 
                id={styles.filter_roadmap} 
                style={{top:`72px`,height: `calc(100% - 72px)`}}
                onClick={()=>toggleMenuHandler(!isMenuOpen)}
            >
                <div>
                    <div
                        id={styles.menu}
                        className="menu-left"
                        onClick={(e)=>e.stopPropagation()}
                    >
                        <Filters />
                        <Roadmap />
                    </div>
                </div>
            </div>
        )
    } else{
        return (
            <>
                <Filters />
                <Roadmap />
            </>
        )
    }
}
