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
 isValidPassword = function(password){
    if(password.length<6){
        Bert.alert("Password must be at least 6 characthers", "danger",  "growl-top-right")
        return false;
    }
    return true;
}

//check password match

 areValidPasswords = function(password, confirm){
    if(!isValidPassword(password)){
        return false
    }
    
    if(password !== confirm){
        Bert.alert("Password do not match", "danger",  "growl-top-right")
        return false;
    }
    
    return true;
}