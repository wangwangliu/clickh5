import React, { useState, useEffect, useRef } from 'react';
import dva, { connect } from 'dva';
import Slide from 'client/components/Draw/slide';
import TouchEl from 'client/components/TouchEl';
import { loginFunc } from 'client/utils/globalVar'
import store from 'store2';
import get from 'lodash/get';
import { Toast } from 'antd-mobile';
import 'antd-mobile/dist/antd-mobile.css';
import styles from './app.m.scss';

import classnames from 'classnames/bind';
const cx = classnames.bind(styles);


function Index(props) {
  const { children, show, curr, showLoginModal, isNeedLogin, dispatch, userInfo, author } = props;
  const emailRef = useRef();
  const passwordRef = useRef();
  const [is_check, setCheck] = useState(false);
  // console.log(author,'author===')
  useEffect(() => {
    // (async () => {
    //   let userInfoRes = await dispatch({
    //     type: 'global/userInfoEff'
    //   })
    //   if (userInfoRes.code == 200 && !Object.keys(userInfo).length) {
    //     await dispatch({
    //       type: 'global/update',
    //       payload: {
    //         userInfo: userInfoRes.data,
    //         isNeedLogin:false
    //       }
    //     })
    //   }
    //   if (userInfoRes.code == 10400) {
    //     await dispatch({
    //       type: 'global/update',
    //       payload: {
    //         isNeedLogin: true
    //       }
    //     })
    //   }
    // })()
    getUserInfo();
  }, [])

  const getUserInfo = async () => {
    let userInfoRes = await dispatch({
      type: 'global/userInfoEff'
    })
    if (userInfoRes.code == 200 && !Object.keys(userInfo).length) {
      await dispatch({
        type: 'global/update',
        payload: {
          userInfo: userInfoRes.data,
          isNeedLogin:false
        }
      })
    }
    if(userInfoRes.code == 200){
      loginFunc(true);
    }
    if (userInfoRes.code == 10400) {
      await dispatch({
        type: 'global/update',
        payload: {
          isNeedLogin: true,
          showLoginModal:author?true:false
        }
      })

    }
  } 

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
      type: 'global/loginEff',
      payload: {
        useremail: emailCurr.value,
        userpass: current.value,
        usertype: 1
      }
    })
    // 如果用户不存在
    if (get(loginInfo, 'code') == 104041) {
      const registerInfo = await dispatch({
        type: 'global/registerEff',
        payload: {
          useremail: emailCurr.value,
          userpass: current.value,
          usertype: 1
        }
      })
      // 如果成功
      if (registerInfo.code == 200) {
        loginInfo = await dispatch({
          type: 'global/loginEff',
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

    loginUserInfo = get(loginInfo,'data');

    if (loginUserInfo) {
      store('iitoken', loginUserInfo);
      
      dispatch({
        type: 'global/update',
        payload: {
          // userInfo: loginUserInfo,
          isNeedLogin: false,
        }
      })
      await getUserInfo();
      Toast.info('Login success');
      setTimeout(()=>{
        window.location.reload();
        // dispatch({
        //   type: 'global/update',
        //   payload: {
        //     showLoginModal: false,
        //   }
        // })
      },500)
    }
  }

  return (
    <div className={cx('main_wrap')}>
      {children}
      <Slide show={showLoginModal} >
        <div className={cx('login_wrap')}>
          <TouchEl onTap={() => {
            if(!!author){
              return
            }
            dispatch({
              type: 'global/update',
              payload: {
                showLoginModal: false,
                // isNeedLogin: true
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
                if (isNeedLogin) {
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
                console.log(isNeedLogin,'isNeedLogin==')
                if (isNeedLogin) {
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
const mapStateToProps = ({ global: { bottomBar: { show, curr }, showLoginModal, userInfo, isNeedLogin } }) => {
  return {
    show,
    curr,
    showLoginModal,
    userInfo,
    isNeedLogin
  };
};
export default connect(mapStateToProps)(Index);
