import React, { PureComponent } from 'react';

import classnames from 'classnames/bind';

import styles from './notice.module.less';

const cx = classnames.bind(styles);

class Notice extends PureComponent {
  constructor(props) {
    super(props);
    const animateType = props.animateType || 'fade';
    this.state = {
      animateType,
      animate: animateType,
    };
  }
  componentDidMount() {
    const { animateType } = this.state;
    setTimeout(() => {
      this.setState({
        animate: `${animateType}-in`,
      });
    }, 0);
  }
  componentWillUnmount() {
    const { animateType } = this.state;
    this.setState({
      animate: `${animateType}`,
    });
  }
  render() {
    const { content = '', mask = true, type, theme } = this.props;
    const icon_style = cx('icon', 'indiaim', `indiaim-${type}`);
    return (
      <div className={cx('window', { mask }, { nomask: !mask })}>
        <div
          className={cx('content', this.state.animate, { light: theme === 'light' })}
        >
          {type !== 'info'
            && <div className={icon_style} />}
          {content}
        </div>
      </div>
    );
  }
}

export default Notice;
