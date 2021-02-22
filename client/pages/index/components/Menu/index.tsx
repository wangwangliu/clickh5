import React, { useReducer, useEffect } from 'react';
import dva, { connect } from 'dva';
import { request, getLocaleLan } from 'client/utils/index.js';
import styles from './index.m.scss';

import classnames from 'classnames/bind';
const cx = classnames.bind(styles);

function index(props) {
  const { menus = [], onClick, style = {} } = props;
  return (
    <div className={cx('menu')} style={style}>
      {
        !!menus.length &&
        menus.map((item, index) => {
          return <div className={cx('menu_bar')} key={index}
            onClick={onClick.bind(this,item)}
          >
            {item}
          </div>
        })
      }
    </div>
  );
}

// const App = connect(({ count }) => ({
//   count,
// }))(index)
export default index;