import React from 'react';

import { Route, Switch } from 'react-router';
import AnimatedSwitch from 'client/components/AnimatedSwitch';
// import { Route, Switch } from 'react-router';
import App from './app';
import Home from './home';
// import Discover from './discover';
// import Me from './me';

export default () => {
  return (
      <AnimatedSwitch>
        <Route path='/' component={App}>
          <Route path="/home" component={Home} />
        </Route>
      </AnimatedSwitch>
  );
}

// import React from 'react';
// import { Router, Route, Switch } from 'dva/router';

// import App from './app';
// import Home from './home';

// const RouterConfig = (({ history }) => (
// 	<Router history={history}>
// 		<Switch>
// 			<Route path='/' component={App}>
// 				<IndexRoute component={Home} />
// 				{/* <Route path='account' component={Account} exact />
// 				<Route path='articles' component={ArticleList} exact />
// 				<Route path='channels' component={Channels} exact />
// 				<Route path='editor' component={Editor} exact /> */}
// 			</Route>
// 		</Switch>
// 	</Router>
// ));

// export default RouterConfig;

