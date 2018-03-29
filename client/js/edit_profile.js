Template.edit_profile.rendered = function() {
    
}

Template.edit_profile.helpers({
    
    tab: function() {
    return Template.instance().currentTab.get();
    },
    
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

    
 
    
});

Template.edit_profile.events({
    "click #dupdate_profile": function(){
  
        Meteor.call("removePost", this._id)
        Bert.alert("Post Deleted", "success", "growl-top-right")

    },
    
    
})