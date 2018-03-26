Template.course.rendered = function(){
    
        
    // $("#posts-link").removeClass('selected')
    // $("#profile-link").removeClass('selected')
    // $("#rankings-link").removeClass('selected')
    // $("#search-link").removeClass('selected')
    // $("#login-link").removeClass('selected')
    // $("#group-link").addClass('selected')
  
    
}



Template.course.helpers({
  get_college: function() {
      var _id= Template.parentData().currentCollege_id
      var slug = Departments.findOne({collegeId: _id}).collegeName
      //console.log(slug)
      return  slug 
}

})

Template.course.events({
   "submit .course-register": function(event){
      
      var collegeId = event.target.currentcollegeId.value;
      var courseName = trimInput(event.target.courseName.value);
      var currentDapartmentName = event.target.currentDapartmentName.value;

        // console.log(collegeId,courseName,currentDapartmentName)
      if(isNotEmpty(courseName))
       
      {
           
 
                        
      Meteor.call('addCourse',collegeId, courseName, currentDapartmentName)    
               
              event.target.courseName.value ="";
                   
              
               
         } else {
              Bert.alert("Error Occured", "danger", "growl-top-right")
                
         }
                        
         return false;
       
  } 
});




