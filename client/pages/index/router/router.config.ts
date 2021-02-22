
import React from 'react'
import Loadable from 'react-loadable';
import Loading from '../components/Loading'
import {registerModel} from "./register";
export const routes = [
  {
    path: '/home',
    component: Loadable({
      loader: () => import('../pages/home/index'),
      loading: Loading
    })
    // component: (app) => Loadable.Map({
    //   loader: {
    //     Home: () => import('../pages/home/index'),
    //     model: () => import('../pages/home/model')
    //   },
    //   loading: Loading,
    //   render(loaded, props) {
    //     const Home = loaded.Home.default
    //     const model = loaded.model.default
    //     registerModel(app, model)
    //     return (
    //       <Home { ...props}/>
    //     )
    //   }
    // })
  }
]
export const getRoutes = (app) => {
 
  return routes.map((route) => {

    let componentName = route.component.name;
    if (componentName !== 'Connect') {
      try {
        route.component = route.component(app);
      } catch (e) {
      }
    }
    return route;
  });

}