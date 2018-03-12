Template.profile.rendered = function() {
    
    $("#profile-link").addClass('selected')
    $("#posts-link").removeClass('selected')
    $("#rankings-link").removeClass('selected')
    $("#search-link").removeClass('selected')
    $("#login-link").removeClass('selected')
    
}

Template.profile.helpers({
    
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

Template.profile.events({
    "click #delete-post": function(){
        Meteor.call("removePost", this._id)
        Bert.alert("Post Deleted", "success", "growl-top-right")

    },
    
    "submit .edit-profile":function(event){
        var file =$('#profileImage').get(0).files[0];
        
        if(file){
            
            fsFile = new FS.File(file);
            
            ProfileImages.insert(fsFile, function(err, result){
                if(err){
                    throw new Meteor.Error(err);
                }else{
                    var imageLocation = '/cfs/files/ProfileImages/'+result._id
                    
                        UserImages.update(
                          Meteor.userId(),
                          {$set: {
                            username: Meteor.user().username,
                            image: imageLocation
                            }
                          }
                        ) 
                    // document.location.reload(true);
                    Bert.alert("Profile Image Update Succesfull!", "success", "growl-top-right")
                }
            })          
            
            
        }
        
        return false //prevent form submit
    }
    
    
    
})