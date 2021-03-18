import React, { useReducer, useEffect, useRef } from 'react';
import dva, { connect } from 'dva';
import { request, getLocaleLan } from 'client/utils/index.js';
import Header from 'client/components/Header';
import TouchEl from 'client/components/TouchEl';
import get from 'lodash/get'
import { Modal, Toast } from 'antd-mobile';
// import Hammer from 'hammerjs';
import styles from './index.m.scss';
import store from 'store2';
import classnames from 'classnames/bind';
import { userInfo } from '../../models/server';
const cx = classnames.bind(styles);


function index(props) {

  const {userInfo, history, dispatch } = props;
  const meRef = useRef();
  const testRef = useRef('test');
  let delta = 0;
  const list = [
    { icon: 'code', title: 'Redemption Code' },
    { icon: 'bill', title: 'Purchased List' },
    { icon: 'friends', title: 'Invite friends' },
    { icon: 'help', title: 'Help center' },
    { icon: 'about', title: 'About us' },
    { icon: 'logout', title: 'Logout',fun:()=>{
      Modal.alert('Message', 'Are you logout???', [
        { text: 'Cancel', onPress: () => {console.log('cancel')}, style: 'default' },
        { text: 'OK', onPress: () => {
          store.remove('iitoken');
          dispatch({
            type:'global/update',
            payload:{
              isLogin:true
            }
          })
          Toast.info("Logout success")
          props.history.push('/discover');
        } },
      ]);
    } },
  ];
  useEffect(() => {
  }, [])

  const panHandle = (ev) => {
    const { current } = meRef;
    const height = document.body.clientHeight;
    let i = 0;
    if (current.scrollTop == 0) {
      if (!delta) {
        delta = parseInt(ev.deltaY)
      } else {
        i = Math.abs(parseInt(ev.deltaY) - delta) / height
      }
      console.log(ev)
      testRef.current.style.cssText = `transform: scaleY(${1 + i})`
    }

  }

  return (
    <TouchEl
      onPan={panHandle.bind(this)}
      onPanEnd={() => {
        console.log('end')
        delta = 0;
        testRef.current.style.cssText = `transform: scaleY(1)`
      }}
      onPanCancel={() => {
        console.log('cancel')
        delta = 0;
        testRef.current.style.cssText = `transform: scaleY(1)`
      }}
    >
      <div ref={meRef} className={cx('me_wrap')}>
        <Header />
        <div ref={testRef} className={cx('banner_img')}>
          <div className={cx('avatar')}></div>
        </div>
        <div className={cx('me_box')}>
          <div className={cx('diamond_w')}>
            <div className={cx('title')}>My Wallet</div>
            <div className={cx('d_w')}>
              <div className={cx('d_coin')} />
              <div className={cx('con')}>{get(userInfo,'user_coins')||0}<span>coins</span></div>
              <div className={cx('btn')}>GET MORE</div>
            </div>
          </div>
          {
          list.map((item, index) => {
            const { title, icon, fun } = item;
            return <div className={cx('list',index==0?'first_child':'')} key={index}
              onClick={()=>{fun&&fun()}}
            >
              <div className={cx('_icon', icon)} />
              <div className={cx('title_')}>{title}</div>
              <div className={cx('go_icon')} />
            </div>
          })
        }
        </div>
      </div>
    </TouchEl>
  );
}

const App = connect(({ global:{userInfo} }) => ({
  userInfo,
}))(index)
export default App;