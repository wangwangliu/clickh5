import React, { useReducer, useEffect } from 'react';
import { request, getLocaleLan, dot } from 'client/utils/index.js';

import styles from './index.m.scss';

import classnames from 'classnames/bind';
const cx = classnames.bind(styles);

function index(props) {
  const { className} = props;
  return (
      <div className={cx('swp_card',className)}>
        <div className={cx('recommend_tag')}>Recommend</div>
        <div className={cx('img_b')}></div>
        <div className={cx('tit')}>ertete</div>
        <div className={cx('author')}>ertet</div>
        <div className={cx('cate')}>ertert</div>
      </div>
  );
}

// const App = connect(({ count }) => ({
//   count,
// }))(index)
export default index;