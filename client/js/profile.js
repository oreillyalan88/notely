Template.profile.onCreated( function() {
  this.currentTab = new ReactiveVar( "picture" );
});

Template.profile.rendered = function() {

        $("#profile-link").addClass('selected')
        $("#rankings-link").removeClass('selected')
        $("#search-link").removeClass('selected')
        $("#mygroups-link").removeClass('selected')
        $("#admin-link").removeClass('selected')
        $("#login-link").removeClass('selected')


}

Template.profile.helpers({
    
    tab: function() {
    return Template.instance().currentTab.get();
    },
    
     
    userPosts: function(){
        var username = Meteor.user().username;
        var userId = Meteor.userId();
        var userPosts = Posts.find({userId: userId}, {},{sort: {createdAt: -1}});
        return userPosts;
    },
    
});

Template.profile.events({
    "click #delete-post": function(){

        let id= this._id

        swal({
                title: "Are you sure?",
                // text: "You will not be able to recover this file!",
                type: "warning",
                showCancelButton: true,
                confirmButtonClass: "btn-danger",
                confirmButtonText: "Yes, delete it!",
                cancelButtonText: "No, cancel!",
                closeOnConfirm: true,
                closeOnCancel: true
            },
            function(isConfirm) {
                if (isConfirm) {

                    console.log(id)

                    Meteor.call("removePost", id)
                    Bert.alert("Post Deleted", "success", "growl-top-right")

                }
            });


    },
    
     'click .nav-pills li': function( event, template ) {
    var currentTab = $( event.target ).closest( "li" );

    currentTab.addClass( "active" );
    $( ".nav-pills li" ).not( currentTab ).removeClass( "active" );

    template.currentTab.set( currentTab.data( "template" ) );
  }
    
    
})