import React, { useEffect, useRef } from 'react'

//components
import Stage from './Stage'

//styles
import styles from "@/styles/css/roadmap.module.css"

//state
import { useDispatch} from 'react-redux'
import { setcurrentStage } from '@/state/slices/uiSlice' 

export default function RoadmapStages(props) {
  const {planned,inProgress,live} = props.roadmapData
  const stages = useRef(null)
  const dispatch = useDispatch()

  function setStage(newStage){
    dispatch(setcurrentStage(newStage))
  }

  function onScroll (id,direction){
    const navigater = document.querySelector(".roadmap_roadmap_stages__FAUDD")
    const currentPosition = window.getComputedStyle(navigater).left
    const winWidth = window.innerWidth

    let initialPosition;
    if(currentPosition === "0px"){
      initialPosition = "Planned"
    } else if(currentPosition === `-${winWidth}px`){
      initialPosition = "In-Progress"
    } else {
      initialPosition = "Live"
    }


    let to;
    if(direction === "r"){
      switch (initialPosition){
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
      switch (initialPosition){
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

    switch(to){

      case "one":
        setStage("Planned")
      break;

      case "two":
        setStage("In-Progress")
      break;

      case "three":
        setStage("Live")
      break;
      
    }

  }

  useEffect(()=>{
    //mobile-scrolling-event-listener
    (function(d) {
      // based on original source: https://stackoverflow.com/a/17567696/334451
      var newEvent = function(e, name) {
          // This style is already deprecated but very well supported in real world: https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent/initCustomEvent
          // in future we want to use CustomEvent function: https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent/CustomEvent
          var a = document.createEvent("CustomEvent");
          a.initCustomEvent(name, true, true, e.target);
          e.target.dispatchEvent(a);
          a = null;
          return false
      };
      var debug = false; // emit info to JS console for all touch events?
      var active = false; // flag to tell if touchend should complete the gesture
      var min_gesture_length = 20; // minimum gesture length in pixels
      var tolerance = 0.3; // value 0 means pixel perfect movement up or down/left or right is required, 0.5 or more means any diagonal will do, values between can be tweaked
  
      var sp = { x: 0, y: 0, px: 0, py: 0 }; // start point
      var ep = { x: 0, y: 0, px: 0, py: 0 }; // end point
      var touch = {
          touchstart: function(e) {
              active = true;
              var t = e.touches[0];
              sp = { x: t.screenX, y: t.screenY, px: t.pageX, py: t.pageY };
              ep = sp; // make sure we have a sensible end poin in case next event is touchend
              debug && console.log("start", sp);
          },
          touchmove: function(e) {
              if (e.touches.length > 1) {
                  active = false;
                  debug && console.log("aborting gesture because multiple touches detected");
                  return;
              }
              var t = e.touches[0];
              ep = { x: t.screenX, y: t.screenY, px: t.pageX, py: t.pageY };
              debug && console.log("move", ep, sp);
          },
          touchend: function(e) {
              if (!active)
                  return;
              debug && console.log("end", ep, sp);
              var dx = Math.abs(ep.x - sp.x);
              var dy = Math.abs(ep.y - sp.y);
  
              if (Math.max(dx, dy) < min_gesture_length) {
                  debug && console.log("ignoring short gesture");
                  return; // too short gesture, ignore
              }
  
              if (dy > dx && dx/dy < tolerance && Math.abs(sp.py - ep.py) > min_gesture_length) { // up or down, ignore if page scrolled with touch
                  newEvent(e, (ep.y - sp.y < 0 ? 'gesture-up' : 'gesture-down'));
                  //e.cancelable && e.preventDefault();
              }
              else if (dx > dy && dy/dx < tolerance && Math.abs(sp.px - ep.px) > min_gesture_length) { // left or right, ignore if page scrolled with touch
                  newEvent(e, (ep.x - sp.x < 0 ? 'gesture-left' : 'gesture-right'));
                  //e.cancelable && e.preventDefault();
              }
              else {
                  debug && console.log("ignoring diagonal gesture or scrolled content");
              }
              active = false;
          },
          touchcancel: function(e) {
              debug && console.log("cancelling gesture");
              active = false;
          }
      };
      for (var a in touch) {
          d.addEventListener(a, touch[a], false);
          // TODO: MSIE touch support: https://github.com/CamHenlin/TouchPolyfill
      }
    })(window.document);

    function gestureRightHandler () {onScroll("roadmap_stages","r")}
    function gestureLeftHandler () {onScroll("roadmap_stages","l")}

    document.querySelector('#roadmap_stages').addEventListener('gesture-right',gestureRightHandler)
    document.querySelector('#roadmap_stages').addEventListener('gesture-left',gestureLeftHandler)
    return ()=>{
      document.querySelector('#roadmap_stages').removeEventListener('gesture-right',gestureRightHandler)
      document.querySelector('#roadmap_stages').removeEventListener('gesture-left',gestureLeftHandler)
    }
  },[])

  return (
    <div ref={stages} className={styles.roadmap_stages} id="roadmap_stages" >
        <Stage stageData={planned} />
        <Stage stageData={inProgress} />
        <Stage stageData={live} />
    </div>
  )
}
