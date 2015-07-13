import React from 'react';
import Reflux from 'reflux';
import Actions from '../actions';
import habitsStore from '../stores/habits-store';
import {Link} from 'react-router';


import {Paper, Toolbar, ToolbarGroup, IconButton, ListItem, RaisedButton} from 'material-ui';


import map from 'amp-map';

const HabitListItem = React.createClass({
  mixins: [    
    Reflux.connect(habitsStore, 'habits')
  ],

  getInitialState() {
    return {
      title: this.props.habit.title
    };
  },

  render() {
    let habit = this.props.habit;
    let now = new Date();
    let today = [now.getFullYear(),
       ('0' + (now.getMonth() + 1)).substr(-2),
       ('0' + now.getDate()).substr(-2)].join('-');

    let activities = habit.activities || {};

    let currentCount = activities[today] || 0;

    return <Paper onTouchTap={this.edit} style={{margin: '10px'}} zDepth={2}>
      <IconButton iconClassName="material-icons" tooltipAlignment="bottom-center" tooltip="Edit" onClick={this._edit} style={{float: 'right'}}>edit</IconButton>      
      <h2 style={{padding: '10px 0 0 10px', marginBottom: 0}}>{habit.title}</h2>
      
      <div style={{textAlign: 'center', padding: '20px'}}>
        <RaisedButton onClick={this._recordFailure} label="-" secondary={true} disabled={currentCount === 0} />
        <span className="day-success-tally" style={{textAlign: 'center', fontSize: '20px', padding: '10px 24px'}}>{currentCount}</span>                    
        <RaisedButton onClick={this._recordSuccess} label="+" primary={true}/>        
      </div>
                      
      </Paper>;
  },

  _recordSuccess(e) {
    Actions.recordHabitSuccess(this.props.habit);
  },

  _recordFailure(e) {
    Actions.recordHabitFailure(this.props.habit);
  },

  _edit() {
    this.context.router.transitionTo('/edit/' + this.props.habit._id);
  },

  contextTypes: {
    router: React.PropTypes.func
  },
});

export default HabitListItem;