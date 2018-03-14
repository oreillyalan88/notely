Template.commentForm.rendered = function(){
    
}

Template.commentForm.events({
    "submit .comment-post":function(event, template){
        console.log('i am here')
        var tempPostId = template.data._id;
        var commentInput = event.target.commentInput.value;

        if(isNotEmpty(commentInput)
             ){
                   
            Meteor.call('addComments', commentInput, tempPostId)    
               
              event.target.commentInput.value ="";
                   
              Bert.alert("Your Post Was Succesful!", "success", "growl-top-right")   
               
         } else {
              Bert.alert("Error Occured", "danger", "growl-top-right")
                
         }
                        
       
        return false;
        
    },
    
})

//validation rules
var isNotEmpty = function(val){
    if(val && val !== ''){
        return true;
    }
    Bert.alert("Please fill in all fields", "danger", "growl-top-right")
    return false;
}