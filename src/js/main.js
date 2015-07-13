require('../style/style.scss');

import React from 'react';
import Router from 'react-router';

import AppRoutes from './routes';

require('react-tap-event-plugin')();

Router
    // Runs the router, similiar to the Router.run method. You can think of it as an
    // initializer/constructor method.
    .create({
      routes: AppRoutes,
      scrollBehavior: Router.ScrollToTopBehavior
    })
    // This is our callback function, whenever the url changes it will be called again.
    // Handler: The ReactComponent class that will be rendered
    .run(function (Handler) {
      React.render(<Handler/>, document.getElementById('app'));
    });