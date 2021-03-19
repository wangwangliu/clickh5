import React, { useReducer, useState } from 'react';
import dva, { connect } from 'dva';
import { request, getLocaleLan } from 'client/utils/index.js';
import styles from './index.m.scss';

import classnames from 'classnames/bind';
const cx = classnames.bind(styles);

function index(props) {
  const { menus = [], onClick, style = {} } = props;
  const [sel, setSel] = useState(0)
  // console.log(menus,'menus')
  return (
    <div className={cx('menu')} style={style}>
      {
        !!menus.length &&
        menus.map((item, index) => {
          return <div className={cx('menu_bar',sel==index?'act':'')} key={index}
            onClick={()=>{
              setSel(index);
              onClick(item)
            }}
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