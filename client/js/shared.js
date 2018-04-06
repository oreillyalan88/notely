

Template.shared.helpers({
    theFiles: function () {
        return Posts.find(

            {'uploads.userId' : { $eq: Meteor.userId()}}


        ).fetch()}


});


Template.shared.events({


    'click #deleteRealFileButton ': function ( event) {
        event.preventDefault();
        let id= this.upload_id


        swal({
                title: "Are you sure?",
                text: "You will not be able to recover this file!",
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
                    Meteor.call('deletePostByUpload',id)
                    swal("Deleted!", "Your file has been deleted.", "success");
                } else {
                    swal("Cancelled", "Your file is safe", "error");
                }
            });


    },


})



