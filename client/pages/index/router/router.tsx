import React from 'react';
import { Switch, Route, routerRedux } from 'dva/router';
// import Loading from '../components/Loading'
// import Loadable from 'react-loadable';
// import { IntlProvider } from 'react-intl';
// import  queryString   from 'query-string';
// import AnimatedSwitch from 'client/components/AnimatedSwitch';
const { ConnectedRouter } = routerRedux;
// import { getLanguage, chooseLocale } from '../locales/index'
// import BaseLayout from '../layouts/basicLayout'
// const Home = Loadable({
//   loader: () => import('../pages/home'),
//   loading: Loading
// });
import Home from '../pages/home';
import Discover from '../pages/discover';
import Me from '../pages/me';
import Detail from '../pages/detail';
import Chapters from '../pages/chapters';
import BaseLayout from '../app';
const Routers = (arg) => {
  const { history, browserHistory, app: { _store: { dispatch } } } = arg;
  console.log(history,arg.app,'browserHistory')
  return (
    <ConnectedRouter history={history}>
      <Switch>
        <Route path="/home" render={props => <BaseLayout {...props}>
          <Home {...props} />
        </BaseLayout>} />
        <Route path="/discover" render={props => <BaseLayout {...props}>
          <Discover {...props}/>
        </BaseLayout>} />
        <Route path="/me" render={props => <BaseLayout {...props}>
          <Me {...props}/>
        </BaseLayout>} />
        <Route path="/chapter/:id" render={props => <Chapters {...props} />}/>
        <Route path="/detail/:id" render={props => <Detail {...props} />}/>
        <Route path="/" render={props => <BaseLayout {...props}>
          <Discover {...props} />
        </BaseLayout>} />
        <Route path="/*" render={props => <BaseLayout {...props}>
          <Discover {...props} />
        </BaseLayout>} />
      </Switch>
    </ConnectedRouter>
  );
};

export default Routers;