Template.registerHelper('userImages', function(){
        var username = Meteor.user().username
        var userId = Meteor.userId();
        var URL = UserImages.findOne({username: username}, {userId: userId})
        return URL
    

});


Template.registerHelper('slugify', function(text) {
 return text.toString().toLowerCase()
    .replace(/\s+/g, '-')           // Replace spaces with -
    .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
    .replace(/\-\-+/g, '-')         // Replace multiple - with single -
    .replace(/^-+/, '')             // Trim - from start of text
    .replace(/-+$/, '');            // Trim - from end of text

    
}
)


slugify = function(text) {
    return text.toString().toLowerCase()
        .replace(/\s+/g, '-')           // Replace spaces with -
        .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
        .replace(/\-\-+/g, '-')         // Replace multiple - with single -
        .replace(/^-+/, '')             // Trim - from start of text
        .replace(/-+$/, '');            // Trim - from end of text


}

//validation rules

//Trim Helper
trimInput = function(val){
    return val.replace(/^\s*|\s*$/g, "") //if these values are found, replace with empty string
}

 isNotEmpty = function(val){
    if(val && val !== ''){
        return true;
    }
    Bert.alert("Please fill in all fields", "danger", "growl-top-right")
    return false;
}

//validate email
 isEmail = function(val){
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

 checkIfUserExists= function (username) {
    return (Meteor.users.findOne({username: username})) ? true : false;
}


 makeId = function() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < 5; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}

titleCase = function(str) {
    var splitStr = str.toLowerCase().split(' ');
    for (var i = 0; i < splitStr.length; i++) {
        // You do not need to check if i is larger than splitStr length, as your for does that for you
        // Assign it back to the array
        splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
    }
    // Directly return the joined string
    return splitStr.join(' ');
}

Template.registerHelper({
    "click #myFunction": function(){
            console.log('here')
       var x = document.getElementById("myDIV");
            if (x.style.display === "none") {
                x.style.display = "block";
            } else {
                x.style.display = "none";
            }
    }})
    
    