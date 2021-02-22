import React, { useState, useEffect } from 'react';
import { Modal } from 'antd-mobile';
import classnames from 'client/pages/index/pages/me/node_modules/classnames/bind';
import styles from './style.m.less';

const cx = classnames.bind(styles);

function ModalWindow(props) {
  const { visible = false, title,  confirm, hide,loading } = props;
  // const [vs,setVs] = useState(visible)
  // console.info('___', { initShowModal, showModal });

  const closeHandle = ()=>{
    hide(1)
    // setVs(false)
  }

  return (
    <Modal
      visible={visible}
      transparent
      onClose={hide}
      className={cx('modal')}
      maskClosable={true}
    >
      <>
        <div className={cx('close__i')} onClick={closeHandle}/>
        <div className={cx('container')}>
          
          <div className={cx('title')}>{title}</div>
          <div className={cx('content')}>{props.children}</div>
          <div className={cx('confirm',loading?'opacity':'')} onClick={() => {
            hide();
          }}>{confirm}</div>
        </div>
      </>
    </Modal>
  )
}
export default ModalWindow;