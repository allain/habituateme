const React = require('react/addons');
const Reflux = require('reflux');

const habitsStore = require('../stores/habits-store');

const HabitListItem = require('./habit-list-item.js');

const HabitsList = React.createClass({
  mixins: [
    React.addons.LinkedStateMixin,
    Reflux.connect(habitsStore, 'habits')
  ],

  getInitialState() {
    return {
      habits: []
    };
  },

  render() {
    if (this.state.habits.length === 0) {
      return <div className="habit-list">No Habits Defined</div>;
    }

    return <div className="habit-list">
      {this.state.habits.filter(h => !h.archived).map(this._renderHabitListItem)}
    </div>;
  },

  _renderHabitListItem(habit) {    
    return <HabitListItem habit={habit}/>
  }
});

export default HabitsList;