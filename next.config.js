/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env:{
    DATABASE:'feedback',
    SIGN_OUT_REDIRECT:'http://192.168.2.207:3000/',
  }
}

module.exports = nextConfig