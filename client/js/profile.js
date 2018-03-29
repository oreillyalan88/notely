Template.profile.rendered = function() {
    
     this.currentTab = new ReactiveVar( "picture" );
    
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