Template.clickable_following.helpers({

    whoThisProfilesFollows: function(){
        const following = this.whoProfilesFollows

        return Meteor.users.find({username: {$in: following}});


    }  ,




});

Template.clickable_following.events({

    'click #default': function(event, template) {
        let username = this.username
        $('#details').click();
        Router.go("/"+username+"/profile")



    }


})

Template.registerHelper('thisConnectionsProfilePic', function(username) {
        let mup= UserImages.findOne({username:username}).image
        return mup
    }
)


