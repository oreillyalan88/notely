Template.modules.rendered = function(){
    
        
    // $("#posts-link").removeClass('selected')
    // $("#profile-link").removeClass('selected')
    // $("#rankings-link").removeClass('selected')
    // $("#search-link").removeClass('selected')
    // $("#login-link").removeClass('selected')
    // $("#group-link").addClass('selected')
  
    
}

Template.modules.helpers({
  get_college: function() {

      var slug= Template.parentData()

      return  slug
  },
  

  
})


Template.modules.events({
   "submit .modules-register": function(event){
      
      var currentCourseId = event.target.currentCourseName.value;
      var modulename = event.target.modulename.value;
      var currentCourseYear = event.target.currentCourseYear.value;
      var sluggedModuleName = slugify(modulename)

      console.log(currentCourseYear,currentCourseId,modulename)
      if(isNotEmpty(modulename))
       
      {
           
 
                        
      Meteor.call('addCourseModules',currentCourseYear,sluggedModuleName, currentCourseId, modulename, function(error){
            

        if (error){
              Bert.alert("That Module Already Exists For This Course!", "danger", "growl-top-right")   
               
        } else {
             
               Bert.alert("Module Was Added Successfully!", "success", "growl-top-right")
               event.target.modulename.value ="";
        }
      }.bind(this));
       
  } else {
              Bert.alert("Error Occured", "danger", "growl-top-right")
                
         }
                        
         return false;

},
    
    
       "click #sub": function(){
      
        var thisModule = Module.findOne({_id: this._id})._id
        var Name = Meteor.user().username;
        var thisPostsRequests = Module.findOne({_id: thisModule}).requested

      if(thisPostsRequests.filter(function(thisPostsRequest){ return thisPostsRequest.name === Name}).length > 0){
            Bert.alert("Your request is already pending", "danger", "growl-top-right");
            //in the array
            
         }else{
            //do stuff
            Meteor.call("joinRequest", thisModule, Name)


            Bert.alert("You request is under review", "success", "growl-top-right");
        }
             return false;
}
    
});



