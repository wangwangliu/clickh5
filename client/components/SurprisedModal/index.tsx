import React, { useEffect, useState} from 'react';
import { request } from 'client/utils/index';
import classnames from 'client/pages/index/pages/me/node_modules/classnames/bind';
import styles from './style.m.less';
import Translator from 'client/i18n';
const { getMessage } = new Translator('surprisedModal');

const cx = classnames.bind(styles);



function SurprisedModal(props){

  const { id: product_id, is_check_surprised,isVip, showSurprisedModal, onClose, againSubmit, onAgainSubmit,onOpened } = props;
  const [ product_info, setProductInfo ] = useState({});
  const [ submit, setSubmit ] = useState(false)
  const char = {
    title:getMessage('congratulations'),
    sub_title:(Object.keys(product_info).length>0&&product_info.product_info)?product_info.product_info.diamond?getMessage('diamonds'):getMessage('vipby'):''
    
  }
  const getSurprisedProduct = ()=>{
    request.send(request.api.getSurprisedProduct, {
      product_id:+product_id
    }).then(res=>{
      if(res.code ==200){
        setProductInfo(res.data)
        onOpened(res.data.is_opened)
      }
    })
  }

  const setIsOpenSurprisedProduct = ()=>{
    request.send(request.api.setIsOpenSurprisedProduct, {
      product_id:+product_info.product_info.id
    })
  }
  useEffect(() => {
    if(product_id&&is_check_surprised){
      getSurprisedProduct()
    }
  },[product_id, is_check_surprised,showSurprisedModal])

  useEffect(() => {
    if(againSubmit){
      setSubmit(false);
      if(typeof onAgainSubmit ==='function'){
        onAgainSubmit(false);
      }
    }
  },[againSubmit])
 
   return (
    <>
      {(product_info.is_opened !=1 && is_check_surprised ==1 && !!showSurprisedModal)&&
        <>
          <div className={cx('surprised_fixed')} />
          <div className={cx('surprised_model')}>
            <div className={cx('top_gift')}/>
            <div className={cx('surprised_box')}>
              <div className={cx('tit_')}>{char.title}</div>
              <div className={cx('sub_tit_')}>{char.sub_title}</div>
              <div className={cx('btn_',submit?'opt':'')} onClick={()=>{
                if(submit){
                  return
                }
                setSubmit(true)
                setIsOpenSurprisedProduct();
                setTimeout(()=>{
                  onClose({...product_info.product_info,is_opened:1},isVip);
                })
              }}>
                {
                  (Object.keys(product_info).length>0 && product_info.product_info) &&
                  <>
                    {
                      !!product_info.product_info.diamond &&
                      <>
                      <i className={cx('diamond')} />
                      {getMessage('dm',{diam:product_info.product_info.diamond,money:product_info.product_info.real_price},1)}
                      {/* {product_info.product_info.diamond}/${product_info.product_info.real_price} */}
                      </>
                    }
                    {
                      !!product_info.product_info.vip_day &&
                      <>
                        {getMessage('vm',{days:product_info.product_info.vip_day,money:product_info.product_info.real_price},1)}
                        {/* {product_info.product_info.vip_day} Days VIP/${product_info.product_info.real_price} */}
                      </>
                    }
                  </>
                }
                
              </div>
              <div className={cx('no_wrap')}>
                <div className={cx('no_')} onClick={()=>{
                  setIsOpenSurprisedProduct();
                  setTimeout(()=>{
                    onClose({is_opened:1},isVip)
                  })
                }}>{getMessage('nothanks')}</div>
              </div>
            </div>
          </div>
        </>
      }
    </>
    // ,
    //   document.body
   )
 }

export default SurprisedModal;