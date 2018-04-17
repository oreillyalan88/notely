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
                   
              Bert.alert("Your Post Was Succesful!", "success", "growl-top-right")   
               
         } else {
              Bert.alert("Error Occured", "danger", "growl-top-right")
                
         }
                        
       
        return false;
        
    },


})
Template.comments.events({
    "click #deleteCommentButton": function (event, template) {
        var userId = Meteor.userId()

        var commentId = this.commentId

        Meteor.call('removeComment', userId, commentId, function (err) {
                if (err) {
                    Bert.alert("Error Occurred", "danger", "growl-top-right")
                }

                else {
                    Bert.alert("Comment Removed", "success", "growl-top-right")
                }

            }
        )
        return false;


    },

    "click #adminDeleteCommentButton": function (event, template) {
        var userId = this.userId

        var commentId = this.commentId

        Meteor.call('removeComment', userId, commentId, function (err) {
                if (err) {
                    Bert.alert("Error Occurred", "danger", "growl-top-right")
                }

                else {
                    Bert.alert("Comment Removed", "success", "growl-top-right")
                }

            }
        )
        return false;


    },
})


Template.comments.helpers({
    postOwner:function(){

        var postOwner =  this.userId
        var thisUser = Meteor.userId()

        if (postOwner == thisUser){
            return true
        }
        else return false

                       },

})

makeId= function() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < 10; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}