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
        var URL = UserImages.findOne({username: username}, {userId: userId})
        return URL
    }
    
    
});

Template.picture.events({
    
    "submit .edit-profile":function(event){
        event.preventDefault();

        var file =$('#profileImage').get(0).files[0];
        console.log(file)
        if(file){
            
            fsFile = new FS.File(file);
            
            ProfileImages.insert(fsFile, function(err, result){
                if(err){
                    throw new Meteor.Error(err);
                }else{
                    var imageLocation = '/cfs/files/ProfileImages/'+result._id
                    var temp_id = Meteor.userId()
                    var tempImageId=UserImages.findOne({userId:temp_id},{userId: 0,username:0,image:0})
                    
                    // console.log(temp_id)
                    // console.log(imageLocation)
                      UserImages.update(
                          {_id: tempImageId._id},
                          {$set: {
                            image: imageLocation
                            }
                          }
                        ),
                        
                    Meteor.call("updateAllPostImages", temp_id, imageLocation)


                    Router.go('/     ')
                    Bert.alert("Profile Image Update Succesfull!", "success", "growl-top-right")
                }
            })          
            
            
        }
        
        return false //prevent form submit
    }
    
    
    
})