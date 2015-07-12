const React = require('react');

const Reflux = require('reflux');

const Actions = require('../actions');

const habitsStore = require('../stores/habits-store');

const map = require('amp-map');

const HabitListItem = React.createClass({
  mixins: [    
    Reflux.connect(habitsStore, 'habits')
  ],

  getInitialState() {
    return {
      title: this.props.habit.title
    };
  },

  _remove() {
      Actions.archiveHabit(this.props.habit);
  },

  _titleChanged(e) {
    this.props.habit.title = e.target.value;
    Actions.updateHabit(this.props.habit);
  },

  _difficultyChanged(e) {
    Actions.patchHabit(this.props.habit._id, {difficulty: e.target.value});
  },

  _titleBlurred(e) {
    let newTitle = e.target.value;
    if (!newTitle) {
      console.log(this.props.habit);
      Actions.deleteHabit(this.props.habit);
    }
  },

  _recordSuccess(e) {
    Actions.recordHabitSuccess(this.props.habit);
  },

  _recordFailure(e) {
    Actions.recordHabitFailure(this.props.habit);
  },

  render() {
    let habit = this.props.habit;
    let now = new Date();
    let today = [now.getFullYear(),
       ('0' + now.getMonth()).substr(0, 2),
       ('0' + now.getDate()).substr(0,2)].join('-');

    let activities = habit.activities || {};

    let currentCount = activities[today] || 0;

    return <div key={habit._id} className="habit-list-item">
      <input value={habit.title} onChange={this._titleChanged} onBlur={this._titleBlurred}/>
      <button onClick={this._remove} className="delete">x</button>
      <div className="statuses">
        <button onClick={this._recordSuccess}>+</button>
        <span className="day-success-tally">{currentCount}</span>
        <button onClick={this._recordFailure} disabled={currentCount === 0}>-</button>
      </div>
      <div className="difficulty">
      <label for="difficulty">Difficulty</label>
        <select id="difficulty" value={habit.difficulty} onChange={this._difficultyChanged}>
          <option value="1">Easy</option>
          <option value="3">Challenging</option>
          <option value="5">Difficult</option>
        </select>
      </div>
      <div className="activities">
      {map(habit.activities, (count, day) => {
        return <div className="activity" key={day}>{day} {count}</div>;
      })}
      </div>
    </div>;
  }
});

export default HabitListItem;