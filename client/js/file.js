Template.StagedFiles.helpers({
    thisModulesFiles: function(){

        let thisModulesFiles = Module.find(
            {
                admin_id: Meteor.userId()
            },
            {
                sort: {moduleName:-1}

            },

        )



        return thisModulesFiles
    },



})

Template.Files.helpers({
    thisPostsFiles: function(_id){

        let thisPostsFiles = Posts.find(
            {
                moduleId: _id
            },
            {
                uploads:{
                    $exists: true,
                    $not: {$size: 0}
                }
            },
            {
                sort: {createdAt:-1}


            }
        )



        return thisPostsFiles
    },





})

Template.Files.events({


    'submit .uploadedfiles ': function ( event, template) {
        event.preventDefault();
        let id=  event.target.uploadId.value;
        var postid = event.target.postid.value;
        console.log(id,postid)


        swal({
                title: "Are you sure?",
                text: "All accossiated posts, comments and files will be deleted and made unrecoverable",
                type: "warning",
                showCancelButton: true,
                confirmButtonClass: "btn-danger",
                confirmButtonText: "Yes, delete it!",
                cancelButtonText: "No, cancel!",
                closeOnConfirm: false,
                closeOnCancel: false
            },
            function(isConfirm) {
                if (isConfirm) {

                    FileCollection.remove({_id: id});
                    Meteor.call('deletePostByUpload',id, postid)
                    swal("Deleted!", "Your file has been deleted.", "success");
                } else {
                    swal("Cancelled", "Your file is safe", "error");
                }
            });

        return false;
    },

})
