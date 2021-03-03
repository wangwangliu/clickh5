import React, { useContext, useEffect, useState } from 'react';

import './index.less';

interface propsType{
  show?: boolean, // 是否显示
  children?: any, // 自定义显示内容
  onAnimationEnd?:Function, // 动画结束的事件
  direction?: string, // 左右 默认bottom, top|bottom
  // type?: string,
  // size?: string,
  onClose?: Function // 消失事件
}

export default (props: propsType) => {
  const {show, children, onClose, direction='' } = props;
  const [slideClass, setSlideClass] = useState(''); // 'slideShow':'slideHide'
  const [hasShow, setHasShow] = useState(false);
  const handleClose = ()=>{
    onClose && onClose();
  }

  useEffect(()=>{
    if(show){
      setSlideClass('ad--slideShow');
      setHasShow(true);
    } else {
      if(hasShow){
        setSlideClass('ad--slideHide');
      }
    }
  },[show])

  return (
    <div>
      <div onClick={()=>handleClose()} className={`ad--transition-mask ad--mask-base ${show?'ad--fadeShow':''}`}></div>
      <div  className={`ad--transition-container ${direction} ${slideClass}`}>
        {children}
      </div>
    </div>
  )
}