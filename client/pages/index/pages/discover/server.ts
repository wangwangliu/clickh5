import request from 'client/utils/request';

export function discover(prams){
  return request.send(request.api.discover,prams )
}