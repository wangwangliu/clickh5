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
  const { books_info, history, dispatch } = props;
  console.log('books_info', books_info)
  useEffect(() => {
    dispatch({
      type: 'myBooks/fetch'
    })
  }, [])
  return (
    <div className={cx('home_wrap')}>
      <Header />
      <div className={cx('banner')}></div>
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

const App = connect(({ myBooks: { books_info } }) => ({
  books_info
}))(Index)
export default App;