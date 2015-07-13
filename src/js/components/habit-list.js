import React from 'react/addons';
import Reflux from 'reflux';

import habitsStore from '../stores/habits-store';
import HabitListItem from './habit-list-item.js';
import {List} from 'material-ui';

export default React.createClass({
  mixins: [
    React.addons.LinkedStateMixin,    
    Reflux.connectFilter(habitsStore, "habits", function(habits) {
      return habits.filter(habit => !habit.archived);
    })
  ], 

  render() {
    if (this.state.habits.length === 0) {
      return <div className="habit-list">No Habits Defined</div>;
    }

    return <div className="habit-list">
      {this.state.habits.filter(h => !h.archived).map(this._renderHabitListItem)}
    </div>;
  },

  _renderHabitListItem(habit) {    
    return <HabitListItem habit={habit} key={habit._id} />
  }
});