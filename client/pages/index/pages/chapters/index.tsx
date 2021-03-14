import React, { useReducer, useEffect, useRef } from 'react';
import dva, { connect } from 'dva';
import get from 'lodash/get'

import Header from 'client/components/Header';
import TouchEl from 'client/components/TouchEl';
// import Hammer from 'hammerjs';
import styles from './index.m.scss';

import classnames from 'classnames/bind';
const cx = classnames.bind(styles);


function index(props) {
  const meRef = useRef();
  const testRef = useRef('test');
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
    console.log(history, '111')
    const { pathname } = history.location;

    dispatch({
      type: 'chapters/fetch',
      payload: {
        book_id: ~(pathname.replace('/chapter/', '') || 0)
      }
    })
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
          <div className={cx('chapter_')}>
            <div className={cx('tit__')}>Chapters</div>
            <div className={cx('pay_all_btn')}>Change Order</div>
          </div>
          {
            !!(get(bookInfo,'chapter_info')||[]).length &&
            get(bookInfo,'chapter_info').map((item, index) => {
              const { chapter_name, price } = item;
              return <div
                className={cx('list', index == 0 ? 'first_child' : '')}
                key={index}
                onClick={() => {
                  props.history.push('/detail/1');
                }}
              >
                <div className={cx('title_')}>{chapter_name}</div>
                {price==0 &&<div className={cx('tag')}>Free</div>}
               {price!=0 && <div className={cx('tag','block_')}>
                 <i/>
                 100 coins
              </div>}
                <div className={cx('go_icon')} />
              </div>
            })
          }
        </div>
      </div>
    </TouchEl>
  );
}

const App = connect(({ chapters: { bookInfo } }) => ({
  bookInfo,
}))(index)
export default App;