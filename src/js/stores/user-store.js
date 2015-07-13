const Reflux = require('reflux');

const Actions = require('../actions');

export default Reflux.createStore({
    listenables: Actions,

    init() {      
      this._user = undefined;
    },

    getInitialState() {      
      return this._user;
    },

    onChangedUser: function(newUser) {
      this._user = normalizeUser(newUser);
      this.trigger(this._user);
    }
});

function normalizeUser(newUser) {
  if (!newUser) return null;

  if (newUser.provider !== 'google') throw new Error('Invalid User Provider');

  let profile = newUser.google.cachedUserProfile;
  return {
    uid: newUser.uid,
    fullName: newUser.google.displayName,
    firstName: profile.given_name,
    lastName: profile.family_name,
    pic: newUser.google.profileImageURL
  };
}