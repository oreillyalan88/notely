Template.profile.onCreated( function() {
  this.currentTab = new ReactiveVar( "picture" );
});

Template.profile.rendered = function() {
    

    $("#profile-link").addClass('selected')
    $("#posts-link").removeClass('selected')
    $("#rankings-link").removeClass('selected')
    $("#search-link").removeClass('selected')
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
  
        Meteor.call("removePost", this._id)
        Bert.alert("Post Deleted", "success", "growl-top-right")

    },
    
     'click .nav-pills li': function( event, template ) {
    var currentTab = $( event.target ).closest( "li" );

    currentTab.addClass( "active" );
    $( ".nav-pills li" ).not( currentTab ).removeClass( "active" );

    template.currentTab.set( currentTab.data( "template" ) );
  }
    
    
})