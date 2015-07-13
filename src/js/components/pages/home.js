import React from 'react/addons';
import Reflux from 'reflux';
import Actions from '../../actions';
import userStore from '../../stores/user-store'

import {Link} from 'react-router';
import HabitsList from '../habit-list'
import AppLeftNav from '../app-left-nav';

import {AppBar, FontIcon, FlatButton, FloatingActionButton, Avatar} from 'material-ui';

export default React.createClass({
  mixins: [Reflux.connect(userStore, 'user')],

  render() {
    let user = this.state.user || {};   

    return <div>
      <FloatingActionButton style={{
        position: 'fixed', 
        bottom: '10px', 
        right: '20px', 
        zIndex: 100
      }} mini={true} onTouchTap={this._add}>
        <FontIcon className="material-icons">add</FontIcon> 
      </FloatingActionButton>
      <AppBar title="Habituate.me" onLeftIconButtonTouchTap={this._toggleLeftNav} />
      <AppLeftNav ref="leftNav" />        
      <HabitsList />
    </div>
  },

  _toggleLeftNav() {
    this.refs.leftNav.toggle();
  },

  _add() {
    this.context.router.transitionTo('/new');
  },

  contextTypes: {
    router: React.PropTypes.func
  },
});