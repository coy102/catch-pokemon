import React from 'react';
import App from 'next/app';
import withRedux from 'next-redux-wrapper';
import withReduxSaga from 'next-redux-saga';
import { ThemeProvider } from '@material-ui/core/styles';
import { Provider } from 'react-redux';
import { SnackbarProvider } from 'notistack';
import CssBaseline from '@material-ui/core/CssBaseline';

import theme from '../shared/theme';
import initStore from '@services/redux_setup/rootStore';
import Snackbar from '@modules/notify/Snackbar';

class MainApp extends App {
  static async getInitialProps({ Component, ctx }: any) {
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps({ ctx });
    }

    return { pageProps };
  }

  componentDidMount() {
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement!.removeChild(jssStyles);
    }
  }

  render() {
    const { Component, pageProps, store } = (this as any).props;

    return (
      <React.Fragment>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Provider store={store}>
            <SnackbarProvider>
              <Component {...pageProps} />
              <Snackbar />
            </SnackbarProvider>
          </Provider>
        </ThemeProvider>
      </React.Fragment>
    );
  }
}

export default withRedux(initStore)(withReduxSaga(MainApp));
