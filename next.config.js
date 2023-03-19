const {PHASE_DEVLOPEMENT_SERVER} = require('next/constants')

/** @type {import('next').NextConfig} */
const nextConfig = (phase) =>{
  if(phase === PHASE_DEVLOPEMENT_SERVER){
    return {
      reactStrictMode: true,
      env:{
        DATABASE:'feedback',
        SIGN_OUT_REDIRECT:'http://192.168.2.207:3000/',
      }
    }
  }

  return{
    reactStrictMode: true,
    env:{
      DATABASE:'feedback_production',
      SIGN_OUT_REDIRECT:'/',
    }
  }
}

module.exports = nextConfig