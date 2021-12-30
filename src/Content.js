import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import appInfo from './app-info';
import routes from './app-routes';
import { SideNavInnerToolbar as SideNavBarLayout } from './layouts';
import { Footer } from './components';

export default function Content() {
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
