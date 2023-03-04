import React, { useEffect, useRef } from 'react'

//components
import Stage from './Stage'

//styles
import styles from "@/styles/css/roadmap.module.css"

//state
import { useDispatch, useSelector } from 'react-redux'
import { setcurrentStage } from '@/state/slices/uiSlice' 

export default function RoadmapStages(props) {
  const {planned,inProgress,live} = props.roadmapData
  const {currentStage} = useSelector(store=>store.ui)
  const stages = useRef(null)
  const dispatch = useDispatch()

  function setStage(newStage){
    dispatch(setcurrentStage(newStage))
  }

  // dispatch(setcurrentStage("tagopi"))
  function onScroll (id,direction){
    if(direction === "u" && direction === "d") return

    setStage("Live")
    console.log(currentStage)
    const navigater = document.querySelector(".roadmap_roadmap_stages__FAUDD")
    const currentPosition = window.getComputedStyle(navigater).left
    let to;

    if(direction === "r"){
      switch (currentStage){
        case "Planned": 
          to = ""
        break;
        case "In-Progress":
          to = "one"
        break;
        case "Live":
          to = "two"
        break;
      }
    }
    else{
      switch (currentStage){
        case "Planned": 
          to = "two"
        break;
        case "In-Progress":
          to = "three"
        break;
        case "Live":
          to = ""
        break;
      }
    }

    navigater.style.left = `${currentPosition}`
    navigater.style.animationName = `${to}`

    if(to === "one"){
      setStage("Planned")
    } else if(to === "two"){
      setStage("In-Progress")
    } else if(to === "three"){
      setStage("Live")
    }

    // switch(to){
    //   case "one":
    //     setStage("Planned")
    //   break;
    //   case "two":
    //     setStage("In-Progress")
    //   break;
    //   case "three":
    //     setStage("Live")
    //   break;
    // }

  }

  useEffect(()=>{

    //mobile-scrolling-event-listener
    function detectswipe(el,func) {
      var swipe_det = new Object();
      swipe_det.sX = 0;
      swipe_det.sY = 0;
      swipe_det.eX = 0;
      swipe_det.eY = 0;
      var min_x = 20;  //min x swipe for horizontal swipe
      var max_x = 40;  //max x difference for vertical swipe
      var min_y = 40;  //min y swipe for vertical swipe
      var max_y = 50;  //max y difference for horizontal swipe
      var direc = "";
      var ele = document.getElementById(el);
      ele.addEventListener('touchstart',function(e){
        var t = e.touches[0];
        swipe_det.sX = t.screenX; 
        swipe_det.sY = t.screenY;
      },false);
      ele.addEventListener('touchmove',function(e){
        e.preventDefault();
        var t = e.touches[0];
        swipe_det.eX = t.screenX; 
        swipe_det.eY = t.screenY;    
      },false);
      ele.addEventListener('touchend',function(e){
        //horizontal detection
        if ((((swipe_det.eX - min_x > swipe_det.sX) || (swipe_det.eX + min_x < swipe_det.sX)) && ((swipe_det.eY < swipe_det.sY + max_y) && (swipe_det.sY > swipe_det.eY - max_y)))) {
          if(swipe_det.eX > swipe_det.sX) direc = "r";
          else direc = "l";
        }
        //vertical detection
        if ((((swipe_det.eY - min_y > swipe_det.sY) || (swipe_det.eY + min_y < swipe_det.sY)) && ((swipe_det.eX < swipe_det.sX + max_x) && (swipe_det.sX > swipe_det.eX - max_x)))) {
          if(swipe_det.eY > swipe_det.sY) direc = "d";
          else direc = "u";
        }
    
        if (direc != "") {
          if(typeof func == 'function') func(el,direc);
        }
        direc = "";
      },false);  
    }

    detectswipe('roadmap_stages',onScroll)
  },[])

  return (
    <div ref={stages} className={styles.roadmap_stages} id="roadmap_stages" >
        <Stage stageData={planned} />
        <Stage stageData={inProgress} />
        <Stage stageData={live} />
    </div>
  )
}
