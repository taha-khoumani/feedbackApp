import React, { useEffect } from 'react'

//images
import suggestions from "@/images/icons/icon-suggestions.svg"

//next
import Image from 'next/image'
import { useRouter } from 'next/router'

//styles
import styles from "@/styles/css/main.module.css"

//state
import {setSortMethode,toggleSort} from "@/state/slices/uiSlice"
import { useDispatch,useSelector } from 'react-redux'

//auth
import { useSession } from 'next-auth/react'

export default function FeedbackBar() {
    const {isSortOpen,sortMethode,screenWidth} = useSelector(store=>store.ui)
    const dispatch = useDispatch()

    function setSortMethodeHandler (e,methode){
        console.log(methode)
        dispatch(setSortMethode(methode))
        dispatch(toggleSort(!isSortOpen))
        e.stopPropagation()
    }

    

    function toggleOff(e){
        if( 
            e.target.parentElement !== document.querySelector("#main_filter_options__fanaa") &&
             document.querySelector("#main_filter_options__fanaa")
        ){
            dispatch(toggleSort(false))
            e.stopPropagation()
        }
    }

    useEffect(()=>{
        document.body.addEventListener("click",toggleOff,true)
        return () => document.body.removeEventListener("click",toggleOff)
    },[])

    //add-feedback-logic
    const {data,status} = useSession()
    const router = useRouter()
    function addFeedbackHandler(){
        
        if(status !== "authenticated") {
            alert("you need to be signed up to add a feedback")
            return;
        }

        router.push("/feedbacks/new")
    }

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
                onClick={(e)=>{
                    dispatch(toggleSort(!isSortOpen))
                    e.stopPropagation()
                }}
            >
                <p id={styles.sort} >Sort by :</p>
                <p id={styles.by_what} >&nbsp;{sortMethode}&nbsp;</p>
                <i className={`fa-sharp fa-solid fa-angle-${isSortOpen ? "up" : "down"}`}></i>
            </div>
            {
                isSortOpen &&
                <div id={styles.filter_options}>
                    <p onClick={(e)=>setSortMethodeHandler(e,"Most Upvotes")}>Most Upvotes {sortMethode === "Most Upvotes" && <i className="fa-sharp fa-solid fa-check"></i>}</p>
                    <p onClick={(e)=>setSortMethodeHandler(e,"Least Upvotes")}>Least Upvotes {sortMethode === "Least Upvotes" && <i className="fa-sharp fa-solid fa-check"></i>}</p>
                    <p onClick={(e)=>setSortMethodeHandler(e,"Most Comments")}>Most Comments {sortMethode === "Most Comments" && <i className="fa-sharp fa-solid fa-check"></i>}</p>
                    <p onClick={(e)=>setSortMethodeHandler(e,"Least Comments")}>Least Comments {sortMethode === "Least Comments" && <i className="fa-sharp fa-solid fa-check"></i>}</p>
                </div>
            }
        </div>
        <button 
            className='button_two'
            onClick={addFeedbackHandler}    
        >
            + Add Feedback
        </button>
    </div>
  )
}


