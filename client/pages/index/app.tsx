import React, { useState, useEffect, useRef } from 'react';
import dva, { connect } from 'dva';
import Slide from 'client/components/Draw/slide';
import TouchEl from 'client/components/TouchEl';
import store from 'store2';
import get from 'lodash/get';
import { Toast } from 'antd-mobile';
import 'antd-mobile/dist/antd-mobile.css';
import styles from './app.m.scss';

import classnames from 'classnames/bind';
const cx = classnames.bind(styles);

function Index(props) {
  const { children, show, curr, showLoginModal, isLogin, dispatch, userInfo } = props;
  const emailRef = useRef();
  const passwordRef = useRef();
  const [is_check, setCheck] = useState(false);

  useEffect(() => {
    (async () => {
      // {"code":200,"env":"prod","message":"","data":{"uid":1,"usertype":1,"username":"buhuweishi@163.com","user_coins":3100,"auto_order":1,"time":1615720042}}
      // 
      let userInfoRes = await dispatch({
        type: 'global/userInfoEff'
      })
      userInfoRes = { "code": 200, "env": "prod", "message": "", "data": { "uid": 1, "usertype": 1, "username": "buhuweishi@163.com", "user_coins": 3100, "auto_order": 1, "time": 1615720042 } }
      if (userInfoRes.code == 200 && !!Object.keys(userInfo).length) {
        await dispatch({
          type: 'global/update',
          payload: {
            userInfo: userInfoRes.data
          }
        })
      }
      if (userInfoRes.code == 10400) {
        await dispatch({
          type: 'global/update',
          payload: {
            isLogin: true
          }
        })
      }
    })()
  }, [])

  //登录操作
  const submitHandle = async () => {
    const { current: emailCurr } = emailRef;
    const { current } = passwordRef;
    const reg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
    let loginUserInfo = null;
    let loginInfo = {};

    if (!is_check || emailCurr.value == '' || current.value == '' || !reg.test(emailCurr.value)) {
      Toast.info('Fill in as required')
      return
    }
    loginInfo = await dispatch({
      type: 'global/login',
      payload: {
        useremail: emailCurr.value,
        userpass: current.value,
        usertype: 1
      }
    })
    // 如果用户不存在
    if (get(loginInfo, 'code') == 104041) {
      const registerInfo = await dispatch({
        type: 'global/register',
        payload: {
          useremail: emailCurr.value,
          userpass: current.value,
          usertype: 1
        }
      })
      // 如果成功
      if (registerInfo.code == 200) {
        loginInfo = await dispatch({
          type: 'global/login',
          payload: {
            useremail: emailCurr.value,
            userpass: current.value,
            usertype: 1
          }
        })
      } else {
        Toast.info(registerInfo.message)
      }
    }

    loginUserInfo = loginInfo.data;

    if (!loginUserInfo) {
      store('iitoken', loginUserInfo);
      dispatch({
        type: 'global/update',
        payload: {
          userInfo: loginUserInfo,
          isLogin: false,
        }
      })
      Toast.info('Login success');
      setTimeout(()=>{
        dispatch({
          type: 'global/update',
          payload: {
            showLoginModal: false,
          }
        })
      },500)
    }
  }

  return (
    <div className={cx('main_wrap')}>
      {children}
      <Slide show={showLoginModal} >
        <div className={cx('login_wrap')}>
          <TouchEl onTap={() => {
            dispatch({
              type: 'global/update',
              payload: {
                showLoginModal: false,
                // isLogin: true
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
            <input type="text" placeholder={'Email'} ref={emailRef} />
            <input type="password" placeholder={'Password'} ref={passwordRef} />
            <div className={cx('check_box')}>
              <div className={cx('check_', is_check ? 'check_ed' : '')}
                onClick={() => {
                  setCheck(!is_check)
                }}
              />
              <div className={cx('protocol_text')}
                onClick={() => {
                  setCheck(!is_check)
                }}
              >Agree to privacy agreement</div>
              <div className={cx('forget')}>Forget password?</div>
            </div>
            <div className={cx('btn_login')}
              onClick={() => {
                submitHandle()
              }}
            >Login with Email</div>
          </div>
        </div>
      </Slide>
      {show &&
        <div className={cx('bar_w')}>
          <div className={cx('bar')}>
            <div className={cx('bottom_div', (curr == 'home') ? 'acted' : '')}
              onClick={() => {
                if (isLogin) {
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
                if (isLogin) {
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
