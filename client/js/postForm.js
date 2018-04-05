Template.postForm.rendered = function(){
}

Template.postForm.events({
    "submit .form-post":function(event){
        var postInput = event.target.postInput.value;
        var moduleId = event.target.moduleId.value;
        console.log(moduleId)

        if(postInput.length === 0){
            Bert.alert("Please fill in all fields", "danger", "growl-top-right")
            return false;

        }
        if(isNotEmpty(postInput)){
                   
              Meteor.call('addPosts', postInput,moduleId)
               
              // event.target.postSubject.value ="";
              event.target.postInput.value ="";
                   
              Bert.alert("Your Post Was Succesful!", "success", "growl-top-right")   
               
         } else {
              Bert.alert("Error Occured", "danger", "growl-top-right")
                
         }
                        
         return false;

        
    },

    'click #deleteTempFileButton ': function ( event) {
        event.preventDefault();
        console.log("deleteFile button ", this);
        Meteor.call('removeTempUpload', this.upload_id);
    },

    'click #deleteRealFileButton ': function ( event) {
        event.preventDefault();
        console.log("deleteFile button ", this);
        var id= this._id
        console.log(id)
        FileCollection.remove({_id: this._id});
        Meteor.call('deletePostByUpload',id)
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
               var fileLocation = 'http://localhost:3000/cfs/files/FileCollection/'+result._id+'/'+result.original.name

                if (!err) {
                    console.log("inserted without error");
                    $("#file-input").replaceWith($("#file-input").val('').clone(true));

                    TempPostCollection.insert({upload_id: result._id,userId: Meteor.userId(), file: fileLocation , name:result.original.name })





                }
                else {
                    console.log("there was an error", err);
                }
            });
        });
    },


    
})

Template.postForm.helpers({


    theFiles: function () {
        return FileCollection.find();
    },

    theTemps: function () {
        return TempPostCollection.find();
    }
  
})

