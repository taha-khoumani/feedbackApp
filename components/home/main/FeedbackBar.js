import React, { useEffect } from 'react'

//images
import suggestions from "@/images/icons/icon-suggestions.svg"

//next
import Image from 'next/image'

//styles
import styles from "@/styles/css/main.module.css"

//state
import {setSortMethode,toggleSort} from "@/state/slices/uiSlice"
import { useDispatch,useSelector } from 'react-redux'

export default function FeedbackBar() {
    const {isSortOpen,sortMethode,screenWidth} = useSelector(store=>store.ui)
    const dispatch = useDispatch()

    function setSortMethodeHandler (methode){
        dispatch(setSortMethode(methode))
        dispatch(toggleSort(!isSortOpen))
    }

    function toggleOff(){
        if(isSortOpen){
            dispatch(toggleSort(false))
        }
    }

    useEffect(()=>{
        document.querySelector("#home_home__bZmM7").addEventListener("click",toggleOff)
        return document.body.removeEventListener("click",toggleOff)
    },[isSortOpen])

  return (
    <div id={styles.feedback_bar}>
        {
            screenWidth > 530 &&
            <div id={styles.sugg_num} >
                <Image src={suggestions} alt={'suggestions'} property="true" />
                <p>6 Suggestions</p>
            </div>
        }
        <div id={styles.filter_container}>
            <div 
                id={styles.filter}
                onClick={()=> dispatch(toggleSort(!isSortOpen))}
            >
                <p id={styles.sort} >Sort by :</p>
                <p id={styles.by_what} >&nbsp;{sortMethode}&nbsp;</p>
                <i className={`fa-sharp fa-solid fa-angle-${isSortOpen ? "up" : "down"}`}></i>
            </div>
            {
                isSortOpen &&
                <div id={styles.filter_options}>
                    <p onClick={()=>setSortMethodeHandler("Most Upvotes")} >Most Upvotes {sortMethode === "Most Upvotes" && <i className="fa-sharp fa-solid fa-check"></i>}</p>
                    <p onClick={()=>setSortMethodeHandler("Least Upvotes")}>Least Upvotes {sortMethode === "Least Upvotes" && <i className="fa-sharp fa-solid fa-check"></i>}</p>
                    <p onClick={()=>setSortMethodeHandler("Most Comments")}>Most Comments {sortMethode === "Most Comments" && <i className="fa-sharp fa-solid fa-check"></i>}</p>
                    <p onClick={()=>setSortMethodeHandler("Least Comments")}>Least Comments {sortMethode === "Least Comments" && <i className="fa-sharp fa-solid fa-check"></i>}</p>
                </div>
            }
        </div>
        <button className='button_two'>
            + Add Feedback
        </button>
    </div>
  )
}


