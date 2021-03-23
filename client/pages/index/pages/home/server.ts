import request from 'client/utils/request';

export function userBooks(prams){
  return request.send(request.api.userBooks,prams )
}

export function discover(prams){
  return request.send(request.api.discover,prams )
}