/**
 * 104041 用户不存在
    10400  token失效
    200成功
 */


/* eslint-disable max-len */
/* eslint-disable eqeqeq */
/* eslint-disable no-use-before-define */
import qs from 'qs';

import axios from 'axios';

import Toast from 'client/components/Toast';

import get from 'lodash/get'

import api from './api';

import store from 'store2';

import { getToken, delNillObject } from './index';

import ibridge from './Ibridge';

class Request {
  // eslint-disable-next-line no-shadow
  constructor() {
    const map = new WeakMap();
    const baseConfig = {
      method: 'get',
      // eslint-disable-next-line no-undef
      baseURL: DOMAIN_API.domain,
      timeout: 10000,
      paramsSerializer(params) {
        return qs.stringify(params, { indices: false });
      },
      transformRequest: [function (data, headers) {
        if (headers['Content-Type'] && (headers['Content-Type'].toLowerCase()).indexOf('multipart/form-data') > -1) {
          const formData = new FormData();
          // eslint-disable-next-line guard-for-in
          for (const o in data) {
            formData.append(o, data[o]);
          }
          return formData;
        }
        if (headers['Content-Type'] && (headers['Content-Type'].toLowerCase()).indexOf('application/json') > -1) {
          return JSON.stringify(data);
        }
        return qs.stringify(data, { indices: false });
      }],
    };
    this.getBaseConfig = () => map.get(this).baseConfig;
    this.setBaseConfig = () => map.set(this, { baseConfig });
    this.setBaseConfig();
    this.api = api;
  }

  async send({ path, type = 'get', headers = {}, encrypt }, data = {}) {
    let appinfo = store('iitoken') || {};
    // console.log(store('itoken'),`store('itoken')`)
    // return 
    appinfo = { ...appinfo };

    const options = {
      url: path,
      method: type.toLocaleLowerCase(),
      headers,
      // eslint-disable-next-line no-undef
      [type.toLocaleLowerCase() == 'get' ? 'params' : 'data']: ((DOMAIN_API.env === 'develop' || DOMAIN_API.env === 'prod') && encrypt) ? ibridge.getcrypto({ token: getToken(), ...appinfo, ...delNillObject(data) }) : { token: getToken(), ...appinfo, ...delNillObject(data) },
    };
    return axios({ ...this.getBaseConfig(), ...options })
      .then((res) => {
        Toast.hide();
        if (res.data.code != 200 && res.data.code != 10400) {
          Toast.info({
            content: get(res, 'data.message') || 'Has some problems',
          });
        }
        // if (res.data.code == '2006') {
        //   try {
        //     Toast.hide();
        //   } catch (error) {

        //   }
        //   setTimeout(() => {
        //     Toast.fail({
        //       content: res.data.detail,
        //     });
        //   });
        // }
        // if (res.data.code != 200 && res.data && res.data.detail) {
        //   setTimeout(() => {
        //     Toast.fail({
        //       content: res.data.detail,
        //     });
        //   });
        // }
        return res.data;
      })
      .catch((err) => {
        Toast.fail({
          content: `Operation failed, please try again`,
        });
        return { data: {}, err };
      });
  }
}
// eslint-disable-next-line import/no-mutable-exports
let request = {};
if (__CLIENT__) {
  request = new Request();
}

export default request;
