import React, { useReducer, useEffect } from 'react';
import dva, { connect } from 'dva';
import { request, getLocaleLan, dot } from 'client/utils/index.js';

import styles from './index.m.scss';

import classnames from 'classnames/bind';
const cx = classnames.bind(styles);

function index(props) {
  const { cover_img,title, sub_title, disc, className} = props;
  return (
    <div className={cx('card',className)}>
      <div className={cx('img_b')}>{!!cover_img && <img src={cover_img} />}</div>
      <div className={cx('right_c')}>
        <p className={cx('title')}>{title||''}</p>
        <p className={cx('sub_t')}>{sub_title||''}</p>
        <p className={cx('conent')}>{dot(disc,200)}</p>
        <div className={cx('_btn')}>Paranormal Romance</div>
      </div>
    </div>
  );
}

// const App = connect(({ count }) => ({
//   count,
// }))(index)
export default index;