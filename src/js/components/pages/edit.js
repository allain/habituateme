import React from 'react/addons';
import Reflux from 'reflux';
import Actions from '../../actions';
import {Link} from 'react-router';

import habitsStore from '../../stores/habits-store';

import {Paper, TextField, SelectField, RaisedButton, FlatButton, IconButton, Dialog} from 'material-ui';

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
    Reflux.connectFilter(habitsStore, "habit", function(habits) {
        return habits.filter((habit) => { 
          return habit._id === this.props.params.habitId 
        })[0];
    })
  ],

  render() {
    let title = this.state.newTitle || this.state.habit.title;
    let difficulty = '' + (this.state.newDifficulty || this.state.habit.difficulty);
    
    return <Paper style={{margin: '20px', padding: '20px'}}>
      <h1 style={{marginTop: 0}}>Update Habit</h1>  
      <div>        
        <TextField value={title} onChange={this._titleChanged} floatingLabelText="Habit Title"/>
      </div>
      <div>
        <SelectField
        value={difficulty}
        onChange={this._difficultyChanged}
        floatingLabelText="Difficulty"        
        menuItems={difficultyOptions} />
      </div>
      <div>
        <RaisedButton onClick={this._update} primary={true} style={{float: 'right'}} label="Update" />
        <RaisedButton label="Cancel" onClick={this._cancel} style={{float: 'right', marginRight: '10px'}} />
        
        <IconButton 
          iconClassName="material-icons" 
          tooltipAlignment="bottom-center" 
          tooltip="Delete" 
          touch={true} 
          onClick={this._confirmDelete}>delete</IconButton>      
      </div>
     
      <Dialog
        title="Delete Habit"
        actions={[
          <FlatButton label="No" onClick={this._cancelDelete} />,
          <FlatButton label="Yes" primary={true} onClick={this._delete} ref="delete" />
        ]}
        actionFocus="delete"
        modal={true}
        ref="deleteConfirm">
        Really Delete Habit?
      </Dialog>
    </Paper>;
  },

  _cancel() {
    this.context.router.transitionTo('root');
  },

  _update() {
    Actions.patchHabit(this.props.params.habitId, { 
      title: this.state.newTitle || this.state.habit.title, 
      difficulty: this.state.newDifficulty || this.state.habit.difficulty 
    });

    this.context.router.transitionTo('home');
  },

  _confirmDelete() {
    this.refs.deleteConfirm.show();
  },

  _cancelDelete() {
    this.refs.deleteConfirm.dismiss();
  },


  _delete() {      
    Actions.archiveHabit(this.state.habit);

    this.context.router.transitionTo('home');
  },

  _titleChanged(e) {
    let newTitle = e.target.value;
    this.setState({
      newTitle: newTitle
    });
  },


  _difficultyChanged(e) {    
    let newDifficulty = e.target.value.payload;
    
    this.setState({
      newDifficulty: newDifficulty
    });
  },

  contextTypes: {
    router: React.PropTypes.func
  }
});