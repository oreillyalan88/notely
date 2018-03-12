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
        var thisUser = Meteor.userId();
        var thisPost = Posts.findOne({_id: this._id})._id
        var postAuthor = Posts.findOne({_id: this._id}).userId
        var Name = Meteor.user().username;
        var thisPostsVotes = Posts.findOne({_id: this._id},{voted: {$in: Name}}).voted;
        // console.log(thisUser)
        console.log(thisPostsVotes)
        
        if(thisPostsVotes.indexOf(Name)>-1){
            Bert.alert("You Cannot Vote Twice", "danger", "growl-top-right");
            //in the array
            
         }else{
            //do stuff
            Meteor.call("countVotes", thisPost, Name)
            Meteor.call("userUpVotePoint",postAuthor)
            Meteor.call("upVote",thisUser, thisPost)

            Bert.alert("You Vote Was Placed", "success", "growl-top-right");
        }
        
        if (Name == thisPostsVotes){
            Bert.alert("You Cannot Vote For Your Own Post", "danger", "growl-top-right")
            
        }
    },
    
    "click #downvote": function(){
        
        var thisUser = Meteor.userId();
        var thisPost = Posts.findOne({_id: this._id})._id
        var postAuthor = Posts.findOne({_id: this._id}).userId
        var Name = Meteor.user().username;
        var thisPostsVotes = Posts.findOne({_id: this._id},{voted: {$in: Name}}).voted;
        // console.log(thisUser)
        //console.log(thisPostsVotes)
        
        if(thisPostsVotes.indexOf(Name)>-1){
            Bert.alert("You Cannot Vote Twice", "danger", "growl-top-right");
            //in the array
            
         }else{
            //do stuff
            Meteor.call("countVotes", thisPost, Name)
            Meteor.call("userDownVotePoint",postAuthor)
            Meteor.call("downVote",thisUser, thisPost)

            Bert.alert("You Vote Was Placed", "success", "growl-top-right");
        }
        
        if (Name == thisPostsVotes){
            Bert.alert("You Cannot Vote For Your Own Post", "danger", "growl-top-right")
            
        }
    }
    
    
})