Tracker.autorun(function(){
    // if(Meteor.userId()){
    //     Router.go("/posts");
    // }
})

Template.login.helpers({
    getEmail() {
        return Meteor.user().emails && Meteor.user().emails[0].address;
    },


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

    'click [data-social-login]' ( event, template ) {
        const service = event.target.getAttribute( 'data-social-login' ),
            options = {
                requestPermissions: [ 'email' ]
            };

        if ( service === 'loginWithTwitter' ) {
            delete options.requestPermissions;
        }

        Meteor[ service ]( options, ( error ) => {
            if ( error ) {
                Bert.alert( error.message, 'danger' );
            }else{

                let profile = Meteor.user().services;

                if (profile.twitter){
                    console.log('Twitter')
                    if(!Meteor.user().profile.upScore){
                        var img_url = profile.twitter.profile_image_url;
                        img_url = img_url.replace(/_normal/g, "");
                        let username = profile.twitter.screenName;
                        let fullName = Meteor.user().profile.name;
                        Meteor.call('TwitterUserObjectScaffold', Meteor.userId(), username, img_url, fullName)
                        Bert.alert("Account Created, You are now logged in", "success", "growl-top-right")
                        Router.go("/posts")
                    }
                     else {
                        Bert.alert("Account Created, You are now logged in", "success", "growl-top-right")
                        Router.go("/posts")
                    }


                }else if (profile.google){
                    console.log('Google')

                    if(!Meteor.user().profile.upScore){

                        let img_url = profile.google.picture;
                        var email = profile.google.email
                        var username = email.substring(0, email.lastIndexOf("@"));
                        let fullName = Meteor.user().profile.name;
                        // console.log(username,fullName)

                        var temp = username;
                        console.log(temp)
                        if (checkIfUserExists(temp)){
                            var append = makeId()
                            temp = temp+append
                            console.log(temp)
                            Bert.alert("The username on your social media account already exists, a random username has been chose for you "+username, "danger", "growl-top-right")
                        }

                        Meteor.call('GoogleUserObjectScaffold', Meteor.userId(), temp, img_url, fullName)
                        Bert.alert("Account Created, You are now logged in", "success", "growl-top-right")
                        Router.go("/posts")
                    }
                    else {
                        Bert.alert("Account Created, You are now logged in", "success", "growl-top-right")
                        Router.go("/posts")
                    }

                }else if (profile.github){
                    console.log('Git')

                }
            }

        });

        return false; // prevent submit for form validation
    }

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

var checkIfUserExists= function (username) {
    return (Meteor.users.findOne({username: username})) ? true : false;
}


var makeId = function() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < 5; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}