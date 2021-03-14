// import api from 'client/utils/index';
import request from 'client/utils/request';
/**
 * 104041 用户不存在
    10400  token失效
    200成功
 */

export function login(prams){
  return request.send(request.api.login,prams )
}

export function register(prams){
  return request.send(request.api.register, prams)
}

export function userInfo(prams){
  return request.send(request.api.login, prams)
}