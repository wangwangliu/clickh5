import React from 'react';

import ReactDOM from 'react-dom';

import Notice from './notice.js';

class Toast {
  constructor(options) {
    const defaultOptions = {
      animateType: 'fade',
      duration: 2,
    };
    Object.assign(this, { ...defaultOptions }, { ...options });
  }
  _getWraper() {
    let { wraper } = this;
    if (!wraper) {
      wraper = document.createElement('div');
      document.body.appendChild(wraper);
      this.wraper = wraper;
    }
    return wraper;
  }
  hide() {
    const { wraper, duation } = this;
    if (!wraper) { return; }
    setTimeout(() => {
      this.wraper = null;
      // eslint-disable-next-line no-use-before-define
      toast = null;
      ReactDOM.unmountComponentAtNode(wraper);
      wraper.parentNode && wraper.parentNode.removeChild(wraper);
    }, duation);
  }
  show(info) {
    const { content, duration = 2, mask, onClose, type, isAutoClose = true, theme } = this;
    const params = { content: content || info.content, duration, mask, type: type || info.type, theme };
    const wraper = this._getWraper();
    ReactDOM.render(<Notice {...params} />, wraper);
    if (duration && isAutoClose) {
      setTimeout(() => {
        this.hide();
        if (typeof onClose === 'function') {
          onClose();
        }
      }, duration * 1000);
    }
  }
}

let toast;
function getToast(params) {
  toast = toast || new Toast(params);
  return toast;
}
function boat() {
  const arg = ['info', 'succ', 'fail', 'loading'];
  return arg.reduce((curr, prev) => {
    curr[prev] = function ({ content, duration, mask, onClose, isAutoClose, theme }) {
      const theToast = getToast({ content, duration, mask, onClose, type: prev, isAutoClose, theme });
      theToast.show({
        content,
        duration,
        mask,
        onClose,
        type: prev,
      });
    };
    return curr;
  }, {});
}

export default {
  ...boat(),
  hide() {
    const theToast = getToast();
    theToast.hide();
  },
};
