import React, { useReducer, useEffect } from 'react';
import dva, { connect } from 'dva';
import styles from './app.m.scss';

import classnames from 'classnames/bind';
const cx = classnames.bind(styles);

function Index(props) {
  const { children, show, curr } = props;
  return (
    <div className={cx('main_wrap')}>
      {children}
      {show &&
        <div className={cx('bar_w')}>
          <div className={cx('bar')}>
            <div className={cx('bottom_div', (curr == 'home') ? 'acted' : '')}
              onClick={() => {
                props.history.push('/home');
              }}
            >
              <div className={cx('icon', 'book')} />
              <div className={cx('content')}>Library</div>
            </div>
            <div className={cx('bottom_div', (curr == 'discover') ? 'acted' : '')} onClick={() => {
              props.history.push('/discover');
            }}>
              <div className={cx('icon', 'discover')} />
              <div className={cx('content')}>Discover</div>
            </div>
            <div className={cx('bottom_div', (curr == 'me') ? 'acted' : '')}
              onClick={() => {
                props.history.push('/me');
              }}
            >
              <div className={cx('icon', 'user')} />
              <div className={cx('content')}>Me</div>
            </div>
          </div>
        </div>
      }
    </div>
  );
}
const mapStateToProps = ({ global: { bottomBar: { show, curr } } }) => {
  return {
    show,
    curr
  };
};
export default connect(mapStateToProps)(Index);
