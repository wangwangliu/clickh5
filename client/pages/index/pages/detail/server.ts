import request from 'client/utils/request';

export function chapterInfo(prams){
  return request.send(request.api.chapterInfo,prams )
}

// 设置自动开启
export function setPayAuto(prams){
  return request.send(request.api.setPayAuto,prams )
}
// 购买整📚
export function bookOrder(prams){
  return request.send(request.api.bookOrder,prams )
}

// 购买单个章节
export function chapterOrder(prams){
  return request.send(request.api.chapterOrder,prams )
}