
import React from 'react'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
// import { Route, Switch, withRouter } from 'react-router-dom';
import { Switch, Route, routerRedux } from 'dva/router';
import cx from 'classnames'
import './index.less'

const AnimatedSwitch = props => {
  const { children } = props;
  // console.log(props.history,'props.history')
  return (
    <Route
      render={({ location }) => (
        <TransitionGroup
          childFactory={child => React.cloneElement(
                child,
                {classNames: props.history.action === 'PUSH'?'forward-from-right':'back-to-right'}
          )}
        >
          <CSSTransition
            key={location.key}
            // classNames={cx('route_','fa')} 
            timeout={props.duration || 300}
            classNames={props.history.action === 'PUSH'?'forward-from-right':'back-to-right'}
          >
            <Switch location={location}>{children}</Switch>
          </CSSTransition>
        </TransitionGroup>
      )}
    />
  )
}

export default AnimatedSwitch