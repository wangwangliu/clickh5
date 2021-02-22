import React, { useReducer, useEffect } from 'react';
import dva, { connect } from 'dva';
import { request, getLocaleLan } from 'client/utils/index.js';
import Header from 'client/components/Header';

import styles from './index.m.scss';

import classnames from 'classnames/bind';
const cx = classnames.bind(styles);

function index() {
  return (
    <div className={cx('me_wrap')}>
      <Header />
    </div>
  );
}

const App = connect(({ count }) => ({
  count,
}))(index)
export default App;