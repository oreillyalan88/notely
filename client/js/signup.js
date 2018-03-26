Template.signup.rendered = function(){

}

Template.signup.events({
   "submit.form-signup": function(event){
       var username = trimInput(event.target.username.value);
       var email = trimInput(event.target.email.value);
       var password = trimInput(event.target.password.value);
       var password2 = trimInput(event.target.password2.value);

       if(isNotEmpty(email) 
       && isNotEmpty(username)
       && isNotEmpty(password)
       && isEmail(email) 
       && areValidPasswords(password, password2))
       
       {
           
 
                        
      Accounts.createUser({
          username: username,
          email: email,
          password: password,
          profile:{
              upScore:0,
              downScore:0,
              voted:[],
              

              
          }
      }, function(err){
          if (err){
              Bert.alert(err.reason, "danger", "growl-top-right")
              
          } else {
                UserImages.insert({
                userId: Meteor.userId(),
                username: username,
                image: 'https://bootdey.com/img/Content/user_1.jpg',
                        })
                        ,
              Bert.alert("Account Created, You are now logged in", "success", "growl-top-right")
              Router.go("/posts")
          }
          
      });    
           
     }
       return false;
       
   } 
});


//validation rules


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