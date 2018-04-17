Template.clickable_following.helpers({

    whoThisProfilesFollows: function(){
        const following = this.whoProfilesFollows
        let username = this.profileOwnerUserName


        if(username==undefined)
        {

            let whoIFollow = Meteor.users.findOne({_id: Meteor.userId()} ).following

            if (whoIFollow!=undefined || whoIFollow.length>0) {
                return Meteor.users.find({username: {$in: whoIFollow}});
            }

            else{
                return false
            }
        }

        else{

            if(following !=undefined ||following.length>0 ) {
                return Meteor.users.find({username: {$in: following}});
            }
            else{
                return false
            }
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


