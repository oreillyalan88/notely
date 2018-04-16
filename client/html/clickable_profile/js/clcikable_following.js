Template.clickable_following.helpers({

    whoThisProfilesFollows: function(){
        const following = this.whoProfilesFollows

        if(following!=undefined)
        {
            return Meteor.users.find({username: {$in: following}});
        }

        else{
            let whoIFollow = Meteor.users.findOne({_id: Meteor.userId()} ).following
            return Meteor.users.find({username: {$in: whoIFollow}});

        }

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


