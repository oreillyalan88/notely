Template.clickable_followers.helpers({

    thisProfilesFollowers: function(){
        let username = this.profileOwnerUserName
       let  myName  = Meteor.user().username

        const followers = this.profilesFollowers


        console.log(followers)
        if (username==undefined ) {
            let myFollowers = Meteor.users.findOne({_id: Meteor.userId()} ).follower

            if(myFollowers!=undefined || myFollowers.length>0){
            return Meteor.users.find({username: {$in: myFollowers}});

        }

        else{
            return false
        }


        }

        else {

            if(followers !=undefined ||followers.length>0 ) {
                return Meteor.users.find({username: {$in: followers}});
            }
            else{
                return false
            }
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