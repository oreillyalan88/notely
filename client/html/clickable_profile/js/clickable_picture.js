Template.clickable_picture.events({

    'click #follow': function() {

        var userId = Meteor.userId()
        var currentUserName = Meteor.user().username
        var currentProfilesUserName = this.profileOwner.username
        var currentProfilesUserId = this.profileOwner._id



        //me
        Meteor.call("follow",userId, currentProfilesUserName)
        //profile
        Meteor.call("followers",currentProfilesUserId, currentUserName)

        Bert.alert("You are now following:" +currentProfilesUserName+"", "success", "growl-top-right");

        return false;
    },

    'click #unfollow': function() {

        var userId = Meteor.userId()
        var currentUserName = Meteor.user().username
        var currentProfilesUserName = this.profileOwner.username
        var currentProfilesUserId = this.profileOwner._id



        //me
        Meteor.call("unfollow",userId, currentProfilesUserName)
        //profile
        Meteor.call("removeFollower",currentProfilesUserId, currentUserName)

        Bert.alert("You are now unfollowing:" +currentProfilesUserName+"", "success", "growl-top-right");

        return false;
    },



})

Template.clickable_picture.helpers({

    doIFollow: function(){

        let follows = Meteor.users.find({
                $and: [
                    {_id: Meteor.userId()},
                    {following:  this.profileOwner.username}
                    ]
        }).count()


        if(follows==1){
            return true
        }

    },

    isCurrentUsersProfile: function(){
        let currentUser = Meteor.users.findOne({username:  this.profileOwner.username}).username


        if (currentUser == Meteor.user().username) {
            console.log(currentUser)
            console.log(Meteor.user().username)
            return true
        }
    }




})