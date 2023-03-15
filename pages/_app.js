//styles
import '@/styles/css/globals.css'

//state
import { Provider } from 'react-redux'
import {store} from "@/state/store"

//authorization
import { SessionProvider } from "next-auth/react"

export default function App({ Component, pageProps:{ session, ...pageProps }}) {
  return(
    <Provider store={store}>
      <SessionProvider session={session} >
        <Component {...pageProps} />
      </SessionProvider>
    </Provider>
  ) 
}
