import React from 'react';
import { useHistory } from "react-router-dom";
import styles from './style.m.less';
import classNames from 'client/pages/index/pages/me/node_modules/classnames/bind';
import ibridge from 'client/utils/Ibridge';
import Translator from 'client/i18n';
const { getMessage } = new Translator('wallet');

const cx = classNames.bind(styles);

function Bar(props) {
  const { show=true ,left_icon_unshow, title='', showHistory=false, tohistory, historyName,closeFun } = props;
  const  history = useHistory()
  const goHistory=()=>{
    if(historyName&&tohistory){
      window.location.href = `${DOMAIN_API.web}/feedback/list`;
      return
    }
    if(tohistory){
      history.push({pathname:tohistory})
      return
    }
    history.push({pathname:`/wallet/history`})
    return
  }
  const goBack =()=>{
    if(closeFun){
      closeFun()
      return
    }
    ibridge.closeWebView();
    return
  }
  return (
   <>
    { show &&
     <div className={cx('_nav_bar')}>
      {!left_icon_unshow&&<div className={cx('left_')} onClick={goBack}/>}
      <div className={cx('center_')}>{title}</div>
      {showHistory && <div className={cx('right_')} onClick={goHistory}>{historyName||getMessage('history')}</div>}
     </div>
    }
   </>
  );
}
export default Bar;