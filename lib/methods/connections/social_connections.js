if(Meteor.isServer){
    Meteor.methods({


        follow: function (userId, userToFollow) {
            if (!Meteor.userId()) {
                throw new Meteor.Error('not authorized')
                this.stop();
                return false;

            } else {
                Meteor.users.update(userId, {$addToSet: {'following': userToFollow}});

            }
        },

        followers: function (userId, follower) {
            if (!Meteor.userId()) {
                throw new Meteor.Error('not authorized')
                this.stop();
                return false;

            } else {
                Meteor.users.update(userId, {$addToSet: {'follower': follower}});

            }
        },



        unfollow: function (userId, userToUnFollow) {
            if (!Meteor.userId()) {
                throw new Meteor.Error('not authorized')
                this.stop();
                return false;

            } else {
                Meteor.users.update(userId, {$pull: {following: userToUnFollow}});

            }
        },

        removeFollower: function (userId, follower) {
            if (!Meteor.userId()) {
                throw new Meteor.Error('not authorized')
                this.stop();
                return false;

            } else {
                Meteor.users.update(userId, {$pull: {follower:  follower}});

            }
        },



    })}