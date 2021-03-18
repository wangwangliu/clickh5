import React, { useReducer, useEffect, useRef } from 'react';
import dva, { connect } from 'dva';
import get from 'lodash/get'

import Header from 'client/components/Header';
import TouchEl from 'client/components/TouchEl';
// import Hammer from 'hammerjs';
import styles from './index.m.scss';

import classnames from 'classnames/bind';
import classNames from 'client/pages/index/pages/me/node_modules/classnames/bind';
const cx = classnames.bind(styles);


function index(props) {
  const meRef = useRef();
  const testRef = useRef('test');
  const inputRef = useRef();
  const { dispatch, history, bookInfo } = props;
  let delta = 0;
  // const list = [
  //   { icon: 'code', title: 'Redemption Code' },
  //   { icon: 'bill', title: 'Purchased List' },
  //   { icon: 'friends', title: 'Invite friends' },
  //   { icon: 'help', title: 'Help center' },
  //   { icon: 'about', title: 'About us' },
  //   { icon: 'logout', title: 'Logout' },
  // ];
  useEffect(() => {
    // console.log(history, '111')
    // const { pathname } = history.location;

    // dispatch({
    //   type: 'chapters/fetch',
    //   payload: {
    //     book_id: ~~(pathname.replace('/chapter/', '') || 0)
    //   }
    // })
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
        </div>
        <div className={cx('me_box')}>
          <input className={cx('input_key')} ref={inputRef} placeholder={'Redemption Code'} />
          <div className={cx('btn__')}

            onClick={() => {
              const { current: { value: code } } = inputRef;
              if (!code) {
                return
              }
              dispatch({
                type: "keyCode/cdkey",
                code
              }).then((res)=>{
                console.log(res,',====)')
              })
            }}

          >Submit</div>
        </div>
      </div>
    </TouchEl>
  );
}

const App = connect(({ chapters: { bookInfo } }) => ({
  bookInfo,
}))(index)
export default App;