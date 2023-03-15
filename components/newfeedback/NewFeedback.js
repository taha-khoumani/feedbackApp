import React, { useEffect, useRef, useState } from 'react'

//next
import Image from 'next/image'
import Link from 'next/link'

//images
import plus from "@/images/icons/icon-new-feedback.svg"
import up from "@/images/icons/icon-arrow-up.svg"
import down from "@/images/icons/icon-arrow-down.svg"
import edit from "@/images/icons/icon-edit-feedback.svg"

//styles
import styles from "@/styles/css/newandedit.module.css"

export default function NewFeedback(props) {
    const [isCatOpen,toggleCat] = useState(false)
    const [cat,setCat] = useState("Feature")

    const refTextarea = useRef(null)

    function changeHeight (el){
      el.style.height = "";
      el.style.height = `${el.scrollHeight}px`;
    }

    function setCatHandler (e,cat){
        setCat(cat)
        toggleCat(false)
        e.stopPropagation()
    }
    
    function toggleOff(){
        if(document.querySelector("#newandedit_filter_options___5rDB")){
            toggleCat(false)
        }
    }

    useEffect(()=>{
        document.body.addEventListener("click",toggleOff)
        return () => document.body.removeEventListener("click",toggleOff)
    },[])

  return (
    <div id={styles.content} >
        <Image src={props.isEdit ? edit : plus} alt={'plus-icon'} width={56} height={56} />
        <h1>
            {   
                props.isEdit ?
                `Editing ‘${'Add a dark theme option'}‘` :
                'Create New Feedback'
            }
        </h1>
        <form onSubmit={(e)=>e.preventDefault()} >
            <div className={styles.inputgroup} >
                <label className={styles.inputtitle} htmlFor="">Feedback Title</label>
                <label className={styles.inputdescription} htmlFor="">Add a short, descriptive headline</label>
                <input style={{margin:0}} className='textarea_one' type="text" />
            </div>
            <div className={styles.inputgroup} >
                <label className={styles.inputtitle} htmlFor="">Category</label>
                <label className={styles.inputdescription} htmlFor="">Choose a category for your feedback</label>
                <div className={styles.cat} >
                    <div onClick={(e)=>{e.stopPropagation();toggleCat(!isCatOpen)}} className='textarea_one' style={{cursor:"pointer",margin:0,display:"flex",alignItems:"center"}} >
                        <p style={{margin:"0 auto 0 0"}} >{cat}</p>
                        <Image src={isCatOpen ? up : down} alt='arrow' />
                    </div>
                    {
                        isCatOpen &&
                        <div id={styles.filter_options}>
                            <p onClick={(e)=>setCatHandler(e,"Feature")}>Feature {cat === "Feature" && <i className="fa-sharp fa-solid fa-check"></i>}</p>
                            <p onClick={(e)=>setCatHandler(e,"UI")}>UI {cat === "UI" && <i className="fa-sharp fa-solid fa-check"></i>}</p>
                            <p onClick={(e)=>setCatHandler(e,"UX")}>UX {cat === "UX" && <i className="fa-sharp fa-solid fa-check"></i>}</p>
                            <p onClick={(e)=>setCatHandler(e,"Enhancement")}>Enhancement {cat === "Enhancement" && <i className="fa-sharp fa-solid fa-check"></i>}</p>
                            <p onClick={(e)=>setCatHandler(e,"Bug")}>Bug {cat === "Bug" && <i className="fa-sharp fa-solid fa-check"></i>}</p>
                        </div>
                    }
                </div>
            </div>
            <div className={styles.inputgroup} >
                <label className={styles.inputtitle} htmlFor="">Feedback Detail</label>
                <label className={styles.inputdescription} htmlFor="">Include any specific comments on what should be improved, added, etc.</label>
                <textarea style={{margin:0}} onInput={()=>changeHeight(refTextarea.current)} ref={refTextarea} className='textarea_one' name="" id="" cols="30" rows="1"></textarea>
            </div>
            <div className={styles.button_div} style={props.isEdit ? {justifyContent:"space-between"} : {}} >
                {   props.isEdit 
                        ?
                    <>
                        <button className='button_delete' >Delete</button> 
                        <div className={styles.button_div} >
                            <button className='button_three' >Cancel</button>
                            <button className='button_two' >Save Changes</button>
                        </div>
                    </>
                        :
                    <>
                        <Link href={"/"} ><button className='button_three'  >Cancel</button></Link>
                        <button className='button_two' >Add Feedback</button>
                    </>
                }
            </div>
        </form>
    </div>
  )
}
