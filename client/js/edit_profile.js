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
    "submit.update_profile": function(event) {

        // console.log('memememe')
        var current = trimInput(event.target.current.value)
        var password = trimInput(event.target.newpassword.value);
        var password2 = trimInput(event.target.password2.value);
        console.log("c"+current,"p"+password,"p2"+password2)

        if (
             isNotEmpty(current)
             &&
            isValidPassword(current)
            && isNotEmpty(password)
            && isNotEmpty(password2)
            && areValidPasswords(password, password2)
        ) {

            Accounts.changePassword(current, password, function(error) {
                if (error) {
                    Bert.alert("Your current password is incorrect!"+error, "danger", "growl-top-right")
                } else {
                    Bert.alert("Your password has been changed!", "success", "growl-top-right")
                    event.target.current.value = "";
                    event.target.newpassword.value = "";
                    event.target.password2.value = "";

                }
            });

        }
        return false;
    }
    
})