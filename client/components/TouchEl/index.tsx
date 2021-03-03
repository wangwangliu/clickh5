import React, { useEffect, useRef } from 'react';
import Hammer from 'hammerjs';

function noop() { }

interface Props {
  className?: string;
  style?: object;
  onTap?: Function;
  onPan?: Function;
  onPanEnd?:Function;
  onPanCancel?:Function;
  onSwipeLeft?: Function;
  onSwipeRight?: Function;
  children: React.ReactNode; 
}

function index(props:Props) {
  const { className, style = {}, onTap = noop,onPanCancel = noop, onPan = noop, onPanEnd= noop, onSwipeLeft = noop, onSwipeRight = noop } = props;
  const touchRef = useRef();

  function touch() {
    const { current } = touchRef;
    var hammertime = new Hammer(current);
    hammertime.on('tap', onTap);
    hammertime.on('pan', onPan);
    hammertime.on('panend', onPanEnd);
    hammertime.on('pancancel', onPanCancel);
    hammertime.on('swipeleft', onSwipeLeft);
    hammertime.on('swiperight', onSwipeRight);
  };

  useEffect(() => {
    touch();
  }, [])



  return (
    <div {...{ style, className }} ref={touchRef}>
      {props.children}
    </div>
  );
}
export default index;