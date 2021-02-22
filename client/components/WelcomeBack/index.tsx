import React, { useEffect, useContext, useState, useRef, useImperativeHandle, forwardRef } from 'react';
import { getMessage } from './translator';
import qs from 'qs';
import { request } from 'client/utils/index.js';
import Report from 'client/utils/Report';
import ibridge from 'client/utils/Ibridge';
import styles from './index.m.less';
import classnames from 'client/pages/index/pages/me/node_modules/classnames/bind';
import localDate from './localDate';
import { PAGENAME, ADPOS, PAGE } from './AD';
import { createPortal } from 'react-dom';
import ResultModal from 'client/pages/slotMachine/components/ResultModal';

const cx = classnames.bind(styles);
const localName = 'welcomeBack';

export default function Index(props) {
  const [show, setShow] = useState(false);
  const [showSucModal, setShowSucModal] = useState(false);
  const [showAd, setShowAd] = useState(false);
  const refCb = useRef();
  const { from } = qs.parse(location.search.substr(1));
  // 预加载
  // ibridge.interstitialAdPreLoad(ADPOS[PAGENAME[props.pageName]].inset);
  function reportCenter({ page, action, event, extend_info = {} }) {
    setTimeout(() => {
      Report({
        page,
        action,
        event,
        extend_info: {
          pageAdress: location.href,
          pageFrom: from || 0,
          ...extend_info
        }
      })
    });
  }

  useEffect(() => {
    if (!props.balance) {
      setShow(false)
    } else {
      // 显示
      localDate.getStorage({
        name: localName,
        delayed: props.after_entry_interval,
        gameName: props.pageName
      })
        .then((times) => {
          // console.log(times, '次数')
          let welcomeBackRecord = ~~(sessionStorage.getItem("welcomeBackRecord") || 0);
          // console.log(welcomeBackRecord, '进入过历史页面')
          sessionStorage.setItem("welcomeBackRecord", '0');
          if (times % 2 == 1) {
            if (true && !welcomeBackRecord) {
              props.closeBanner(true)
              reportCenter({
                page: PAGE[PAGENAME[props.pageName]],
                action: 'show',
                event: `${props.pageName}_back_pop_show`
              })
            }
            setShow(true && !welcomeBackRecord)
          }
        })
    }
  }, [])


  return <>
    {!__CLIENT__ ? null : createPortal(
      <div className={cx('wrap')} style={{ display: show ? 'block' : 'none' }}>
        <div className={cx('fix_cover1')} />
        <div className={cx('w_wrap')}>
          <div className={cx('close_')}
            onClick={() => {
              ibridge.openInterstitialAd(ADPOS[PAGENAME[props.pageName]].inset)
              setShow(false)
              props.closeBanner(false)
              // 关闭
              reportCenter({
                page: PAGE[PAGENAME[props.pageName]],
                action: 'click',
                event: `${props.pageName}_back_pop_close`
              })
            }}
          />
          <div className={cx('ww_wrap')}>
            <div className={cx('top')} />
            <div className={cx('title')}>{getMessage('reward')}</div>
            <div className={cx('prize_')}>+{props.gift_number} {!!props.gift_icon && <span><img src={props.gift_icon} /></span>}</div>
            <div className={cx('btn')} onClick={() => {
              if (showAd) {
                return
              }
              // 点击打开广告
              reportCenter({
                page: PAGE[PAGENAME[props.pageName]],
                action: 'click',
                event: `${props.pageName}_back_Get_click`
              })
              setShowAd(true)
              ibridge.openInterstitialAd(ADPOS[PAGENAME[props.pageName]].inset, (id, code) => {
                if (code) {
                  request.send(request.api.GameComeBackCallback, {
                    category: PAGENAME[props.pageName],
                  })
                    .then((res) => {
                      if (res.code == 200) {
                        setShowSucModal(true)
                        setShow(false);
                        setShowAd(false);

                      } else {
                        props.closeBanner(false)
                        setShowAd(false)
                      }
                    })
                } else {
                  props.closeBanner(false)
                  setShowAd(false)
                }
              })
            }}><span className={cx(showAd ? 'loading' : '')} />{getMessage('getit')}</div>
          </div>
        </div>
      </div>
      , document.body)}
    <ResultModal {...{
      show: showSucModal,
      ref: refCb,
      close_dialog_delay_time: 3,
      bannerId: ADPOS[PAGENAME[props.pageName]].banner,
      detail: { color: { color: '#F91BAC' }, name: `+${props.gift_number}`, big_icon: props.gift_icon },
      title_name: getMessage('nextTime'),
      btn: {
        is_double: false,
        btnText: props.pageName === 'LuckyKnife' ? getMessage('start') : null,
        doubleCallback: () => {
          console.log('点击按钮回调')
        },
      },
      closefn: (suc) => {
        // if (suc) {
        props.callback();
        props.closeBanner(false)
        // }
        setShowSucModal(false)
        console.log('关闭按钮回调')
      }
    }} />
  </>
}