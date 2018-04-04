Template.years.rendered = function() {
    // console.log(Template.parentData().slug)
    // $("#search-link").addClass('selected')
    // $("#posts-link").removeClass('selected')
    // $("#rankings-link").removeClass('selected')
    // $("#profile-link").removeClass('selected')
    // $("#login-link").removeClass('selected')
    
    
    
},

Template.years.helpers({
  get_college: function() {
      console.log(Template.parentData())
      var slug= Template.parentData().thisCollege.slug
    console.log(slug)
      return  slug
  },      
  
   get_departments: function() {
      var slug= Template.parentData().thisDepartment
      return  slug 
}
})


Template.years.events({
   "submit .year-register": function(event){
      
      var currentCourseId = event.target.currentCourseId.value;
      var courseName = trimInput(event.target.courseName.value);
      var courseYear = event.target.courseYear.value;
      var courseImage = event.target.courseImage.value;

      console.log(currentCourseId,courseName,courseYear)
      if(isNotEmpty(courseName))
       
      {
           
 
                        
      Meteor.call('addCourseYear',currentCourseId, courseYear, courseName, courseImage, function(error){
            

        if (error){
              Bert.alert("That Year Already Exists For This Course!", "danger", "growl-top-right")   
               
        } else {
             
               Bert.alert("Year Was Added Succesfully!", "success", "growl-top-right")   
               event.target.courseYear.value ="1";
        }
      })   
       
  } else {
              Bert.alert("Error Occured", "danger", "growl-top-right")
                
         }
                        
         return false;

}});

