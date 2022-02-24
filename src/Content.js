import React, { useEffect, useState } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import appInfo from './app-info';
// import routes from './app-routes';
import { SideNavInnerToolbar as SideNavBarLayout } from './layouts';
import { Footer } from './components';
import Gems from './pages/tasks/tasks';
import ProfilePage from './pages/profile/profile';
import Constants from './core/serverurl';
import Axios from 'axios'


export default function Content() {
  const [routes, setRoutes] = useState([{
    path :'/gems',
    component : Gems
  }, {
    path : '/profile',
    component : ProfilePage
  }])

  useEffect(() => {
    Axios.get(`${Constants.serverlink}folder/list`,{
      headers : {
        "token" : localStorage.getItem('token')
      }
    }).then((response) => {
      if (response.data.length>0 && response.status === 200) {
       response.data.map((e) => {
          for (let i =0; i<e.items.length; i++) {
            let obj = {
              path : e.items[i].path ,
              component : Gems
            }
            setRoutes((routes) => {
              return [...routes, obj]
            })
    
          }
        })
        
      }
    });
  },[])

  return (
    <SideNavBarLayout title={appInfo.title}>
      <Switch>
        {routes.map(({ path, component }) => (
          <Route
            exact
            key={path}
            path={path}
            component={component}
          />
        ))}
        <Redirect to={'/gems'} />
      </Switch>
      <Footer>
        {/* Copyright © 2011-{new Date().getFullYear()} {appInfo.title} Inc.
        <br />
        All trademarks or registered trademarks are property of their
        respective owners. */}
        Gems Stock Management System.
      </Footer>
    </SideNavBarLayout>
  );
}
