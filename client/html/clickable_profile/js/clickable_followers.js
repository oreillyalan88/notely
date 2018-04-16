Template.clickable_followers.helpers({

    thisProfilesFollowers: function(){
        const followers = this.profilesFollowers

        if (followers!=undefined) {
            return Meteor.users.find({username: {$in: followers}});

        }

        else {
            let myFollowers = Meteor.users.findOne({_id: Meteor.userId()} ).follower
            return Meteor.users.find({username: {$in: myFollowers}});


        }

    }



});

Template.clickable_followers.events({

    'click #default': function(event, template) {
        let username = this.username
        $('#details').click();
        Router.go("/"+username+"/profile")



    }


})


Template.registerHelper('thisFollowersProfilePic', function(username) {
    let mup= UserImages.findOne({username:username}).image
    return mup
    }
)