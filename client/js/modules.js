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
      var modulename = trimInput(event.target.modulename.value);
      var currentCourseYear = event.target.currentCourseYear.value;


      console.log(currentCourseYear,currentCourseId,modulename)
      if(isNotEmpty(modulename))
       
      {
           
 
                        
      Meteor.call('addCourseModules',currentCourseYear, currentCourseId, modulename, function(error){
            

        if (error){
              Bert.alert("That Module Already Exists For This Course!", "danger", "growl-top-right")   
               
        } else {
             
               Bert.alert("Module Was Added Succesfully!", "success", "growl-top-right")   
               event.target.courseYear.value ="1";
        }
      })   
       
  } else {
              Bert.alert("Error Occured", "danger", "growl-top-right")
                
         }
                        
         return false;

},
    
    
       "click #sub": function(){
      
        var thisUser = Meteor.userId();
        var thisModule = Modules.findOne({_id: this._id})._id
        // var postAuthor = Modules.findOne({_id: this._id}).userId
        var Name = Meteor.user().username;
        var thisPostsRequests = Modules.findOne({_id: thisModule}).requested
        // .requested.find(x => x.name === Name)
         console.log(thisPostsRequests)
         
         
        console.log('thisUser = '+thisUser+ '\n' + 
                     'thisModule = '+thisModule+  '\n' + 
                     'Name = '+Name+ '\n' +  
                     'thisPostsRequests = '+thisPostsRequests);
      console.log((thisPostsRequests.filter(function(e){ return e.name === Name})))
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




var trimInput = function(val){
    return val.replace(/^\s*|\s*$/g, "") //if these values are found, replace with empty string
}

var isNotEmpty = function(val){
    if(val && val !== ''){
        return true;
    }
    Bert.alert("Please fill in all fields", "danger", "growl-top-right")
    return false;
}