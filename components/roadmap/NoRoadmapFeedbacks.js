import React from 'react'

//next
import Image from 'next/image'

//images
import noFeedback from "@/images/icons/illustration-empty.svg"

//styles
import stylesI from "@/styles/css/feedback.module.css"
import stylesII from "@/styles/css/roadmap.module.css"

//components
import OnMobileNav from './min-components/OnMobileNav'

export default function NoRoadmapFeedbacks() {
    return         <div id={stylesI.no_roadmap_feedback} >
    <Image id={stylesI.no_feedback_img} src={noFeedback} alt="no-feedbacks" />
    <p id={stylesI.no_feedback_title} >{`There is no roadmap feedback yet.`}</p>
    <p id={stylesI.no_feedback_description} >Got a suggestion? Found a bug that needs to be squashed?<br/>We love hearing about new ideas to improve our app.</p>
    <button className='button_two' style={{margin:"0"}}>
        + Add Feedback
    </button>
</div>
  return (
    <div id={stylesI.no_roadmap_feedback_wraper} >
        <div className={stylesII.OnMobileNav} >
            <div className={stylesII.OnMobileNav_cats}  >
                <p 
                // onClick={()=>onClickHandler(1,"Planned")} 
                // style={selectedStageStyles("Planned")} 
                >
                Planned (0)</p>

                <p 
                // onClick={()=>onClickHandler(2,"In-Progress")} 
                // style={selectedStageStyles("In-Progress")} 
                >
                In-Progress (0)</p>

                <p 
                // onClick={()=>onClickHandler(3,"Live")} 
                // style={selectedStageStyles("Live")} 
                >
                Live (0)</p>
            </div>
            {/* <hr ref={hr} /> */}
        </div>
        <div id={stylesII.no_roadmap_headers} >
            <div className={stylesII.stage_header} > 
                <p className={stylesII.stage_header_title} >Planned (0)</p>
                <p className={stylesII.stage_header_descripton}>Ideas prioritized for research</p>
            </div>
            <div className={stylesII.stage_header} > 
                <p className={stylesII.stage_header_title}>In-Progress (0)</p>
                <p className={stylesII.stage_header_descripton} >Currently being developed</p>
            </div>
            <div className={stylesII.stage_header} > 
                <p className={stylesII.stage_header_title} >Live (0)</p>
                <p className={stylesII.stage_header_descripton} >Released features</p>
            </div>
        </div>
        <div id={stylesI.no_roadmap_feedback} >
            <Image id={stylesI.no_feedback_img} src={noFeedback} alt="no-feedbacks" />
            <p id={stylesI.no_feedback_title} >{`There is no roadmap feedback yet.`}</p>
            <p id={stylesI.no_feedback_description} >Got a suggestion? Found a bug that needs to be squashed?<br/>We love hearing about new ideas to improve our app.</p>
            <button className='button_two' style={{margin:"0"}}>
                + Add Feedback
            </button>
        </div>
    </div>
  )
}
