import React, { useState, useEffect, useRef } from 'react';
import dva, { connect } from 'dva';
import { dot } from 'client/utils/index.js';
import Header from 'client/components/Header';
import TouchEl from 'client/components/TouchEl';
// import Hammer from 'hammerjs';
import styles from './index.m.scss';

import classnames from 'classnames/bind';
const cx = classnames.bind(styles);


function index(props) {
  const [currTab, setCurrTab] = useState(1);
  const { ordersInfoLog, purchasesInfoLog, dispatch, history} = props;
  const list = [
    { icon: 'code', title: 'Redemption Code', "created_at": "2021-03-12 11:26:00" },
    { icon: 'bill', title: 'Purchased List', "created_at": "2021-03-12 11:26:00" },
    { icon: 'friends', title: 'Invite friends', "created_at": "2021-03-12 11:26:00" },
    { icon: 'help', title: 'Help center', "created_at": "2021-03-12 11:26:00" },
    { icon: 'about', title: 'About us', "created_at": "2021-03-12 11:26:00" },
    { icon: 'logout', title: 'Logout', "created_at": "2021-03-12 11:26:00" },
  ];

  const fetch=(type)=>{
    changeTab(type)
    dispatch({
      type: `history/${type==1?'fetchOrdersInfoLog':'fetchPurchasesInfoLog'}`,
    })
  }

  useEffect(() => {
    const { pathname } = history.location;
    const type = (~~(pathname.replace('/history/', '')) || 1);
    console.log(type,'type')
    fetch(type);
  }, [])

  function convert(time, format) {
    if (!time) {
      return ''
    }
    const ti = time.split(' ')
    if (format == 's') {
      return ti[1];
    }
    if (format == 'd') {
      return ti[0].split('-').reverse().join('/');
    }
  }

  const changeTab = (tab) => {
    setCurrTab(tab)
  }
  return (
    <TouchEl>
      <div className={cx('me_wrap')}>
        <Header />
        <div className={cx('banner_img')}>
        </div>

        <div className={cx('_tab_w')}>
          <div className={cx('tab', currTab == 1 ? 'color_w' : '')}
            onClick={() => {
              // changeTab(1)
              fetch(1)
            }}
          >Consume</div>
          <div className={cx('tab', currTab == 1 ? '' : 'color_w')}
            onClick={() => {
              // changeTab(2)
              fetch(2)
            }}

          >Deposit</div>
          <div className={cx('float_bg', currTab == 1 ? 'left_' : 'right_')} />
        </div>

        <div className={cx('me_box')} style={{marginBottom:'2rem'}}>
          {(currTab == 1 && !!ordersInfoLog.length) &&
            ordersInfoLog.map((item, index) => {
              const { order_title, created_at, coins_amount } = item;
              return <div className={cx('list', index == 0 ? 'first_child' : '')} key={index}>
                <div className={cx('title_')}>
                  <div className={cx('tit_', currTab != 1 ? '__' : '')}>
                    {dot(order_title,40)}
                  </div>
                  <div className={cx('sub_')}>
                    {convert(created_at, 'd')}
                    <span style={{ marginLeft: '0.5rem', marginRight: '0.5rem' }}>|</span>
                    {convert(created_at, 's')}
                    {currTab != 1 && <span className={cx('expire')}>Expire on {convert(created_at, 'd')}</span>}
                  </div>
                </div>
                <div className={cx('_icon')} style={{width:'5rem'}}>
                  {
                    currTab == 1 &&
                    <>
                      {coins_amount}<i className={cx('_after_dollar')}></i>
                    </>
                  }
                </div>
              </div>
            })
          }
          {(currTab != 1 && !!purchasesInfoLog.length) &&
            purchasesInfoLog.map((item, index) => {
              const { purchase_type, product_count, purchase_amount, created_at, product_expire_time } = item;
              return <div className={cx('list', index == 0 ? 'first_child' : '')} key={index}>
                <div className={cx('title_')}>
                  <div className={cx('tit_', currTab != 1 ? '__' : '')}>
                    {product_count}
                  </div>
                  <div className={cx('sub_')}>
                    {convert(created_at, 'd')}
                    <span style={{ marginLeft: '0.5rem', marginRight: '0.5rem' }}>|</span>
                    {convert(created_at, 's')}
                    {currTab != 1 && <span className={cx('expire')}>Expire on {convert(product_expire_time, 'd')}</span>}
                  </div>
                </div>
                <div className={cx('_icon')}>
                
                  {
                    currTab != 1 &&
                    <>
                      {(purchase_type==2||purchase_type==3)?'Bouns':`$ ${purchase_amount}`}
                  </>
                  }

                </div>
              </div>
            })
          }
        </div>
      </div>
    </TouchEl>
  );
}

const App = connect(({ history: { ordersInfoLog, purchasesInfoLog } }) => ({
  ordersInfoLog, purchasesInfoLog
}))(index)

export default App;