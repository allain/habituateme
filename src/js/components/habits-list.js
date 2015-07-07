const React = require('react');
const Reflux = require('reflux');

const Actions = require('../actions');

const habitsStore = require('../stores/habits-store');

const HabitsList = React.createClass({
  mixins: [Reflux.connect(habitsStore, 'habits')],

  getInitialState() {
    return {
      habits: []
    };
  },

  render() {
    const habits = this.state.habits;
    
    if (habits.length === 0) {
      return <div>No Habits Defined</div>;
    }

    return <div>
      {habits.map(this._renderHabitListItem)}
    </div>;
  },

  _renderHabitListItem(habit) {
    let _remove = function() {
      Actions.deleteHabit(habit);
    };

    let _changeTitle = function(e) {
      habit.title = e.target.value;
      
      Actions.updateHabit(habit);
    };
    return <div key={habit._id}><input value={habit.title} onChange={_changeTitle} /> <button onClick={_remove}>x</button></div>;
  }
});

export default HabitsList;