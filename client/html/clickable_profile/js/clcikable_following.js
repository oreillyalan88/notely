Template.clickable_following.helpers({

    whoThisProfilesFollows: function(){
        const following = this.whoProfilesFollows

        return Meteor.users.find({username: {$in: following}});


    }



});



Template.registerHelper('thisConnectionsProfilePic', function(username) {
        let mup= UserImages.findOne({username:username}).image
        return mup
    }
)