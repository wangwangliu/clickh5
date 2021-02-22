import React from 'react';
import ReactDOM from 'react-dom';
import { StaticRouter } from 'react-router';
import 'babel-polyfill';
import { BrowserRouter, HashRouter } from 'react-router-dom';
import App from './app';
import './index.scss';

const Router = __CLIENT__ ? BrowserRouter : StaticRouter;

/**
 * custom view template
 *
 * @export
 * @class View
 * @extends {React.Component}
 */
export default class View extends React.Component {
  static doctype = '<!DOCTYPE html>';

  /**
   * construct store for server side
   */
  static getStore({ env, domain, codapay, ryid, web, reportApi, alarm }) {
    return { domain, env, codapay, ryid, web, reportApi, alarm };
  }

  static getPartial() {
    const html = (
      <Router>
        <App />
      </Router>
    );
    return { html };
  }

  render() {
    const { html, state, helper, title, env } = this.props;
    return (
      <html>
        <head>
          <title>{title || 'wallet'}</title>
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
  const app = (
    <Router>
      <App />
    </Router>
  );
  ReactDOM.render(app, document.getElementById('container'));
}