Template.picture.rendered = function() {

    this.autorun(function(){
        Template.currentData();
    });


}

Template.picture.helpers({
    
    
    email: function(){
      if(!Meteor.user()){
          Bert.alert("Your Are Not Logged In, Permission Denied", "danger", "growl-top-right")
          return false;
          
      }  else {
          return Meteor.user().emails[0].address;
      }
    },
    
    username: function(){
        if(!Meteor.user()){
          Bert.alert("Your Are Not Logged In, Permission Denied", "danger", "growl-top-right")
          return false;
          
      }  else {
          return Meteor.user().username;
      }
    },
    
    userPosts: function(){
        var username = Meteor.user().username;
        var userId = Meteor.userId();
        var userPosts = Posts.find({userId: userId}, {},{sort: {createdAt: -1}});
        return userPosts;
    },
    
    
    userUpScore: function(){
        return Meteor.user().profile.upScore;
    },
    
        
    userDownScore: function(){
         return Meteor.user().profile.downScore;

    },
    
    userImages: function(){
        var username = Meteor.user().username
        var userId = Meteor.userId();
        var URL = UserImages.findOne({username: username}, {userId: userId}).image
        return URL
    }
    
    
});

Template.picture.events({


    'change .your-upload-class': function(event) {
        event.preventDefault();

        FS.Utility.eachFile(event, function(file) {

            var newFile = new FS.File(file);
            console.log(newFile)
            newFile.metadata = {
                createdBy:Meteor.userId(),
            }

            ProfileImages.insert(newFile, function (err, fileObj) {

                if (err){
                    // handle error
                } else {

                    var currentUserId = Meteor.userId();
                    var intervalHandle = Meteor.setInterval(function () {
                        console.log("Inside interval");

                        // changes here:


                        if (fileObj.hasStored("profileImages")) {
                            //checked if image was stored

                            console.log('here'+ currentUserId)
                            var imagesURL = '/cfs/files/ProfileImages/' + fileObj._id + '/' + fileObj.name()
                            var tempImageId = UserImages.findOne({
                                userId:currentUserId
                            })

                            UserImages.update(
                                {_id: tempImageId._id},
                                {
                                    $set: {
                                        image: imagesURL
                                    }
                                }
                            );
                            Meteor.call("updateAllPostImages", currentUserId, imagesURL)
                            Bert.alert("Profile Image Update Successful!", "success", "growl-top-right")
                            // // if file has stored, stop interval
                            Meteor.clearInterval(intervalHandle);
                        }
                    }, 1);

                }



            });

        });
    }





        })




