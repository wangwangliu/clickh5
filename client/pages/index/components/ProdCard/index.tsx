import React, { useReducer, useEffect } from 'react';
import { request, getLocaleLan, dot } from 'client/utils/index.js';

import styles from './index.m.scss';

import classnames from 'classnames/bind';
const cx = classnames.bind(styles);

function index(props) {
  const { className, title_name, author_pen_name, book_cover,onClick} = props;

  if(!title_name && !author_pen_name){
    return  <div className={cx('swp_card_empty')}/>
  }
  return (
      <div className={cx('swp_card',className)} onClick={onClick.bind(this,props)}>
        <div className={cx('recommend_tag')}>Recommend</div>
        <div className={cx('img_b')}>{
          !!book_cover && <img src={book_cover} />
        }</div>
        <div className={cx('tit')}>{dot(title_name,20)}</div>
        <div className={cx('author')}>{dot(author_pen_name,12)}</div>
        {/* <div className={cx('cate')}>ertert</div> */}
      </div>
  );
}
export default index;