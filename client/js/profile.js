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
    
    
    
    
});

Template.profile.events({
    "click #delete-post": function(){
        Meteor.call("removePost", this._id)
        Bert.alert("Post Deleted", "success", "growl-top-right")

    }
})