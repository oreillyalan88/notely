Template.clickable_followers.helpers({

    thisProfilesFollowers: function(){
        console.log(this.profilesFollowers)
        const followers = this.profilesFollowers

        return Meteor.users.find({username: {$in: followers}});


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