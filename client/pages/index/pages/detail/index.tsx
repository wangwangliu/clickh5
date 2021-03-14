import React, { useState, useEffect, useRef } from 'react';
import dva, { connect } from 'dva';
import get from 'lodash/get'
import Header from 'client/components/Header';
import { Switch, Toast } from 'antd-mobile';
import styles from './index.m.scss';

import classnames from 'classnames/bind';

const cx = classnames.bind(styles);


function index(props) {
  const [check, setCheck] = useState(false);
  const { detailInfo: { content_text = '', need_buy, price }, bookInfo , userInfo: { user_coins }, dispatch
} = props;

useEffect(() => {
  fetch()
}, [])

const fetch = () => {
  dispatch({
    type:'chapterInfo/fetch',
  })
}

return (
  <div className={cx('detail_wrap')}>
    <Header />
    <div className={cx('banner_img')}>
      {/* <div className={cx('avatar')}></div> */}
    </div>
    <div className={cx('matter_wrap')}>
      <div className={cx('matter_box', 'mb119')} dangerouslySetInnerHTML={{ __html: content_text }} />
    </div>
    {!need_buy && <div className={cx('control_wrap')}>
      <div className={cx('title')}>End of this chapter</div>
      <div className={cx('btn_box')}>
        <div className={cx('deep_btn_')}>Previous Chapter</div>
        <div className={cx('red_btn_')}>Next Chapter</div>
      </div>
    </div>}
    { !!need_buy &&
      <div className={cx('lock_wrap_')}>
        <div className={cx('lock_box')} />
        <div className={cx('banner_btn')}
          onClick={() => {
            if(price > ~~user_coins){
              Toast.info('跳转充值')
              return
            }
            // 解锁当节
            dispatch({
              type:'chapterInfo/chapterOrderEff',
              payload:{}
            })
          }}
        >
          <div className={cx('tit_')}>{(price > ~~user_coins) ? 'GET MORE COINS' : 'Unlock THE CHAPTER'}</div>
          <div className={cx('sub_tit_')}>
            <span>Cost:{price}</span>
            <span>Balance:{user_coins||0}</span>
          </div>
        </div>
        <div className={cx('lock_all_wap')}
          onClick={()=>{
            // 解锁整本书
            dispatch({
              type:'chapterInfo/bookOrderEff',
            })
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
                  type:'chapterInfo/setPayAutoEff',
                  payload:{auto_order:checked?1:0}
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
