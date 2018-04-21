Template.commentForm.rendered = function(){
    
}

Template.commentForm.events({
    "submit .comment-post":function(event, template){
        console.log('i am here')
        var tempPostId = template.data._id;
        var commentInput = event.target.commentInput.value;
        var commentId = makeId

        if(isNotEmpty(commentInput)
             ){
                   
            Meteor.call('addComments', commentInput, tempPostId, commentId())
               
              event.target.commentInput.value ="";
                   
              Bert.alert("Your Post Was Successful!", "success", "growl-top-right")
               
         } else {
              Bert.alert("Error Occurred", "danger", "growl-top-right")
                
         }
                        
       
        return false;
        
    },


})
Template.comments.events({
    "click #deleteCommentButton": function (event, template) {
        var userId = Template.parentData(0).userId
        console.log(userId)
        var commentId = this.commentId
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



                    Meteor.call('removeComment', userId, commentId, function (err) {
                            if (err) {
                                Bert.alert("Error Occurred", "danger", "growl-top-right")
                            }

                            else {
                                Bert.alert("Comment Removed", "success", "growl-top-right")
                            }

                        }
                    )

                }
            });

        return false;


    },

    "click #adminDeleteCommentButton": function (event, template) {
        var userId = Template.parentData(0).userId

        var commentId = this.commentId


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



                    Meteor.call('removeComment', userId, commentId, function (err) {
                            if (err) {
                                Bert.alert("Error Occurred", "danger", "growl-top-right")
                            }

                            else {
                                Bert.alert("Comment Removed", "success", "growl-top-right")
                            }

                        }
                    )

                }
            });

        return false;


    },
})


Template.comments.helpers({
    postOwner:function(){

        var postOwner =  Template.parentData(1).userId
        var commentOwner = this.userId
        var thisUser = Meteor.userId()
        console.log(postOwner)
        if (postOwner == thisUser || commentOwner==thisUser){
            return true
        }
        else return false

                       },
    commentersImages:function(){

        var commenter = this.author
        console.log(commenter)

        var userImage= UserImages.findOne({username:commenter}).image

        console.log(userImage)

        return userImage

    },

})

makeId= function() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < 10; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}