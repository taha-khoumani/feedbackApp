import React, { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'

//styles
import styles from '@/styles/css/ui.module.css'

//state
import { useDispatch, useSelector } from 'react-redux'
import { setMustSigninModal } from '@/state/slices/uiSlice'

//next
import { useRouter } from 'next/router'

export default function MustSignInModal(props) {
  const {el} = props

  const {mustSigninModal} = useSelector(store=>store.ui)

  const [returnedEl,setReturnedEl] = useState(null)

  const dispatch = useDispatch()

  const router = useRouter()

  useEffect(()=>{
    if(mustSigninModal.isOpen) document.body.style.position = 'fixed'
    else document.body.style.position = 'static'
  },[mustSigninModal])

  function onClickHandler(e){
    dispatch(setMustSigninModal({isOpen:false}))
  }

  function onClickContainerHandler (e){
    e.stopPropagation()
  }

  function onSignInHandler(){
    router.push('/auth/sign_in')
    dispatch(setMustSigninModal({isOpen:false}))
  }

  function onCancelHandler(){
    dispatch(setMustSigninModal({isOpen:false}))
  }
  
  useEffect(()=>{
    setReturnedEl(
      createPortal(
        <div className={styles.must_sign_in_modal} onClick={onClickHandler} >
          <div className={styles.modale_container} onClick={onClickContainerHandler} >
            <p>You need to Sign In<br/>before you can<br/>{mustSigninModal.value}</p>
            <div>
              <button onClick={onSignInHandler} className='button_two'>Sign In</button>
              <button onClick={onCancelHandler} className='button_three' >Cancel</button>
            </div>
          </div>
        </div>,
        document.body
      )
    )
  },[mustSigninModal])

  if(!mustSigninModal.isOpen) return;

  return returnedEl;
}
