const Reflux = require('reflux');

const Actions = require('../actions');

const UserStore = Reflux.createStore({
    listenables: Actions,

    onChangedUser: function(newUser) {
      if (!newUser) {
        return this.trigger(null);
      }

      if (newUser.provider === 'google') {
        let profile = newUser.google.cachedUserProfile;

        this.trigger({
          uid: newUser.uid,
          fullName: newUser.google.displayName,
          firstName: profile.given_name,
          lastName: profile.family_name,
          pic: newUser.google.profileImageURL
        });
      } else {
        this.trigger(newUser);      
      }
    }
});

export default UserStore;