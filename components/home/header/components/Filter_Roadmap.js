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

    const {isMenuOpen,screenWidth,logoHeight} = useSelector(store=>store.ui)

    const upOffset = {top:`${logoHeight}px`}

    function toggleMenuHandler (boolean){
        //open-modal
        if(boolean){
          dispatch(toggleMenu(boolean))
          document.body.style.position = "fixed"
        }
        
        //close-modal
        else{
          dispatch(toggleMenu(boolean))
          document.body.style.position = "static"
        }
    }

    if(screenWidth < 768){
        return(
            isMenuOpen 
            &&
            <div 
                id={styles.filter_roadmap} 
                style={upOffset}
                onClick={()=>toggleMenuHandler(!isMenuOpen)}
            >
                <div
                    onClick={(e)=>e.stopPropagation()}
                >
                    <Filters />
                    <Roadmap />
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
