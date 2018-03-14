Template.registerHelper('userImages', function(){
        var username = Meteor.user().username
        var userId = Meteor.userId();
        var URL = UserImages.findOne({username: username}, {userId: userId})
        return URL
    

});




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