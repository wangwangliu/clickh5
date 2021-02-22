import React, { useReducer, useEffect } from 'react';
// import dva, { connect } from 'dva';
import routes from './routes';
import { Provider } from 'react-redux';
// import { useHistory } from "react-router-dom";
// const history = require("history").createBrowserHistory();

// import { request, getLocaleLan } from 'client/utils/index.js';
import styles from './app.m.scss';

import classnames from 'classnames/bind';
const cx = classnames.bind(styles);

function index(props) {
  return (
    <div className={cx('main_wrap')}>
      {routes()}
      <div className={cx('bar')}>
        <div className={cx('bottom_div')}>
          <div className={cx('icon', 'book')} />
          <div className={cx('content')}>Library</div>
        </div>
        <div className={cx('bottom_div')}>
          <div className={cx('icon', 'discover')} />
          <div className={cx('content')}>Discover</div>
        </div>
        <div className={cx('bottom_div')}>
          <div className={cx('icon', 'user')} />
          <div className={cx('content')}>Me</div>
        </div>
      </div>
    </div>
  );
}

const App = index;
export default App;