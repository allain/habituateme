import React from 'react';
import Router from 'react-router';
import Reflux from 'reflux';

import { MenuItem, LeftNav, Styles, Avatar} from 'material-ui';

import Actions from '../actions';

import userStore from '../stores/user-store';

let { Colors, Spacing, Typography } = Styles;

let menuItems = [
  { route: 'logout', text: 'Logout' },
];


export default React.createClass({
  mixins: [Reflux.connect(userStore, 'user')],

  getStyles() {
    return {
      cursor: 'pointer',
      //.mui-font-style-headline
      fontSize: '24px',
      color: Typography.textFullWhite,
      lineHeight: Spacing.desktopKeylineIncrement + 'px',
      fontWeight: Typography.fontWeightLight,
      backgroundColor: Colors.cyan500,
      paddingLeft: Spacing.desktopGutter,
      paddingTop: '0px',
      marginBottom: '8px'
    };
  },

  render() {
    let user = this.state.user;

    let header = (      
      <div style={this.getStyles()} onTouchTap={this._onHeaderClick}>
        Habituate.me
      </div>             
    );

    return (
      <LeftNav
        ref="leftNav"
        docked={false}
        isInitiallyOpen={false}
        header={header}
        menuItems={menuItems}
        selectedIndex={this._getSelectedIndex()}
        onChange={this._onLeftNavChange} />
    );
  },

  toggle() {
    this.refs.leftNav.toggle();
  },

  _getSelectedIndex() {
    let currentItem;

    for (let i = menuItems.length - 1; i >= 0; i--) {
      currentItem = menuItems[i];
      if (currentItem.route && this.context.router.isActive(currentItem.route)) return i;
    }
  },

  _onLeftNavChange(e, key, payload) {
    if (payload.route === 'logout') {
      return Actions.logout();
    }

    this.context.router.transitionTo(payload.route);
  },

  _onHeaderClick() {
    this.context.router.transitionTo('root');
    this.refs.leftNav.close();
  },

  contextTypes: {
    router: React.PropTypes.func
  }
});
