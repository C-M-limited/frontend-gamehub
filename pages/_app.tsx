import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Layout from '../components/Layout'
import Head from 'next/head'

import React from 'react';
import { Provider } from 'react-redux';
import store from '../store'
import { CssBaseline,ThemeProvider, useTheme, createTheme } from '@mui/material';
// import {  } from '@mui/material/styles';
import { amber, deepOrange, grey } from '@mui/material/colors';
import { PaletteMode } from '@mui/material';
import NextNProgress from "nextjs-progressbar";
import { CacheProvider,EmotionCache } from '@emotion/react';
import createEmotionCache from '../utility/CreateEmotionCache2';
import { QueryClient, QueryClientProvider, useQuery } from 'react-query'

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import '../styles/globals.css';

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}
const clientSideEmotionCache = createEmotionCache();

const getDesignTokens = (mode: PaletteMode) => ({
  palette: {
    mode,
    // primary: {
    //   ...amber,
    //   ...(mode === 'dark' && {
    //     main: amber[300],
    //   }),
    // },
    ...(mode === 'dark' && {
      background: {
        // default: deepOrange[900],
        // paper: deepOrange[900],
      },
    }),
    text: {
      ...(mode === 'light'
        ? {
            primary: grey[900],
            secondary: grey[800],
          }
        : {
            // primary: '#fff',
            // secondary: grey[500],
          }),
    },
  },
});
const MyApp: React.FunctionComponent<MyAppProps> = (props) => {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  const theme = useTheme();

  const darkModeTheme = createTheme(getDesignTokens('dark'));
  const queryClient = new QueryClient()

  return (
      <QueryClientProvider client={queryClient}>
        <CacheProvider value={emotionCache}>
          <ThemeProvider theme={darkModeTheme}>
            <Provider store={store}>
              <NextNProgress />
              <Layout>
                <Head>
                  <title>GameHub</title>
                  <meta property="og:image" content="https://www.gamehub.link/favicon.png" />
                </Head>
                <CssBaseline />
                <Component {...pageProps} />
              </Layout>
            </Provider>
          </ThemeProvider>
        </CacheProvider>
      </QueryClientProvider>
  )
}

export default MyApp
