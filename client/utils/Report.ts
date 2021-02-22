import Maidian from './maidian';
import Ibridge from './Ibridge';
 
interface Opt {
 page: string;
 action:string
 event: string;
 extend_info?:object
}

function Report(opt:Opt){
 let data = {
  app:'HypeChat',  //必填
  page:'', //必填
  action:'click', //必填
  event:'', //必填
  module:'',//一般不填
  topic:'matche', //必填
  url:DOMAIN_API.reportApi, //
  extend_info:{},
  ...opt
}
 Ibridge.getAppInfo()
 .then((info)=>{
   const extend_info = {...data.extend_info,...info,bizType:'H5'};
   Maidian.h5Report({...data,extend_info})
 }) 
}

export default Report;
