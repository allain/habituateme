const React = require('react/addons');

const Reflux = require('reflux');

const Actions = require('../actions');

const habitsStore = require('../stores/habits-store');

const HabitAdder = React.createClass({
  mixins: [
    React.addons.LinkedStateMixin,
    Reflux.connect(habitsStore, 'habits')
  ],

  getInitialState() {
    return {
      newTitle: ''
    };
  },

  _add: function() {
    Actions.addHabit({ title: this.state.newTitle });

    this.setState({
      newTitle: ''
    });
  },

  render() {
    return <div>
      <input valueLink={this.linkState('newTitle')} />
      <button onClick={this._add}>Add</button>
    </div>;
  }
});

export default HabitAdder;