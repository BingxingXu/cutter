import React from 'react';
import App from 'next/app';
import Head from 'next/head';
import { ThemeProvider } from '@material-ui/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

import { theme } from '../lib';
import Layout from '../components/Layout';

export default class MyApp extends App {
  componentDidMount() {
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentNode!.removeChild(jssStyles);
    }
  }

  render() {
    const { Component, pageProps, router } = this.props;
    return (
      <React.Fragment>
        <Head>
          <title>Video Editor</title>
        </Head>
        <ThemeProvider theme={theme}>
          {router.pathname.startsWith('/login/')
            ?
            <Component {...pageProps} />
            :
            <Layout>
              <Component {...pageProps} />
            </Layout>
          }
        </ThemeProvider>
      </React.Fragment>
    );
  }
}
