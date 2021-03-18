import request from 'client/utils/request';

export function redemprionCode(prams){
  return request.send(request.api.redemprionCode,prams )
}