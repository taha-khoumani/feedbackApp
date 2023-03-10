import React from 'react'

//styles
import styles from "@/styles/css/auth.module.css"

export default function AuthFeedback(props) {
  const {status,message} = props.data

  function decideIcon(status){
    switch(status){
      case 'succes':
        return <i className="fa-regular fa-circle-check"></i>
      break;
      case 'error':
        return <i className="fa-solid fa-circle-exclamation"></i>
      break
      case 'pending':
        return <i className="fa-solid fa-spinner"></i>
      break
    }
    
  }

  return (
    <div className={styles[status]} >
      <div>
        {decideIcon(status)}
      </div>
      <p>{message}</p>
    </div>
  )
}
