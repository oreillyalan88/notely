Template.postForm.rendered = function(){
    
}

Template.postForm.events({
    "submit .form-post":function(event){
        var postSubject = event.target.postSubject.value;
        var postInput = event.target.postInput.value;
        
        if(isNotEmpty(postSubject) &&
              isNotEmpty(postInput)){
                   
              Meteor.call('addPosts', postSubject, postInput, moduleId)    
               
              event.target.postSubject.value ="";
              event.target.postInput.value ="";
                   
              Bert.alert("Your Post Was Succesful!", "success", "growl-top-right")   
               
         } else {
              Bert.alert("Error Occured", "danger", "growl-top-right")
                
         }
                        
         return false;

        
    },
    
})

Template.postForm.helpers({
  get_data: function() {

      var slug= Template.parentData()
      console.log(slug)
      return  slug
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