import React, { useReducer, useEffect } from 'react';
import dva, { connect } from 'dva';
import TouchEl from 'client/components/TouchEl';
import { request, getLocaleLan } from 'client/utils/index.js';
import Header from 'client/components/Header';
import ProdCard from 'client/pages/index/components/ProdCard/index';


import styles from './index.m.scss';

import classnames from 'classnames/bind';
const cx = classnames.bind(styles);

function Index(props) {
  const { books_info, history, dispatch, banners} = props;
  useEffect(() => {
    dispatch({
      type: 'myBooks/fetch'
    })
  }, [])
  return (
    <div className={cx('home_wrap')}>
      <Header />
      {!!(banners.length) && <div className={cx('banner')}
        onClick={() => {
          window.location.href = banners[0]['url_link'];
        }}
      >
        <img src={banners[0]['img_url']} />
      </div>}
      <div className={cx('lib_box')}>
        {
          !!books_info.length &&
          books_info.map((item, index) => {
            return <ProdCard
              className={cx('prd_')}
              key={index}
              onClick={(ii) => {
                const {id,book_id,type} = ii;
                if(type=='add'){
                  history.push(`/discover`);
                  return
                }
                history.push(`/chapter/${id||book_id}`);
              }}
              {...item}
            />
          })
        }
      </div>
    </div>
  );
}

const App = connect(({ myBooks: { books_info , banners} }) => ({
  books_info,
  banners
}))(Index)
export default App;