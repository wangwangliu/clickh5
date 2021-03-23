import React, { useReducer, useEffect } from 'react';
import dva, { connect } from 'dva';
import { request, getLocaleLan, dot } from 'client/utils/index.js';

import styles from './index.m.scss';

import classnames from 'classnames/bind';
const cx = classnames.bind(styles);

function index(props) {
  return (
    <>
      <div className={cx('top_h')}>
        <div className={cx('logo')}
          onClick={()=>{
            window.location.href = '/'
          }}
        />
      </div>
      <div className={cx('placeholder')} />
    </>
  );
}
export default index;