import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Layout from '../components/Layout'
import Head from 'next/head'

import allReducers,{RootState} from '../store/reducer';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

const store = createStore(allReducers);

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Head>
        <title>GameHub</title>
      </Head>
      <Provider store={store}>
       <Component {...pageProps} />
      </Provider>
    </Layout>
  )
}

export default MyApp
