import React from 'react';
import Reflux from 'reflux';
import Actions from '../actions';
import habitsStore from '../stores/habits-store';
import {Link} from 'react-router';


import {Paper, Toolbar, ToolbarGroup, IconButton, ListItem, Card, CardTitle, CardActions, CardText, RaisedButton} from 'material-ui';


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
      <Toolbar>
        <ToolbarGroup key={0} float="left">
          <RaisedButton onClick={this._recordFailure} label="-" secondary={true} disabled={currentCount === 0} />
        </ToolbarGroup>
        <ToolbarGroup key={1} float="right">
          <RaisedButton onClick={this._recordSuccess} label="+" primary={true}/>        
        </ToolbarGroup>
        <h3 className="day-success-tally" style={{textAlign: 'center', fontSize: '20px', padding: '10px 24px'}}>{currentCount}</h3>                    
        
      </Toolbar>                   
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