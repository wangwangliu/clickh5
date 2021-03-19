import React, { useState, useEffect } from 'react';
import dva, { connect } from 'dva';
import { Carousel } from 'antd-mobile';
import { request, getLocaleLan } from 'client/utils/index.js';
import Menu from 'client/pages/index/components/Menu/index';
import Card from 'client/pages/index/components/Card/index';
import Header from 'client/components/Header';
import { routerRedux } from 'dva/router';
import { dot } from 'client/utils/index.js';
import styles from './index.m.scss';
import get from 'lodash/get';
import cloneDeep from 'lodash/cloneDeep'

import classnames from 'classnames/bind';
const cx = classnames.bind(styles);

function noop() { }

const SwpCard = (props) => (
  <div className={cx('swp_card')} onClick={(props.onClick || noop).bind(this, props)}>
    <div className={cx('img_b')}>
      <img src={props.cover_img} />
    </div>
    <div className={cx('tit')}>{dot(props.title,10)}</div>
    <div className={cx('author')}>{dot(props.sub_title,10)}</div>
    {/* <div className={cx('cate')}>ertert</div> */}
  </div>
)

function index(props) {
  const {
    banners,
    toplist,
    hotstories,
    spicyreads,
    newtrending,
    libraryrec,
    history,
    dispatch
  } = props;
  const [topCurr, setTopCurr] = useState({ key: '', showAll: false });
  console.log(hotstories, 'hotstories')
  const [modalList, setModalList] = useState([{
    title: 'Hot Stories',
    title_bg: 'red',
    loading_num: 3,
    list: [],
  }, {
    title: 'Spicy Reads',
    title_bg: 'black',
    loading_num: 3,
    list: [],
  }, {
    title: 'New Trending',
    title_bg: 'red',
    loading_num: 3,
    list: [],
  }])
  useEffect(() => {
    dispatch({
      type: "discover/fetch",
    })
  }, [])

  useEffect(() => {
    setTopCurr({ key: Object.keys(toplist)[0], showAll: false })
    setModalList([{
      title: 'Hot Stories',
      title_bg: 'red',
      loading_num: 6,
      list: hotstories
    }, {
      title: 'Spicy Reads',
      title_bg: 'black',
      loading_num: 6,
      list: spicyreads
    }, {
      title: 'New Trending',
      title_bg: 'red',
      loading_num: 6,
      list: newtrending
    }])
  }, [toplist])

  return (
    <div className={cx('discover_wrap')}>
      <Header />
      {!!banners.length && <div className={cx('banner')}
        onClick={() => {
          window.location.href = banners[0]['url_link'];
        }}
      >
        <img src={banners[0]['img_url']} />
      </div>}
      {!!Object.keys(toplist).length && <Menu
        menus={Object.keys(toplist)}
        onClick={(content) => {
          setTopCurr({ showAll: false, key: content });
        }}
      />}
      <div className={cx('c_box')} style={{ marginBottom: !topCurr.showAll ? '0' : '1rem' }}>
        {!!(Object.keys(toplist).length) &&
          !!((toplist[topCurr.key] || []).length) &&
          (toplist[topCurr.key]).map((item, index) => {
            // console.log(item, 'item')
            const { img_url: cover_img, book_id, author_pen_name: sub_title, description: disc, title } = item;

            if (!topCurr.showAll && index > 2) {
              return null
            }
            return <Card
              onClick={(book_id, ev) => {
                history.push(`/chapter/${book_id}`);
              }}
              className={cx('child_')}
              key={`${topCurr.key}${index}`}
              {...{ book_id, cover_img, title, sub_title, disc }} />
          })
        }
      </div>
      {!topCurr.showAll && <div className={cx('more_w')}
        onClick={() => {
          setTopCurr({ ...topCurr, showAll: true });
        }}
      >
        <div className={cx('more')}>Load More</div>
      </div>}
      {
        !!modalList.length &&
        modalList.map((item, index) => {
          // const { img_url: cover_img, book_id, author_pen_name: sub_title, title } = item.list;
          return <>
            <div className={cx(`${item.title_bg}_header`)} key={index}>
              {item.title}
            </div>
            {
              !!item.list.length &&
              <>
                <Carousel
                  autoplay={false}
                  dots={false}
                  infinite
                  beforeChange={(from, to) => console.log(`slide from ${from} to ${to}`)}
                  afterChange={index => console.log('slide to', index)}
                >
                  <div className={cx('swp_card_w')} key={index}>
                    {
                      item.list.map((it, idx) => {
                        const { img_url: cover_img, book_id, author_pen_name: sub_title, title } = it;
                        if (idx > 3) {
                          return null
                        }
                        return <SwpCard onClick={(item, ev) => {
                          console.log(item, ev, '1223')
                          props.history.push(`/chapter/${book_id}`);
                        }} key={idx} {...{ cover_img, book_id, sub_title, title }} />
                      })
                    }
                  </div>
                </Carousel>
              </>
            }
            {
              !!item.list.length &&
              <div className={cx('c_box')} style={{marginBottom:(item.loading_num>=item.list.length)?'1rem':'0'}}>
                {item.list.map((it, idx) => {
                  const { img_url: cover_img, book_id, author_pen_name: sub_title, title, description: disc } = it;
                  if (idx > 3 && idx <= item.loading_num) {
                    return <Card
                      onClick={(book_id, ev) => {
                        history.push(`/chapter/${book_id}`);
                      }}
                      className={cx('child_')}
                      key={idx}
                      {...{ book_id, cover_img, title, sub_title, disc }} />
                  }
                })
                }
              </div>
            }
             {(item.loading_num<item.list.length)&&<div className={cx('more_w')}
              onClick={()=>{
                const deep = cloneDeep(modalList);
                deep[index].loading_num = deep[index].loading_num+3;
                setModalList(deep);
                // setModalList([...modalList,...modalList[index]]])
              }}
             >
              <div className={cx('more')}>Load More</div>
            </div>}

          </>
        })
        
      }
    </div>
  );
}

const App = connect(({ discover: { banners,
  toplist,
  hotstories,
  spicyreads,
  newtrending,
  libraryrec } }) => ({
    banners,
    toplist,
    hotstories,
    spicyreads,
    newtrending,
    libraryrec
  }))(index)
export default App;