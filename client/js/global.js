Template.registerHelper('userImages', function(){
        var username = Meteor.user().username
        var userId = Meteor.userId();
        var URL = UserImages.findOne({username: username}, {userId: userId})
        return URL
    

    
});