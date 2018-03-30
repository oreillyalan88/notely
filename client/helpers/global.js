Template.registerHelper('userImages', function(){
        var username = Meteor.user().username
        var userId = Meteor.userId();
        var URL = UserImages.findOne({username: username}, {userId: userId})
        return URL
    

});


Template.registerHelper('slugify', function(text) {
    console.log(text)
 return text.toString().toLowerCase()
    .replace(/\s+/g, '-')           // Replace spaces with -
    .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
    .replace(/\-\-+/g, '-')         // Replace multiple - with single -
    .replace(/^-+/, '')             // Trim - from start of text
    .replace(/-+$/, '');            // Trim - from end of text

    
}
)





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
    
    