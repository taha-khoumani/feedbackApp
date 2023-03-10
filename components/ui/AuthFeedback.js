import React from 'react'

export default function AuthFeedback(props) {
  const {status,message} = props.data
  return (
    <div>
      <p>{message}</p>
    </div>
  )
}
