import request from 'client/utils/request';

export function bookInfo(prams){
  return request.send(request.api.bookInfo,prams )
}