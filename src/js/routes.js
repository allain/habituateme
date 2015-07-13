import React from 'react';
import {Route, DefaultRoute} from 'react-router';

let Master = require('./components/master');

let Home = require('./components/pages/home');
let New = require('./components/pages/new');
let Edit = require('./components/pages/edit');

let AppRoutes = (
  <Route name="root" path="/" handler={Master}>
    <Route name="home" handler={Home} />  
    <Route name="new" handler={New} /> 
    <Route name="edit" path="/edit/:habitId" handler={Edit} />
    <DefaultRoute handler={Home}/>
  </Route>
);

module.exports = AppRoutes;