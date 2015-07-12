const React = require('react/addons');
const Reflux = require('reflux');

const Actions = require('../actions');

const userStore = require('../stores/user-store');

const HabitsList = require('./habit-list');
const HabitAdder = require('./habit-adder');

const App = React.createClass({
  mixins: [Reflux.connect(userStore, 'user')],

  render() {
    const user = this.state.user;

    if (!user) {
      return <button onClick={Actions.login}>Login</button>;
    }

    return <div>
      <div>
        Welcome {user.firstName} <img src={this.state.user.pic} width="16" height="16" />
        <button onClick={Actions.logout}>Logout</button>
      </div>
      <HabitAdder />
      <HabitsList />
    </div>
  }
});

export default App;