const each = require('amp-each');

const Reflux = require('reflux');

const Actions = require('../actions');

const HabitsStore = Reflux.createStore({
  listenables: Actions,

  init() {
    this.habits = JSON.parse(localStorage.getItem('habits') || '[]');
    this.habitsRef = null;
    Actions.changedHabits(this.habits);    
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
    this.trigger(newHabits || []);            
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

  onDeleteHabit(habit) {
    if (!this.habitsRef) return Actions.deleteHabit.failed(new Error('Not Logged In'));  

    this.habitsRef.child(habit._id).remove((err) => {
      if (err) return Actions.deleteHabit.failed(err);

      Actions.deleteHabit.completed();
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


export default HabitsStore;