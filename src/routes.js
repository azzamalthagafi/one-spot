import React from 'react'
import { Route, IndexRoute } from 'react-router'
import Layout from './components/Layout';
import IndexPage from './components/IndexPage';
import NotFoundPage from './components/NotFoundPage';
import Room from './components/Room';


const routes = (
  <Route path="/" component={Layout}>
    <IndexRoute component={IndexPage}/>
    <Route path="room/:id" component={Room}/>
    <Route path="*" component={NotFoundPage}/>
  </Route>
);

export default routes;