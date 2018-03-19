Template.groups.rendered = function(){
    
        
    $("#posts-link").removeClass('selected')
    $("#profile-link").removeClass('selected')
    $("#rankings-link").removeClass('selected')
    $("#search-link").removeClass('selected')
    $("#login-link").removeClass('selected')
    $("#group-link").addClass('selected')
  
    
}


Template.groups.events({
   "submit .course-register": function(event){
      
      var collegeId = event.target.currentcollegeId.value;
      var courseName = trimInput(event.target.courseName.value);
      var currentDapartmentName = event.target.currentDapartmentName.value;

        // console.log(collegeId,courseName,currentDapartmentName)
      if(isNotEmpty(courseName))
       
      {
           
 
                        
      Meteor.call('addCourse',collegeId, courseName, currentDapartmentName)    
               
              event.target.courseName.value ="";
                   
              Bert.alert("Course Was Added Succesfully!", "success", "growl-top-right")   
               
         } else {
              Bert.alert("Error Occured", "danger", "growl-top-right")
                
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