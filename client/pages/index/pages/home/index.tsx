import React, { useReducer, useEffect } from 'react';
import dva, { connect } from 'dva';
import { request, getLocaleLan } from 'client/utils/index.js';
import styles from './index.m.scss';

import classnames from 'classnames/bind';
const cx = classnames.bind(styles);

function Index(props) {
  return (
    <div className={cx('home_wrap')}>
      Library
    </div>
  );
}

// const App = connect(({ count }) => ({
  
// }))(Index)
const App = Index
export default App;