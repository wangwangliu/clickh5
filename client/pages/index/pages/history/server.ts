import request from 'client/utils/request';

export function purchasesInfoLog(prams){
  return request.send(request.api.purchasesInfoLog,prams )
}

export function ordersInfoLog(prams){
  return request.send(request.api.ordersInfoLog,prams )
}