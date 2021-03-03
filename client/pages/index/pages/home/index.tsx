import React, { useReducer, useEffect } from 'react';
import dva, { connect } from 'dva';
import TouchEl from 'client/components/TouchEl';
import { request, getLocaleLan } from 'client/utils/index.js';
import Header from 'client/components/Header';
import ProdCard from 'client/pages/index/components/ProdCard/index';
import styles from './index.m.scss';

import classnames from 'classnames/bind';
import classNames from 'client/pages/index/pages/me/node_modules/classnames/bind';
const cx = classnames.bind(styles);

function Index(props) {
  return (
    <div className={cx('home_wrap')}>
      <Header />
      <div className={cx('banner')}></div>
      <div className={cx('lib_box')}>
        {
          Array(21).fill(0).map((item, index) => {
           return <ProdCard className={cx('prd_')} key={index} />
          })
        }
      </div>
    </div>
  );
}

// const App = connect(({ count }) => ({

// }))(Index)
const App = Index
export default App;