import request from 'client/utils/request';

export function chapterInfo(prams){
  return request.send(request.api.chapterInfo,prams )
}