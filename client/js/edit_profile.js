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
    "submit #update_profile": function() {

        var username = trimInput(event.target.username.value);
        var email = trimInput(event.target.email.value);
        var password = trimInput(event.target.password.value);
        var password2 = trimInput(event.target.password2.value);

        if (isNotEmpty(email)
            && isNotEmpty(username)
            && isNotEmpty(password)
            && isEmail(email)
            && areValidPasswords(password, password2)) {


            // Meteor.call("updateProfile", this._id)
            // Bert.alert("Profile Updated", "success", "growl-top-right")

        }

    }
    
})