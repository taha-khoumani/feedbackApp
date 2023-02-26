import React from 'react'

//styles
import styles from "@/styles/css/header.module.css"

//components
import Filters from './Filters'
import Roadmap from './Roadmap'

//state
import { useSelector } from 'react-redux'

export default function Filter_Roadmap() {
    const {isMenuOpen,screenWidth} = useSelector(store=>store.ui)

    if(screenWidth < 768){
        return(
            isMenuOpen 
            &&
            <div id={styles.filter_roadmap} >
                <div>
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
