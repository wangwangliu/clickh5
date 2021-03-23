import 'babel-polyfill';
import { ViewProps } from 'beidou';
import React from 'react';
import dva from 'dva';
import createLoading from 'dva-loading';
import { createBrowserHistory , createMemoryHistory } from 'history';
import { memoryHistory, browserHistory } from 'dva/router';
import router from './router/router';
import modals from './models';
import './index.scss';

function createApp(opts) {
  const app = dva(opts);
  modals.map((item)=>{
    app.model(item)
  })
  // if(__CLIENT__){
  //   console.log(createLoading,'createLoading')
    app.use(createLoading());
  // }
  // 
  app.router(router);
  return app;
};

export default class Index extends React.Component<ViewProps> {
  static doctype = '<!DOCTYPE html>';

  static getStore({ env, domain, codapay, ryid, web, reportApi }) {
    return { domain, env, codapay, ryid, web, reportApi };
  }

  static getPartial(props) {
    const app = createApp({
      history: memoryHistory,
      initialState: {
      },
    });
    return {
      html: app.start()(),
    };
  }
  render() {
    const { html, helper, state} = this.props;
    return (
      <html>
        <head>
          <title>click</title>
          <meta
            name="viewport"
            content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no,viewport-fit=cover"
          />
          <meta httpEquiv="Content-type" content="text/html; charSet=utf-8" />
          <meta name="msapplication-tap-highlight" content="no" />
          <meta property="og:image" content={''} />
          <meta property="og:title" content={'og:title'} />
          <meta property="og:description" content={'og:description'} />
          <link rel="icon" href="/favicon.ico" type="image/x-icon" />
          <meta name="description" content={'description'} />
          <meta name="keyword" content={'keywords'} />
         
          <link rel="stylesheet" href={helper.asset('index.css')} />
        </head>
        <body>
          <div id="container" dangerouslySetInnerHTML={{ __html: html }} />
          <script
            dangerouslySetInnerHTML={{
              __html: `window.DOMAIN_API = ${state};`,
            }}
          />
          <script src={helper.asset('react.js')} />
          <script src={helper.asset('index.js')} />
        </body>
      </html>
    );
  }
}

if (__CLIENT__) {
  const app = createApp({
    history: browserHistory,
    initialState: {
    },
  });
  app.start('#container');
}