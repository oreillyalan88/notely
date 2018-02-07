Template.posts.rendered = function() {
    
    $("#posts-link").addClass('selected')
    $("#profile-link").removeClass('selected')
    $("#rankings-link").removeClass('selected')
    $("#search-link").removeClass('selected')
    $("#login-link").removeClass('selected')
    
}

Template.posts.helpers({
    posts: function() {
        var posts = Posts.find({},
        {
            sort: {createdAt:-1}
            
        }
        );
        return posts
    }
    
    
})

Template.posts.events({
    
    "click #upvote": function(){
        Bert.alert("You clicked up!", "success", "growl-top-right")
        
    },
    
    "click #downvote": function(){
        Bert.alert("You clicked down!", "success", "growl-top-right")
    }
    
    
})