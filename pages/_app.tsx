import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Layout from '../components/Layout'
import Head from 'next/head'

import React from 'react';
import { Provider } from 'react-redux';
import store from '../store'
import { CssBaseline } from '@mui/material';
import { ThemeProvider, useTheme, createTheme } from '@mui/material/styles';
import { amber, deepOrange, grey } from '@mui/material/colors';
import { PaletteMode } from '@mui/material';

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

function MyApp({ Component, pageProps }: AppProps) {
  const theme = useTheme();

  const darkModeTheme = createTheme(getDesignTokens('dark'));
  
  return (
    <ThemeProvider theme={darkModeTheme}>
      <CssBaseline />
      <Provider store={store}>
        <Layout>
          <Head>
            <title>GameHub</title>
          </Head>
          <Component {...pageProps} />
        </Layout>
      </Provider>
    </ThemeProvider>
  )
}

export default MyApp
