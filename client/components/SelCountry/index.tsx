import React, { useEffect, useState, useContext} from 'react';
import { Modal, Toast, Progress } from 'antd-mobile';
import store from 'store2';
import ibridge from 'client/utils/Ibridge';
import classnames from 'client/pages/index/pages/me/node_modules/classnames/bind';
import styles from './style.m.less';
import Translator from 'client/i18n';
const { getMessage } = new Translator('wallet');

const cx = classnames.bind(styles);



function SelCountry(props){
  const { userInfo, country, pay_country, show=false, onClose } = props;
  console.log(userInfo,'userInfo====')
  const [userCountryId,setUserCountryId] = useState(0)
  const char = {
    name:getMessage('codapayCountry'),
   }
   
  useEffect(() => {
    ibridge.getAppInfo()
    .then(info=>{
      setUserCountryId(info.country_id)
    })
    return ()=>{}
 },[])

  const CountryList = ()=>{
     return (
      <div className={cx('model_list_wrap')}>
        <div className={cx('model_list_tit')}>
         {char.name}
        </div>
        <div className={cx('model_list_')}>
          { !!country.length &&
           country.map((item,index)=>{
              const { id, name, flag } = item;
              if(pay_country.indexOf(id)==-1){
               return
              }
              return (
                <div key={index} className={cx('list_')} onClick={()=>{
                 setUserCountryId(id);
                 store('userCountryId',id);
                 onClose(id)
                }}>
                  <div className={cx('flag')}> <img src={flag} /></div>
                  <div className={cx('country')}> {name}</div>
                  <div className={cx('checkbox_',(id==userCountryId)?'checkbox_ed':'')}></div>
                </div>
              )
           })
          }
        </div>
      </div>
     )
  }

   return (
    <Modal
       popup
       visible={show}
       onClose={onClose.bind(this,null)}
       animationType="slide-up"
       >
       <CountryList />
     </Modal>
   )
 }

export default SelCountry;