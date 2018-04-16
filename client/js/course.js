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
   "submit .course-register": function(event, err){


      var collegeId = event.target.currentcollegeId.value;
      var courseName = event.target.courseName.value;
      var courseLogo = event.target.courseLogo.value;
      var currentDapartmentName = event.target.currentDapartmentName.value;
       courseName = titleCase(courseName)
      console.log(collegeId,courseName,currentDapartmentName,courseLogo)

       if(isNotEmpty(courseLogo)&&isNotEmpty(courseName)){



      Meteor.call('addCourse',collegeId, courseName,courseLogo, currentDapartmentName, function(error){



          if (error){
              Bert.alert("This module already exists for this College!", "danger", "growl-top-right")

              event.target.courseName.value ="";
              event.target.courseLogo.value ="";

          } else {

              Bert.alert("Course Was Added Successfully!", "success", "growl-top-right")

              event.target.courseName.value ="";
              event.target.courseLogo.value ="";
          }
      })

}


return false;

},


    'change .your-upload-class': function (event, template) {
        event.preventDefault();
        console.log("uploading...")
        FS.Utility.eachFile(event, function (file) {
            console.log("each file...");
            var yourFile = new FS.File(file);
            yourFile.metadata = {
                fileOwner: Meteor.userId()
            }
            FileCollection.insert(yourFile, function (err, result ){
                console.log("callback for the insert, err: ", err);
                var fileLocation = 'http://localhost:3000/cfs/files/FileCollection/'+result._id

                if (!err) {
                    console.log("inserted without error");
                    $("#courseLogo").val(fileLocation)
                    $("#this-logo").replaceWith($("#this-logo").val('').clone(true));

                    // TempPostCollection.insert({upload_id: result._id,userId: Meteor.userId(), file: fileLocation , name:result.original.name })
                //




                }
                else {
                    console.log("there was an error", err);
                }
            });
        });
    }


});



