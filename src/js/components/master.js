import React from 'react/addons';
import Reflux from 'reflux';
import {RouteHandler} from 'react-router';
import Actions from '../actions';
import userStore from '../stores/user-store'
import {AppCanvas, Styles, RaisedButton} from 'material-ui';

let { Colors, Typography } = Styles;
let ThemeManager = new Styles.ThemeManager();


export default React.createClass({
  mixins: [Reflux.connect(userStore, 'user')],

  render() {
    let user = this.state.user;

    if (user === null) {
      return <RaisedButton label="Login" onClick={Actions.login} />;
    } else if (user) {
    return <AppCanvas>          
        <RouteHandler />    
      </AppCanvas>;
    } else {
      return <div>Loading...</div>;
    }
  },

  getChildContext() {
    return {
      muiTheme: ThemeManager.getCurrentTheme()
    }
  },

  contextTypes: {
    router: React.PropTypes.func
  },

  childContextTypes: {
    muiTheme: React.PropTypes.object
  }
});