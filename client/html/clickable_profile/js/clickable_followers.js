Template.clickable_followers.helpers({

    thisProfilesFollowers: function(){
        const followers = this.profilesFollowers

        return Meteor.users.find({username: {$in: followers}});


    }



});



Template.registerHelper('thisFollowersProfilePic', function(username) {
    console.log(username)
    let mup= UserImages.findOne({username:username}).image
    console.log(mup)
    return mup
    }
)