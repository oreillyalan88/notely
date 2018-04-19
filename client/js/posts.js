Template.posts.onCreated( function() {
    this.currentTab = new ReactiveVar( "createdAt" );
});

Template.posts.rendered = function() {
    
    $("#posts-link").addClass('selected')
    $("#profile-link").removeClass('selected')
    $("#rankings-link").removeClass('selected')
    $("#search-link").removeClass('selected')
    $("#login-link").removeClass('selected')
    
}

Template.posts.helpers({


    tab: function() {
        return Template.instance().currentTab.get();
    },

    postOwner:function(){

        var postOwner =  this.userId
        var thisUser = Meteor.userId()

        console.log(postOwner,thisUser)
        if (postOwner == thisUser){
            return true
        }
        else return false

    },
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
    },

    "click #deletePostButton": function (event, template) {
        var postId = this._id

        swal({
                title: "Are you sure?",
                // text: "You will not be able to recover this file!",
                type: "warning",
                showCancelButton: true,
                confirmButtonClass: "btn-danger",
                confirmButtonText: "Yes, delete it!",
                cancelButtonText: "No, cancel!",
                closeOnConfirm: true,
                closeOnCancel: true
            },
            function(isConfirm) {
                if (isConfirm) {

                    console.log(postId)

                    Meteor.call('removePost', postId, function (err) {
                            if (err) {
                                Bert.alert("Error Occurred", "danger", "growl-top-right")
                            }

                            else {
                                Bert.alert("Post Removed", "success", "growl-top-right")
                            }

                        }
                    )
                }
            });


        return false;



    },

    "click #adminDeletePostButton": function (event, template) {
        var postId = this._id

        swal({
                title: "Are you sure?",
                // text: "You will not be able to recover this file!",
                type: "warning",
                showCancelButton: true,
                confirmButtonClass: "btn-danger",
                confirmButtonText: "Yes, delete it!",
                cancelButtonText: "No, cancel!",
                closeOnConfirm: true,
                closeOnCancel: true
            },
            function(isConfirm) {
                if (isConfirm) {

                    console.log(postId)

                    Meteor.call('removePost', postId, function (err) {
                            if (err) {
                                Bert.alert("Error Occurred", "danger", "growl-top-right")
                            }

                            else {
                                Bert.alert("Post Removed", "success", "growl-top-right")
                            }

                        }
                    )
                }
            });


        return false;


    },
    'click .nav-pills li': function( event, template ) {
        var currentTab = $( event.target ).closest( "li" );

        currentTab.addClass( "active" );
        $( ".nav-pills li" ).not( currentTab ).removeClass( "active" );

        template.currentTab.set( currentTab.data( "template" ) );
    }



    
    
})