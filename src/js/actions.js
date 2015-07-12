const Reflux = require('reflux');

const Firebase = require('firebase');

const firebaseRef = new Firebase('https://habituate.firebaseio.com');

const Actions = Reflux.createActions({
    'init': {},
    'login': {children: ['completed','failed']},
    'logout': {children: ['completed','failed']},
    'changedUser': {},
    'changedHabits': {},
    'addHabit': {children: ['completed', 'failed']},
    'archiveHabit': {children: ['completed', 'failed']},
    'updateHabit': {children: ['completed', 'failed']},
    'patchHabit': {children: ['completed', 'failed']},
    'recordHabitSuccess': {children: ['completed', 'failed']},  
    'recordHabitFailure': {children: ['completed', 'failed']}   
});

window.actions = Actions;

firebaseRef.onAuth(function(newAuth) {
  if (newAuth) {
    newAuth.ref = firebaseRef.child('users').child(newAuth.uid);    
  }

  Actions.changedUser(newAuth);  
});

Actions.login.listen(function() {
  firebaseRef.authWithOAuthPopup('google', (err, authData) => {
    if (err) return this.failed(err);    

    this.completed();
  });
});

Actions.logout.listen(function() {
  firebaseRef.unauth();
  this.completed();
});

export default Actions;