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

    'click #deleteFileButton ': function (event) {
        console.log("deleteFile button ", this);
        FileCollection.remove({_id: this._id});
    },
    'change #your-upload-class': function (event, template) {
        console.log("uploading...")
        FS.Utility.eachFile(event, function (file) {
            console.log("each file...");
            var yourFile = new FS.File(file);
            FileCollection.insert(yourFile, function (err, fileObj) {
                console.log("callback for the insert, err: ", err);
                if (!err) {
                    console.log("inserted without error");
                }
                else {
                    console.log("there was an error", err);
                }
            });
        });
    }
    
})

Template.postForm.helpers({
  get_data: function() {

      var slug= Template.parentData()
      console.log(slug)
      return  slug
  },

    theFiles: function () {
        return FileCollection.find();
    }
  
})

//validation rules
var isNotEmpty = function(val){
    if(val && val !== ''){
        return true;
    }
    Bert.alert("Please fill in all fields", "danger", "growl-top-right")
    return false;
}