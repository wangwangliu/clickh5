import React, { useState, useEffect, useRef } from 'react';
import dva, { connect } from 'dva';
import Header from 'client/components/Header';
import TouchEl from 'client/components/TouchEl';
import get from 'lodash/get';
import isFunction from 'lodash/isFunction';
import { Modal, Toast } from 'antd-mobile';
// import Hammer from 'hammerjs';
import styles from './index.m.scss';
import classnames from 'classnames/bind';
const cx = classnames.bind(styles);


function index(props) {
  const [sel,setSel] = useState(1);
  const { userInfo, history, dispatch } = props;
  const meRef = useRef();
  const testRef = useRef('test');
  let delta = 0;
  const list = [
    { id: 1, icon: 'code', title: 'Redemption Code' },
    { id: 2, icon: 'bill', title: 'Purchased List' },
    { id: 3, icon: 'friends', title: 'Invite friends' },
    { id: 4, icon: 'help', title: 'Help center' },
    { id: 5, icon: 'about', title: 'About us' },
    { id: 6, icon: 'logout', title: 'Logout' },
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
              <div className={cx('con')}>{get(userInfo, 'user_coins') || 0}<span>coins</span></div>
              <div className={cx('btn')}
                onClick={()=>{
                  history.push('/history/2')
                }}
              >Transaction History</div>
            </div>
          </div>
          {
            list.map((item, index) => {
              const { title, icon, id } = item;
              return <div className={cx('list', sel==id?'active':'',index == 0 ? 'first_child' : '')} key={index}
                onClick={() => {
                  setSel(id);
                }}
              >
                <div className={cx('diamand_num')}>{60000}</div>
                <div className={cx('title_')}>{`+Bonus 60`}</div>
                <div className={cx('price')}>$29.6</div>
              </div>
            })
          }
        </div>
        <div className={cx('btn_wrap')}>
          <div className={cx('title')}>Choose Your Pay Method</div>
          <div className={cx('box_btn')}>
            <div className={cx('btn___')}
              onClick={()=>{
                Toast.info(`Temporarily not opened`)
              }}
            ><div className={cx('paypay')}/></div>
            <div className={cx('btn___','card_')}
               onClick={()=>{
                Toast.info(`Temporarily not opened`)
              }}
            >Credit Card</div>
          </div>
        </div>
      </div>
    </TouchEl>
  );
}

const App = connect(({ global: { userInfo } }) => ({
  userInfo,
}))(index)
export default App;