import React from 'react';
import classnames from 'client/pages/index/pages/me/node_modules/classnames/bind';
import styles from './style.m.less';
import Translator from 'client/i18n';
const { getMessage } = new Translator('wallet');
const cx = classnames.bind(styles);

function Bottom(props) {
  const {style} = props;
  return (
    <div className={cx('result_box')} style={{...(style||{})}}>
        <a href={`${DOMAIN_API.web}/feedback/list`}>{getMessage("hasQuestion")}</a>
    </div>
  )
}
export default Bottom;