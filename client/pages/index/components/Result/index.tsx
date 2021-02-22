import React from 'react';
import classnames from 'client/pages/index/pages/me/node_modules/classnames/bind';
import styles from './style.m.less';

const cx = classnames.bind(styles);

function Result(props) {
  
  return (
    <div className={cx('result_box')}>
          <div className={cx('_icon',props.type==1?'suc':props.type==2?'pending':'fail')} />
          <div className={cx('des')}>{props.title}</div>
          {
            props.sub !='' && props.sub &&
            <div className={cx('des_subtitle')}>{props.sub}</div>
          }
    </div>
  )
}
export default Result;