Tracker.autorun(function(){
    // if(Meteor.userId()){
    //     Router.go("/posts");
    // }
})

Template.login.helpers({
    getEmail() {
        return Meteor.user().emails && Meteor.user().emails[0].address;
    }
});


Template.login.rendered = function(){
    

    
    $("#login-link").addClass('selected')
    $("#posts-link").removeClass('selected')
    $("#search-link").removeClass('selected')
    $("#profile-link").removeClass('selected')
    $("#rankings-link").removeClass('selected')
    
    
    

}

Template.login.events({
    "submit.form-signin": function(event){
        var email = trimInput(event.target.email.value)
        var password = trimInput(event.target.password.value)
        
        if( isNotEmpty(email) &&
            isNotEmpty(password) &&
            isEmail(email) &&
            isValidPassword(password)){
                
                Meteor.loginWithPassword(email, password, function (err) {
                    if(err){
                        Bert.alert(err.reason, "danger", "growl-top-right")
                        return false;
                        
                    } else{
                        Router.go('/posts')
                        Bert.alert("Your Are Now Logged In", "success", "growl-top-right")
                        
                    }
                });
                
                
            }
        
        return false; // prevent submit for form validation
    },

})

//Trim Helper
var trimInput = function(val){
    return val.replace(/^\s*|\s*$/g, "") //if these values are found, replace with empty string
}

var isNotEmpty = function(val){
    if(val && val !== ''){
        return true;
    }
    Bert.alert("Please fill in all fields", "danger", "growl-top-right")
    return false;
}

//validate email
var isEmail = function(val){
    var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if(filter.test(val)){
        return true;
    }
    Bert.alert("Please use a valid email address", "danger", "growl-top-right")
    return false;
}

//check password field
var isValidPassword = function(password){
    if(password.length<6){
        Bert.alert("Password must be at least 6 characthers", "danger",  "growl-top-right")
        return false;
    }
    return true;
}

//check password match

var areValidPasswords = function(password, confirm){
    if(!isValidPassword(password)){
        return false
    }
    
    if(password !== confirm){
        Bert.alert("Password do not match", "danger",  "growl-top-right")
        return false;
    }
    
    return true;
}