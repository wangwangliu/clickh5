import React, { useContext, useEffect, useState } from 'react';
import { Modal, Toast } from 'antd-mobile';
import classnames from 'client/pages/index/pages/me/node_modules/classnames/bind';
import styles from './index.m.less';
import { request } from 'client/utils/index.js';
import store from 'store2';
import ibridge from 'client/utils/Ibridge';
import TranslatorDef from 'client/i18n';
import get from 'lodash/get';
const { getMessage } = new TranslatorDef('selectpay');

const cx = classnames.bind(styles);
import google from './images/icon_google.png';

function SelectPay(props) {

  const { id, real_price,
    visible, is_check_surprised,
    is_opened, onShowSurprisedModal,
    onCodaPayHandle, onClose, vip,
    google_product_id,
    is_renew,
    real_product_type,
    payChannelList = [], limitCodaOrder = false, name } = props;
  const [defaultPay, setDpay] = useState('1');
  const [pay_type, setPay_type] = useState({ [defaultPay]: true });
  const [submiting, setSubmiting] = useState(false);
  const [appinfo, setAppinfo] = useState({});
  const [list, setList] = useState([]);
  const [gDiamond, setGDaimond] = useState(0);
  const [most, setMost] = useState(0);

  function FeedAdd(order_id, content) {
    return new Promise((resole, reject) => {
      request.send(request.api.FeedAdd, {
        cate_id: 46,
        content,
        order_id,
        back_type: 1
      }).then((res) => {
        resole()
      })
    })
  }
  const createGpOrderId = (pay_type, pay_channel?) => {
    if (submiting) {
      return
    }
    setSubmiting(true);
    Toast.info(getMessage('selectpay.processing1'), 10000);
    request
      .send(request.api[limitCodaOrder ? 'createLimitCodaOrder' : 'createCodaOrder'], {
        pay_type: +pay_type,
        product_id: +id,
        is_vip: vip,
        from: (typeof (store('from')) === 'undefined') ? 0 : (+store('from')),
        pay_lan: +appinfo['country_id'],
        pay_channel: pay_channel ? (+pay_channel) : ''
      })
      .then(res => {
        const { data, code } = res;
        Toast.hide();
        // 生成订单上报
        if (code == 200 && pay_type == 1) {
          ibridge.callNative({
            action: 8,
            data: {
              type: 0,
              name: name || '',//产品名
              product_id: id,//产品id
              real_prize: real_price,//价格
              order_id: data.order_id//订单id
            }
          })
        }else{
          ibridge.callNative({
            action: 13,
            data: {
              name: name || '',//产品名
              product_id: id,//产品id
              real_prize: real_price,//价格
              order_id: data.order_id//订单id
            }
          })
        }
        if (code == 200 && pay_type == 1) {
          ibridge.googlePay({
            google_product_id,
            is_renew,
            real_product_type,
            order_id: data.order_id,
            callback: (result) => {
              if (result.code == 0) {
                Toast.info(getMessage('selectpay.order_status_enum.1'))
                onClose('suc');
                ibridge.callNative({
                  action: 8,
                  data: {
                    type: 1,
                    name: name || '',//产品名
                    product_id: id,//产品id
                    real_prize: real_price,//价格
                    order_id: data.order_id//订单id
                  }
                })
              } else {
                if (is_check_surprised && !is_opened) {
                  onShowSurprisedModal()
                } else {
                  Toast.info(getMessage('selectpay.failtopay1'));
                }
                setTimeout(() => {
                  FeedAdd(data.order_id, JSON.stringify(result))
                })
              }
              setSubmiting(false);
            }
          })
          return
        }
        if (code == 200) {
          onCodaPayHandle({ ...data, pay_channel })
          return
        }
        setSubmiting(false);
      })
  }
  const payNow = () => {
    if (Object.keys(pay_type)[0] === '1') {
      createGpOrderId(1);
      return
    }
    createGpOrderId(0, Object.keys(pay_type)[0].replace(/pay_channel_(\d*)$/, "$1"));
    // onCodaPayHandle();
  }

  useEffect(() => {
    if (visible == true) {
      setPay_type({ [defaultPay]: true });
    }
    ibridge.getAppInfo()
      .then(res => {
        setAppinfo(res);
        request.send(request.api.getPayChannelList, { pay_lan: ((+res.country_id)), is_vip: vip, product_id: +id })
          .then(list => {
            const { code, data } = list
            if (code == 200) {
              // data.last_success_channel = 27;
              const d = data.last_success_channel ? `pay_channel_${data.last_success_channel}` : '1';
              setDpay(d);
              setPay_type({ [d]: true });
              setList(data.channel_list);
              setGDaimond(data.google_gift_diamond);
              const mt = data.channel_list.reduce((prev, curr) => { 
                // console.log(prev, curr,'prev, curr')
                return ( prev > (+curr.gift_diamond) ? +prev : +curr.gift_diamond) 
              }, 0)
              setMost(mt > data.google_gift_diamond ? mt : data.google_gift_diamond || 0);
            }
          })
      })
    return () => { };
  }, [visible]);

  return (
    <Modal
      popup
      visible={visible}
      onClose={onClose}
      animationType="slide-up"
      className={cx('am_modal_body__')}
    >
      <div className={cx('pay_')}>
        <div className={cx('t_header', (get(appinfo, 'lan')) == 11 ? 'arb_t_r' : '')}>
          {getMessage('selectpay.paymethod1')}
          {!!most && <span className={cx('most')}>
            <span>+{most}</span> <i className={cx('diamond_')} /> <span>{getMessage('atmost')}</span>
          </span>}
        </div>
        <div className={cx('t_content')}>
          {
            !!(!!list.length && list.some((item) => {
              if ((defaultPay + '').indexOf(`pay_channel_`) > -1) {
                return (defaultPay + '').indexOf(item.pay_channel) > -1
              }
              return false
            })) &&
            list.filter((item) => {
              if ((defaultPay + '').indexOf(`pay_channel_`) > -1) {
                return (defaultPay + '').indexOf(item.pay_channel) > -1
              }
              return false
            }).map((item, index) => {
              return <div className={cx("list_")} key={`${item.name}${index}`} onClick={
                () => {
                  setPay_type({ [`pay_channel_${item.pay_channel}`]: true })
                }
              }>
                <img src={item.icon} />
                <div className={cx('pay_content', (get(appinfo, 'lan')) == 11 ? `arb_t_r arb_pd_02` : '')}>{item.name} {(!!list.length && !!list.find((item1)=>{return item.pay_channel == item1.pay_channel })['gift_diamond']) && <span className={cx('gift_diamond_list')}>+{list.find((item1)=>{return item.pay_channel == item1.pay_channel })['gift_diamond']} <i className={cx('diamond_')} /></span>}</div>
                <div className={cx(Object.keys(pay_type).indexOf(`pay_channel_${item.pay_channel}`) > -1 ? 'checked_' : 'arrow_')}></div>
              </div>
            })
          }
          <div className={cx("list_")} onClick={() => {
            setPay_type({ 1: true })
          }}>
            <img src={google} />
            <div className={cx('pay_content', (get(appinfo, 'lan')) == 11 ? `arb_t_r arb_pd_02` : '')}>Google pay {!!gDiamond && <span className={cx('gift_diamond_list')}>+{gDiamond}<i style={{ marginLeft: '0.2rem' }} className={cx('diamond_')} /></span>}</div>
            <div className={cx(Object.keys(pay_type).indexOf('1') > -1 ? 'checked_' : 'arrow_')}></div>
          </div>
          {
            !!list.length &&
            list.map((item, index) => {
              if (real_price < 3.3 && item.pay_channel == 220) {
                return
              }
              if ((defaultPay + '') == `pay_channel_${item.pay_channel}`) {
                return
              }
              return (
                <div className={cx("list_")} key={`${item.name}${index}`} onClick={
                  () => {
                    setPay_type({ [`pay_channel_${item.pay_channel}`]: true })
                  }
                }>
                  <img src={item.icon} />
                  <div className={cx('pay_content', (get(appinfo, 'lan')) == 11 ? `arb_t_r arb_pd_02` : '')}>{item.name}{(!!list[index] && !!list[index]['gift_diamond']) && <span className={cx('gift_diamond_list')}>+{list[index]['gift_diamond']} <i className={cx('diamond_')} /></span>}</div>
                  <div className={cx(Object.keys(pay_type).indexOf(`pay_channel_${item.pay_channel}`) > -1 ? 'checked_' : 'arrow_')}></div>
                </div>
              )
            })
          }

        </div>
        <div className={cx('t_bottom')}>
          <div className={cx('btn_', submiting ? 'opacity' : '')} onClick={payNow}>{getMessage('selectpay.payNow1')}</div>
        </div>
      </div>

    </Modal>
  )
}


export default SelectPay;
