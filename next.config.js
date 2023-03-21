/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env:{
    DATABASE:'feedback',
    SIGN_OUT_REDIRECT:'http://192.168.2.207:3000/',
    NEXTAUTH_SECRET:'Pnj4s2VIZ5W6U06CmJHN+ASmvKFg2O9HXuxINpnazT4=',
  }
  
}
module.exports = nextConfig