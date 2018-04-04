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
      var courseName = event.target.courseName.value;
      var currentDapartmentName = event.target.currentDapartmentName.value;
       courseName = titleCase(courseName)
      console.log(collegeId,courseName,currentDapartmentName)
      if(isNotEmpty(courseName))

      {



      Meteor.call('addCourse',collegeId, courseName, currentDapartmentName, function(error){

              event.target.courseName.value ="";


          if (error){
              Bert.alert("This module already exists for this College!", "danger", "growl-top-right")

          } else {

              Bert.alert("Course Was Added Successfully!", "success", "growl-top-right")
              event.target.courseYear.value ="1";
          }
      })

} else {
    Bert.alert("Error Occured", "danger", "growl-top-right")

}

return false;

}});



