import React, { useState, useEffect, useRef } from 'react';
import dva, { connect } from 'dva';
import get from 'lodash/get'
import Header from 'client/components/Header';
import { Switch, Toast } from 'antd-mobile';
import { verIsShowLoginModal } from 'client/utils';
import styles from './index.m.scss';

import classnames from 'classnames/bind';

const cx = classnames.bind(styles);


function index(props) {
  const [check, setCheck] = useState(false);
  const { detailInfo: { content_text = '', title, need_buy, price, next_chapter_id, pre_chapter_id }, bookInfo, userInfo: { user_coins }, dispatch, history
  } = props;

  const fetch = () => {
    const { pathname } = history.location;
    dispatch({
      type: 'chapterInfo/fetch',
      payload: {
        chapter_id: ~~(pathname.replace('/detail/', '') || 0)
      }
    })
      .then((res) => {
        const { data: { book_id } } = res;
        dispatch({
          type: 'chapters/fetch',
          payload: {
            book_id
          }
        })
      })
  }

  useEffect(() => {
    fetch()
  }, [history.location.pathname])


  return (
    <div className={cx('detail_wrap')}>
      <Header />
      <div className={cx('banner_img')} style={!get(bookInfo, 'book_cover') ? {} : {
        backgroundImage: `url(book_cover)`,
        backgroundSize: 'cover'
      }}>

        <div className={cx('title_')}>{title}</div>
      </div>
      <div className={cx('matter_wrap')}>
        <div className={cx('matter_box', 'mb119')} dangerouslySetInnerHTML={{ __html: content_text }} />
      </div>
      {!need_buy && <div className={cx('control_wrap')}>
        <div className={cx('title')}>End of this chapter</div>
        <div className={cx('btn_box')}>
          <div className={cx('deep_btn_')}
            onClick={() => {
              props.history.push(`/detail/${get(pre_chapter_id, 'id')}`);
            }}
          >Previous Chapter</div>
          {(get(pre_chapter_id, 'id') != get(next_chapter_id, 'id')) && <div className={cx('red_btn_')}
            onClick={() => {
              props.history.push(`/detail/${get(next_chapter_id, 'id')}`);
            }}
          >Next Chapter</div>}
        </div>
      </div>}
      { !!need_buy &&
        <div className={cx('lock_wrap_')}>
          <div className={cx('lock_box')} />
          <div className={cx('banner_btn')}
            onClick={() => {
              const { pathname } = history.location;
              verIsShowLoginModal(props,()=>{
                if (price > ~~user_coins) {
                  // Toast.info('跳转充值')
                  props.history.push(`/pay?redirect=${pathname}`);
                  return
                }
                // 解锁当节
                dispatch({
                  type: 'chapterInfo/chapterOrderEff',
                  payload: {}
                })
              })
            }}
          >
            <div className={cx('tit_')}>{(price > ~~user_coins) ? 'GET MORE COINS' : 'Unlock THE CHAPTER'}</div>
            <div className={cx('sub_tit_')}>
              <span>Cost:{price}</span>
              <span>Balance:{user_coins || 0}</span>
            </div>
          </div>
          <div className={cx('lock_all_wap')}
            onClick={() => {
              verIsShowLoginModal(props,()=>{
                dispatch({
                  type: 'chapterInfo/bookOrderEff',
                })
              })
              // 解锁整本书
              
            }}
          >
            <div className={cx('lock_all')}>Unlock entire book {get(bookInfo, 'novel_info.price') || 0} coins</div>
          </div>
          <div className={cx('control_w')}>
            <i className={cx('lock')}></i>
            <span className={cx('desc')}>Auto-unlock locked chapters</span>
            <Switch
              platform="ios"
              color="#f47983"
              size='small'
              checked={check}
              onChange={(checked) => {
                dispatch({
                  type: 'chapterInfo/setPayAutoEff',
                  payload: { auto_order: checked ? 1 : 0 }
                })
                setCheck(checked);
              }}
            />
          </div>
        </div>}
    </div>
  );
}

const App = connect(({ chapterInfo: { detailInfo }, chapters: { bookInfo }, global: { userInfo } }) => ({
  detailInfo,
  userInfo,
  bookInfo
}))(index)
export default App;
