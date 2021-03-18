
import qs from 'qs';

import store from 'store2';

import memoizeOne from 'memoize-one';

import isNil from 'lodash/isNil';

import req from "./request.js";
import ibridge from './Ibridge';
import report from './Report';

import { loginSucc } from 'client/utils/globalVar'

// eslint-disable-next-line import/prefer-default-export
export const request = req;

export const Report = report;

export const getToken = memoizeOne(() => {
  // eslint-disable-next-line space-in-parens
  let token = window.location.hash.substring(1, );
  if (token) {
    store('itoken', token);
  } else {
    token = store('itoken');
  }
  return token;
});

export const getUrlQuery = () => {
  const { search } = window.location;
  return qs.parse(search.substring(1, ));
};

export function delNillObject(obj) {
  const o = {};
  for (const i in obj) {
    if (!isNil(obj[i]) && obj[i] !== '') {
      o[i] = obj[i];
    }
  }
  return o;
}

export function delHtmlTag(str) {
  return str.replace(/<[^>]+>/g, ""); // 正则去掉所有的html标记
}
export function base64RmHeader(base64) {
  return base64.replace(/^data:image\/\w+;base64,/, "");
}
export function base64AddHeader(str) {
  return `data:image/png;base64,${str}`;
}
export function isEmptyObject(obj) {
  // eslint-disable-next-line guard-for-in
  for (const key in obj) {
    return false;
  }
  return true;
}
// platform Android 1 ios 2 pc 3
export function platform() {
  const userAgent = navigator.userAgent || navigator.vendor || window.opera;
  // Windows Phone must come first because its UA also contains "Android"
  if (/windows phone/i.test(userAgent)) {
    return 4;
  }
  if (/android/i.test(userAgent)) {
    return 1;
  }
  // iOS detection from: http://stackoverflow.com/a/9039885/177710
  if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
    return 2;
  }

  return 3;
}
// 去空格限制字符
export function limitStr(str, len) {
  return !(str.replace(/\s*/g, "").length > len);
}
// 邮箱校验

export function isEmail(email) {
  // eslint-disable-next-line no-useless-escape
  const reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (reg.test(email)) {
    return true;
  }
  return false;
}

/**
 * 0:英文、1:印尼、10:泰国、11:阿拉伯
 */
export function getLocaleLan() {
  const lanEnum = {
    0: "en",
    1: "indonesia",
    10: "thailand",
    11: "arab",
  };
  return new Promise((reslove) => {
    ibridge.getAppInfo()
      .then((info) => {
        reslove(lanEnum[info.lan || 0]);
      });
  });
}


/**
 * 获取样式
 * @param {*} el 
 * @param {*} property 
 */
export function getStyle(el, property) {
  if (el.style[property]) {
    return el.style[property];
  } else if (el.currentStyle) {
    return el.currentStyle[property];
  } else if (document.defaultView && document.defaultView.getComputedStyle) {
    const style = document.defaultView.getComputedStyle(el, null);
    return style.getPropertyValue(property);
  }
  return null;
}

/**
 * element.getBoundingClientRect()
 */
export function getClientRect(el) {
  if (!el) {
    return {};
  }
  const { x, y, width, height } = el.getBoundingClientRect();

  // eslint-disable-next-line radix
  return { x, y, width, height };
}


export function dot(str, len) {
  if (!str || !len) { return ''; }
  var build = "";
  for (var i = 0; i < str.length && len > 0; i++) {
      build += str.substr(i, 1);
      len -= str.charCodeAt(i) > 127 ? 2 : 1;
  }
  if (build.length < str.length)
      build += "...";
  return build;
}



export function verIsShowLoginModal(prototype, func){
  const {dispatch} = prototype;

  console.log(loginSucc,'loginSucc')
  if(!!loginSucc){
    func.call(prototype)
    return
  }
  dispatch({
    type:'global/update',
    payload:{
      showLoginModal:true
    }
  })
}