import '@/styles/globals.scss'
import type { AppProps } from 'next/app'
import Head from 'next/head'

import { Provider } from 'react-redux'
import store from '@/redux/store'



export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Provider store={store}>
        <Head><title>Shame7宠物管理系统</title></Head>
        <Component {...pageProps} />
      </Provider>

    </>
  )
}
