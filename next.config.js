/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env:{
    DATABASE:process.env.DATABASE,
    SIGN_OUT_REDIRECT:process.env.SIGN_OUT_REDIRECT,
    NEXTAUTH_SECRET:process.env.NEXTAUTH_SECRET,
  }
  
}

module.exports = nextConfig