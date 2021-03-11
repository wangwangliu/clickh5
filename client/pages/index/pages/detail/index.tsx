import React, { useState, useEffect, useRef } from 'react';
import dva, { connect } from 'dva';
import { request, getLocaleLan } from 'client/utils/index.js';
import Header from 'client/components/Header';
import TouchEl from 'client/components/TouchEl';
// import Hammer from 'hammerjs';
import { Switch } from 'antd-mobile';
import 'antd-mobile/lib/switch/style'
// import 'antd-mobile/dist/antd-mobile.css';
import styles from './index.m.scss';

import classnames from 'classnames/bind';

const cx = classnames.bind(styles);


function index(props) {

  const [check,setCheck] = useState(false);

  useEffect(() => {
  }, [])

  return (
    <div className={cx('detail_wrap')}>
      <Header />
      <div className={cx('banner_img')}>
        {/* <div className={cx('avatar')}></div> */}
      </div>
      <div className={cx('matter_wrap')}>
        <div className={cx('matter_box', 'mb119')}>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Orci eu lobortis elementum nibh tellus molestie nunc. Tincidunt praesent semper feugiat nibh sed pulvinar. Facilisi morbi tempus iaculis urna id volutpat lacus. Et netus et malesuada fames ac turpis egestas integer.</p>

          <p>Rhoncus aenean vel elit scelerisque mauris pellentesque pulvinar pellentesque. Accumsan sit amet nulla facilisi morbi tempus iaculis urna id. Diam ut venenatis tellus in metus vulputate eu scelerisque. Ac tortor dignissim convallis aenean. Mollis nunc sed id semper. Elementum sagittis vitae et leo duis.</p>

          <p>Curabitur gravida arcu ac tortor dignissim convallis aenean. Nulla facilisi etiam dignissim diam quis enim lobortis scelerisque fermentum. Id consectetur purus ut faucibus. Sagittis orci a scelerisque purus semper eget duis. </p>

          <p>Laoreet non curabitur gravida arcu ac tortor dignissim. Faucibus et molestie ac feugiat sed lectus. Lectus nulla at volutpat diam ut venenatis tellus. Urna porttitor rhoncus dolor purus non enim praesent elementum.</p>

          <p>Id diam vel quam elementum pulvinar etiam. Nibh cras pulvinar mattis nunc sed blandit. Eleifend quam adipiscing vitae proin sagittis nisl rhoncus mattis. Ultrices in iaculis nunc sed.</p>

          <p>Arcu ac tortor dignissim convallis aenean et tortor. Nullam eget felis eget nunc. Sapien faucibus et molestie ac. Quisque egestas diam in arcu cursus. Quisque non tellus orci ac auctor augue mauris augue neque. Adipiscing commodo elit at imperdiet dui accumsan sit amet. Auctor neque vitae tempus quam pellentesque nec.</p>
        </div>

      </div>
      <div className={cx('control_wrap')}>
          <div className={cx('title')}>End of this chapter</div>
          <div className={cx('btn_box')}>
              <div className={cx('deep_btn_')}>Previous Chapter</div>
              <div className={cx('red_btn_')}>Next Chapter</div>
          </div>
        </div>
      {/* <div className={cx('lock_wrap_')}>
        <div className={cx('lock_box')} />
        <div className={cx('banner_btn')}>
          <div className={cx('tit_')}>GET MORE COINS</div>
          <div className={cx('sub_tit_')}>
            <span>Cost:12</span>
            <span>Balance:12</span>
          </div>
        </div>
        <div className={cx('lock_all_wap')}>
          <div className={cx('lock_all')}>Unlock entire book 599 coins</div>
        </div>
        <div className={cx('control_w')}>
            <i className={cx('lock')}></i>
            <span className={cx('desc')}>Auto-unlock locked chapters</span>
            <Switch
              platform="ios"
              color="#f47983"
              size='small'
              checked={check}
              onChange={(checked)=>{
                setCheck(checked);
                // console.log(checked,'checked')
              }}
          />
          </div>
      </div> */}
    </div>
  );
}

const App = connect(({ count }) => ({
  count,
}))(index)
export default App;