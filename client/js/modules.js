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

}});




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