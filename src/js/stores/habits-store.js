import each from 'amp-each';
import Reflux from 'reflux';
import Actions from '../actions';

export default Reflux.createStore({
  listenables: Actions,

  init() {
    this.habits = JSON.parse(localStorage.getItem('habits') || '[]');
    this.habitsRef = null;   
  },

  getInitialState() {
    return this.habits || [];
  },

  onChangedUser(user) {
    if (this.habitsRef) {
      this.habitsRef.off();
      this.habitsRef = null;
    }

    if (user) {
      this.habitsRef = user.ref.child('habits');      
      this.habitsRef.on('value', (snapshot) => {
        this.habits = flatten(snapshot.val());
        localStorage.setItem('habits', JSON.stringify(this.habits));
        Actions.changedHabits(this.habits);
      });      
    } else {
      this.habits = [];
      localStorage.setItem('habits', '[]');
      Actions.changedHabits(this.habits);
    }    
  },

  onChangedHabits(newHabits) {
    this.trigger(this.habits || []);            
  },

  onAddHabit(newHabit) {
    if (!this.habitsRef) return Actions.addHabit.failed(new Error('Not Logged In'));

    this.habitsRef.push(newHabit, (err) => {
      if (err) return Actions.addHabit.failed(err);

      Actions.addHabit.completed();
    });
  },

  onUpdateHabit(habit) {  
    if (!this.habitsRef) return Actions.updateHabit.failed(new Error('Not Logged In'));    


    let habitId = habit._id;
    delete habit._id;

    this.habitsRef.child(habitId).update(habit, (err) => {
      if (err) return Actions.updateHabit.failed(err);

      Actions.updateHabit.completed();
    });
  },

  onPatchHabit(habitId, props) {  
    if (!this.habitsRef) return Actions.patchHabit.failed(new Error('Not Logged In'));    


    this.habitsRef.child(habitId).update(props, (err) => {
      if (err) return Actions.patchHabit.failed(err);

      Actions.patchHabit.completed();
    });
  },

  onArchiveHabit(habit) {
    if (!this.habitsRef) return Actions.archiveHabit.failed(new Error('Not Logged In'));  

    this.habitsRef.child(habit._id).update({archived: Date.now()}, (err) => {
      if (err) return Actions.archiveHabit.failed(err);

      Actions.archiveHabit.completed();
    });
  },

  onRecordHabitSuccess(habit) {
    habit.activities = habit.activities || {};

    let now = new Date();
    let today = [now.getFullYear(),
       ('0' + (now.getMonth() + 1)).substr(-2),
       ('0' + now.getDate()).substr(-2)].join('-');


    let count = habit.activities[today] || 0;
    count ++;    

    this.habitsRef.child(habit._id).child('activities').child(today).set(count, (err) => {      
      if (err) return Actions.recordHabitSuccess.failed(err);

      Actions.recordHabitSuccess.completed();
    });
  },

  onRecordHabitFailure(habit) {
    habit.activities = habit.activities || {};

    let now = new Date();
    let today = [now.getFullYear(),
       ('0' + (now.getMonth() + 1)).substr(-2),
       ('0' + now.getDate()).substr(-2)].join('-');

    let count = habit.activities[today] || 0;
    count --;    

    this.habitsRef.child(habit._id).child('activities').child(today).set(count, (err) => {      
      if (err) return Actions.recordHabitSuccess.failed(err);

      Actions.recordHabitSuccess.completed();
    });
  }
});

function flatten(obj) {
  var result = [];

  each(obj, function(val, k) {
    val._id = k;
    result.push(val);
  });

  return result;
}