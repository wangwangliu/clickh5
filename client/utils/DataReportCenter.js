/**
 * for 单独提取上报js
 */

import qs from 'qs';
import axios from 'axios';

const md5 = require('js-md5');
const uuidv4 = require('uuid/v4');


export default class DataReportCenter {
  randomstring(L) {
    let s = '';
    const randomchar = function () {
      const n = Math.floor(Math.random() * 62);
      if (n < 10) return n; // 1-10
      if (n < 36) return String.fromCharCode(n + 55); // A-Z
      return String.fromCharCode(n + 61); // a-z
    };
    while (s.length < L) s += randomchar();
    return s;
  }
  platform() {
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;
    // Windows Phone must come first because its UA also contains "Android"
    if (/windows phone/i.test(userAgent)) {
      return 'windows phone';
    }
    if (/android/i.test(userAgent)) {
      return 'android';
    }
    // iOS detection from: http://stackoverflow.com/a/9039885/177710
    if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
      return 'ios';
    }

    return 'other';
  }
  static send(data = {}) {
    const rand = this.prototype.randomstring(16);
    const now = Math.round(new Date().getTime() / 1000).toString();
    let navigator = {};
    try {
      navigator = window.navigator;
    } catch (error) {

    }
    let uuid = localStorage.getItem("uuid");
    if (!uuid) {
      uuid = uuidv4();
      localStorage.setItem("uuid", uuidv4());
    }
    if (!data.common) {
      data.common = {};
    }
    data = Object.assign({}, {
      common: {
        "@_device_uuid": uuid,
        "@_device_platform": this.prototype.platform(),
        bizType: "h5",
        language: navigator.language || '',
        _device_version: navigator.appVersion || '',
        resolution: `${window.screen.width}x${window.screen.height}`,
        referrer: document.referrer || '',
        currurl: window.location.href,
        ...data.common,
      },
      events: data.events,
    });
    // eslint-disable-next-line no-undef
    const signx = `cid=${DOMAIN_API.cid}&r=${rand}&t=${now}&v=${md5.hex(JSON.stringify(data) + DOMAIN_API.sign_key + rand + now).toLocaleLowerCase()}`;
    return axios({
      method: 'post',
      // eslint-disable-next-line no-undef
      baseURL: DOMAIN_API.reportApi,
      headers: {
        'X-Sign': signx,
        'Content-Type': 'application/json;charset=utf-8',
      },
      data,
      paramsSerializer(params) {
        return qs.stringify(params, { arrayFormat: 'brackets' });
      },
    });
  }
}

