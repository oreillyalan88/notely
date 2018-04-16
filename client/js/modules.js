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
      var moduleLogo = event.target.moduleLogo.value;
      var currentCourseYear = event.target.currentCourseYear.value;
      var sluggedModuleName = slugify(modulename)

      console.log(currentCourseYear,currentCourseId,modulename, moduleLogo)
      if(isNotEmpty(modulename) && isNotEmpty(moduleLogo))
       
      {
           
 
                        
      Meteor.call('addCourseModules',currentCourseYear,sluggedModuleName, currentCourseId, modulename, moduleLogo,function(error){
            

        if (error){
              Bert.alert("That Module Already Exists For This Course!", "danger", "growl-top-right")   
               
        } else {
             
               Bert.alert("Module Was Added Successfully!", "success", "growl-top-right")
               event.target.modulename.value ="";
        }
      }.bind(this));
       
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
                    $("#moduleLogo").val(fileLocation)
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



