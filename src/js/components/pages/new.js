import React from 'react/addons';
import Reflux from 'reflux';
import Actions from '../../actions';
import {Link} from 'react-router';

import habitsStore from '../../stores/habits-store';

import {Paper, TextField, SelectField, RaisedButton} from 'material-ui';

let difficultyOptions = [
  {text: 'Very Easy', payload: '1'},
  {text: 'Easy', payload: '2'},
  {text: 'Challenging', payload: '3'},
  {text: 'Hard', payload: '4'},
  {text: 'Very Hard', payload: '5'}
];

export default React.createClass({
  mixins: [
    React.addons.LinkedStateMixin,    
  ],

  _add: function() {
    Actions.addHabit({ 
      title: this.state.title, 
      difficulty: this.state.difficulty 
    });

    this.context.router.transitionTo('home');
  },  

  _cancel: function() {
    this.context.router.transitionTo('home');
  },  

  getInitialState() {
    return {
      title: '',
      difficulty: 3
    };
  },

  render() {
    return <Paper style={{margin: '20px', padding: '20px'}}>      
      <h1 style={{marginBottom: 0}}>New Habit</h1>
      <div>        
        <TextField valueLink={this.linkState('title')} floatingLabelText="Habit Title"/>
      </div>
      <div>
        <SelectField
         valueLink={this.linkState('difficulty')}
        floatingLabelText="Difficulty"        
        menuItems={difficultyOptions} />
      </div>
      <div>
        <RaisedButton label="Cancel" onClick={this._cancel} />
        <RaisedButton onClick={this._add} primary={true} label="Create" style={{float: 'right'}}/>
      </div>        
    </Paper>;    
  },

  contextTypes: {
    router: React.PropTypes.func
  }
});
