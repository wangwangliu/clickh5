import React, { useContext, useEffect, useState } from 'react';

import './index.less';

interface propsType {
  show?: boolean, // 是否显示
  children?: any, // 自定义显示内容
  onAnimationEnd?: Function, // 动画结束的事件
  direction?: string, // 左右 默认bottom, top|bottom
  // type?: string,
  // size?: string,
  onClose?: Function // 消失事件
}

export default (props: propsType) => {
  const { show, children, onClose, noAnim } = props;
  const [transitionClass, setTransitionClass] = useState(''); // 'slideShow':'slideHide'
  const [hasShow, setHasShow] = useState(false);
  const handleClose = () => {
    onClose && onClose();
  }

  useEffect(() => {
    if (show) {
      setTransitionClass('ad--bounceIn');
      setHasShow(true);
    } else {
      if (hasShow) {
        setTransitionClass('ad--bounceOut');
      }
    }
  }, [show])

  return (
    <div>
      <div onClick={handleClose} className={`ad--transition-mask ad--mask-base ${show ? 'ad--fadeShow' : ''}`}></div>
      <div className={`ad--transition-bounce ${transitionClass}`}>
        <div style={{ pointerEvents: 'auto' }}>
          {children}
        </div>
      </div>
    </div>
  )
}