import React, { useReducer, useEffect } from 'react';
import dva, { connect } from 'dva';
import { Carousel } from 'antd-mobile';
import { request, getLocaleLan } from 'client/utils/index.js';
import Menu from 'client/pages/index/components/Menu/index';
import Card from 'client/pages/index/components/Card/index';
import Header from 'client/components/Header';
import styles from './index.m.scss';

import classnames from 'classnames/bind';
const cx = classnames.bind(styles);


function index() {
  const SwpCard = (props) => (
    <div className={cx('swp_card')}>
      <div className={cx('img_b')}></div>
      <div className={cx('tit')}>ertete</div>
      <div className={cx('author')}>ertet</div>
      <div className={cx('cate')}>ertert</div>
    </div>
  )
  return (
    <div className={cx('discover_wrap')}>
      <Header />
      <div className={cx('banner')}></div>
      <Menu
        menus={['Fantasy Romance', 'Paranormal Romance', 'Lorem Ipsum', 'consectetur']}
        onClick={(content, ev) => {
          console.log(content)
        }}
      />
      <div className={cx('c_box')}>
        <Card className={cx('child_')} {...{ title: 'Lorem ipsum dolor', sub_title: 'by Christopher Wilson', disc: 'Lorem ipsum dolor sit amet consectetur adipiscing elit sed do.' }} />
      </div>
      <div className={cx('more_w')}>
        <div className={cx('more')}>Load More</div>
      </div>
      <>
        <div className={cx('red_header')}>
          Hot Stories
      </div>
        <Carousel
          autoplay={false}
          // dots={false}
          infinite
          beforeChange={(from, to) => console.log(`slide from ${from} to ${to}`)}
          afterChange={index => console.log('slide to', index)}
        >
          {[1, 2, 3, 4].map((item, index) => {
            return <div className={cx('swp_card_w')} key={index}>
              {
                [1, 2, 3, 4].map((it, idx) => {
                  return <SwpCard key={idx} />
                })
              }
            </div>
          })}
        </Carousel>
        <div className={cx('c_box')}>
          <Card className={cx('child_')} {...{ title: 'Lorem ipsum dolor', sub_title: 'by Christopher Wilson', disc: 'Lorem ipsum dolor sit amet consectetur adipiscing elit sed do.' }} />
        </div>
        <div className={cx('more_w')}>
          <div className={cx('more')}>Load More</div>
        </div>
      </>
      <>
        <div className={cx('black_header')}>
          Spicy Reads
      </div>
        <Carousel
          autoplay={false}
          // dots={false}
          infinite
          beforeChange={(from, to) => console.log(`slide from ${from} to ${to}`)}
          afterChange={index => console.log('slide to', index)}
        >
          {[1, 2, 3, 4].map((item, index) => {
            return <div className={cx('swp_card_w')} key={index}>
              {
                [1, 2, 3, 4].map((it, idx) => {
                  return <SwpCard key={idx} />
                })
              }
            </div>
          })}
        </Carousel>
        <div className={cx('c_box')}>
          <Card className={cx('child_')} {...{ title: 'Lorem ipsum dolor', sub_title: 'by Christopher Wilson', disc: 'Lorem ipsum dolor sit amet consectetur adipiscing elit sed do.' }} />
        </div>
        <div className={cx('more_w')}>
          <div className={cx('more')}>Load More</div>
        </div>
      </>
    </div>
  );
}

const App = connect(({ count }) => ({
  count,
}))(index)
export default App;