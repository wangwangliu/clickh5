import React, { useEffect, useImperativeHandle, forwardRef, useRef } from 'react';
import classnames from 'client/pages/index/pages/me/node_modules/classnames/bind';
import styles from './index.m.less';

const cx = classnames.bind(styles);

function Index(props, ref) {
  const yRef = useRef('yRef');
  const xRef = useRef('xRef');
  const originDimension = props.origin.current.getBoundingClientRect();
  const targetDimension = props.target.current.getBoundingClientRect();
  let timer = null;
  const { style } = props;
  const fall = (wallet_diamond) => {
    yRef.current.style.transform = `translateY(${targetDimension.y - originDimension.y}px)`;
    xRef.current.style.transform = `translateX(${targetDimension.x - originDimension.x}px)`;
    xRef.current.style.opacity = `0`;
    timer = setTimeout(() => {
      props.complete(props.id,wallet_diamond)
    }, 400)
  };


  useImperativeHandle(ref, () => ({
    init: (wallet_diamond) => {
      const { current } = yRef;
      current.style.top = `${originDimension.y}px`;
      current.style.left = `${originDimension.x}px`;
      if (originDimension.y > targetDimension.y) {
        current.style.transition = "all .4s cubic-bezier(0,.3,.55,1.62)"
      }
      setTimeout(() => {
        fall(wallet_diamond)
      }, 0)
    }
  }));

  useEffect(() => {
    return () => {
      clearTimeout(timer);
    }
  }, [])


  return (
    <div className={cx("parabola-y")} ref={yRef} style={style}>
      <div className={cx("parabola-x")} ref={xRef} style={style}>
        {props.children}
      </div>
    </div>
  );
}

export default forwardRef(Index)