import React, { useReducer, useEffect } from 'react';
import dva, { connect } from 'dva';
import Slide from 'client/components/Draw/slide';
import TouchEl from 'client/components/TouchEl';
import styles from './app.m.scss';

import classnames from 'classnames/bind';
const cx = classnames.bind(styles);

function Index(props) {
  const { children, show, curr, showLoginModal, isLogin, dispatch } = props;
  return (
    <div className={cx('main_wrap')}>
      {children}

      <Slide show={showLoginModal} >
        <div className={cx('login_wrap')}>
          <TouchEl onTap={()=>{
            dispatch({
              type: 'global/update',
              payload: {
                showLoginModal: false,
                isLogin:true
              }
            })
          }}>
            <div className={cx('close')} />
          </TouchEl>
         
          <div className={cx('login_logo')} />
          <div className={cx('login_title')}>Welcome to clickboard</div>
          <div className={cx('_btn', 'e_mail')} />
          <div className={cx('_btn', '_google')} />
          <div className={cx('_btn', '_facebook')} />
          <div className={cx('login_form')}>
            <div className={cx('title_')}>Login/ Sign up with email</div>
            <input type="text" placeholder={'Email'} />
            <input type="password" placeholder={'Password'} />
            <div className={cx('check_box')}>
              <div className={cx('check_')} />
              <div className={cx('protocol_text')}>Agree to privacy agreement</div>
              <div className={cx('forget')}>Forget password?</div>
            </div>
            <div className={cx('btn_login')}>Login with Email</div>
          </div>
        </div>
      </Slide>
      {show &&
        <div className={cx('bar_w')}>
          <div className={cx('bar')}>
            <div className={cx('bottom_div', (curr == 'home') ? 'acted' : '')}
              onClick={() => {
                if (!isLogin) {
                  dispatch({
                    type: 'global/update',
                    payload: {
                      showLoginModal: true,
                    }
                  })
                  return
                }
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
                if (!isLogin) {
                  dispatch({
                    type: 'global/update',
                    payload: {
                      showLoginModal: true,
                    }
                  })
                  return
                }
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
const mapStateToProps = ({ global: { bottomBar: { show, curr }, showLoginModal, userInfo, isLogin } }) => {
  return {
    show,
    curr,
    showLoginModal,
    userInfo,
    isLogin
  };
};
export default connect(mapStateToProps)(Index);
