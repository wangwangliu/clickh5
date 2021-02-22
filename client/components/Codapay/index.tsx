import React, { useEffect, useState } from 'react';
import { request } from 'client/utils/index.js';
import ibridge from 'client/utils/Ibridge';
import { Progress, Modal } from 'antd-mobile';
import SelCountry from 'client/components/SelCountry/index';
import SurprisedModal from 'client/components/SurprisedModal/index';
import classnames from 'client/pages/index/pages/me/node_modules/classnames/bind';
import styles from './style.m.less';
import Translator from 'client/i18n';
import enumFrom from 'client/utils/enumFrom';
const { getMessage } = new Translator('wallet');

// import store from 'store2';


const cx = classnames.bind(styles);

function CodapayWarp(props) {
  const [url, setUrl] = useState('')
  const [cur, setCur] = useState(props.currCountry);
  const [show, setShow] = useState(false);
  const [canSel, setCanSel] = useState(false);
  const [progress, setProgress] = useState(40);
  const [orderId, setOrderId] = useState(props.coda.order_id);
  const [showFaq, setShowFaq] = useState(false);
  const [selFaq, setSelFaq] = useState(-1);
  const [showSurprisedModal, setShowSurprised] = useState(false);
  const [is_opened, setIsOpend] = useState(false);
  const [cid, setCid] = useState(props.currCountry.id);
  const [againSubmit, setAgainSubmit] = useState(false);
  const { h5_url } = props.coda;
  const faqMenu = [
    { content: getMessage('faqMenu.0'), fun: submitFaq },
    { content: getMessage('faqMenu.1'), fun: submitFaq },
    { content: getMessage('faqMenu.2'), fun: submitFaq },
    { content: getMessage('faqMenu.4'), fun: gotoConversation },
  ]

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

  const openTimeout = () => {
    let time = null;
    setCanSel(false);
    setProgress(40)
    setTimeout(() => {
      setProgress(100)
    }, 2000)
    time = setTimeout(() => {
      setCanSel(true);
      setProgress(0)
      clearTimeout(time);
    }, 3000);
    document.getElementById('iframe_body').onload = function () {
      setProgress(0);
      setCanSel(true);
    };
  }
  const createGpOrderId = (country_id?) => {
    setCanSel(false);
    const { price, diamond } = props.coda;
    if (price && diamond && !orderId) {
      ibridge.getAppInfo()
        .then(res => {
          request
            .send(request.api.createLimitCodaOrder, {
              product_id: +props.prdInfo.id,
              pay_lan: country_id || res.country_id,
            })
            .then((res) => {
              const { data, code } = res;
              if (code == 200) {
                setTimeout(() => {
                  openTimeout();
                  setOrderId(data.order_id);
                  setUrl(`${window.DOMAIN_API.codapay}&txn_id=${data.txn_id}&browser_type=mobile-web`)
                })
              }
            })
        });
      return
    }
    request
      .send(request.api.ChangeCodaLanAndCreateOrder, {
        order_id: orderId,
        pay_lan: +country_id
      })
      .then(res => {
        const { data, code } = res;
        if (code == 200) {
          setTimeout(() => {
            setOrderId(data.order_id);
            setUrl(`${DOMAIN_API.codapay}&txn_id=${data.txn_id}&browser_type=mobile-web`)
          })
          openTimeout()
          return
        }
        setCanSel(true);
      })
  }


  // 生成新订单
  function getSurprisedOrder(proInfo) {
    const { vip, from } = props.coda;
    // vip==3代表是惊喜产品
    request
      .send(request.api[vip != 3 ? 'createCodaOrder' : 'createLimitCodaOrder'], {
        pay_type: 0,
        product_id: +proInfo.id,
        is_vip: vip == 3 ? 0 : +vip,
        from: +from,
        pay_lan: +cid,
        pay_channel: +props.coda.pay_channel || ''
      })
      .then((res) => {
        
        if (res.code == 200) {
          const { data } = res;
          // 生成订单上报
          ibridge.callNative({
            action: 8,
            data: {
              type: 0
            }
          })
          setOrderId(data.order_id);
          setShowSurprised(false);
          setTimeout(() => {
            if (props.coda.pay_type) {
              setUrl(data.h5_url);
            }
            setUrl(`${window.DOMAIN_API.codapay}&txn_id=${data.txn_id}&browser_type=mobile-web`)
          })
        } else {
          setAgainSubmit(true)
        }

      })
  }

  function submitFaq(content) {
    const { from } = props.coda;
    FeedAdd(orderId, content)
      .then(() => {
        if(from!=enumFrom.from45){
          ibridge.callNative({ action:11 })
        }
        setTimeout(()=>{
          ibridge.closeWebView();
        })
      })
  }

  function gotoConversation(content) {
    FeedAdd(orderId, content)
      .then(() => {
        const content = props.coda.vip == 1 ? `Please assist me for my VIP` : `Diamonds purchasing issue`
        ibridge.gotoConversation(window.DOMAIN_API.ryid, `${content}, Order No: ${orderId}`)
      })
  }
  
  // const getSurprisedProduct = ()=>{
  //   request.send(request.api.getSurprisedProduct, {
  //     product_id:+props.coda.id
  //   }).then(res=>{
  //     if(res.code ==200){
  //       setIsOpend(res.data.is_opened)
  //     }
  //   })
  // }

  const backChange = () => {
    if (props.coda.is_check_surprised == 1 && !is_opened) {
      setShowSurprised(true)
      return
    }
    // 新增
    submitFaq('cancel')
    // setShowFaq(true)
  }

  useEffect(() => {
    setCur(props.currCountry);
    setCid(props.currCountry.id);
  }, [props.currCountry])

  useEffect(() => {
    ibridge.getAppInfo()
      .then(({ version }) => {
        if (version >= 10034) {
          ibridge.backUrl(`intercept:///backevent`, backChange)
        }
      })

    if (h5_url) {
      setTimeout(() => {
        openTimeout();
        setUrl(h5_url)
      })
      return
    }
    if (props.coda.txn_id) {
      setTimeout(() => {
        openTimeout();
        setUrl(`${window.DOMAIN_API.codapay}&txn_id=${props.coda.txn_id}&browser_type=mobile-web`)
      })
    } else {
      createGpOrderId();
    }
    return () => {
      ibridge.backUrl('');
    }
  }, [])


  return (
    <>
      <Modal
        visible={showFaq}
        transparent
        maskClosable={true}
        onClose={() => { setShowFaq(false) }}
        className='__model__'
      >
        <div className={cx('tit____')} dangerouslySetInnerHTML={{ __html: `${getMessage('telluyp')}<br/>${getMessage('byl')}` }}></div>
        {
          faqMenu.map((item, index) => {
            if (index == 3 && props.appinfo) {
              if ((props.appinfo.version) < 10003) {
                return
              }
            }
            return <div key={index} className={cx('check_b', selFaq == index ? 'clicked' : '')} onClick={() => {
              setSelFaq(index);
              item.fun(item.content, index)
            }}>{item.content}</div>
          })
        }
      </Modal>
      <div className={cx('codapay')}>
        <div className={cx('c_header')}>
          <div className={cx('close')} onClick={() => {
            backChange()
            // if (props.coda.is_check_surprised == 1 && !is_opened) {
            //   setShowSurprised(true)
            //   return
            // }
            // setShowFaq(true)
            // ibridge.closeWebView()
          }} />
          <div className={cx('title')}>{
            props.coda.pay_type ? props.coda.pay_type == 3 ? `Telkomsel` : `ShareItPay` : `Codapay`
          }</div>
          {!h5_url &&
            <div className={cx('sel_icon', canSel ? '' : 'op')} onClick={() => {
              if (canSel) {
                setShow(true)
              }
            }}>
              <div className={cx('flag')}><img src={cur.flag} /></div>
              <div className={cx('c_name')}>{cur.name}</div>
              <div className={cx('triangle')} />
            </div>
          }
        </div>
        {!!progress && <Progress percent={progress} position="normal" barStyle={{ border: "1px solid #6435EF" }} style={{ height: '0.2rem' }} unfilled={false} appearTransition />}
        <div className={cx('iframe_w')}>
          <iframe src={url} id="iframe_body" />
        </div>
      </div>
      <SelCountry {...props} show={show} onClose={(id) => {
        setShow(false);
        if (id != null) {
          // openTimeout();
          setCid(id);
          createGpOrderId(id)
          setCur(props.country.find(item => {
            return item.id == id
          }))
        }
      }} />
      <SurprisedModal {...{ id: +props.prdInfo.id, is_check_surprised: props.coda.is_check_surprised, showSurprisedModal, againSubmit }} onClose={
        (proInfo) => {
          setIsOpend(true);
          if (Object.keys(proInfo).length > 1) {
            getSurprisedOrder(proInfo);
          } else {
            setShowSurprised(false);
            ibridge.callNative({ action:11 })
            setTimeout(() => {
              ibridge.closeWebView();
            });
          }
        }
      } onAgainSubmit={(flag) => {
        setAgainSubmit(flag)
      }}
        onOpened={(flag) => {
          setIsOpend(flag)
        }}
      />
    </>
  )
}

export default CodapayWarp;