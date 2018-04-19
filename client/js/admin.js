Template.admin.onCreated( function() {
    this.currentTab = new ReactiveVar( "Request_staging" );
});

Template.admin.rendered = function() {



    $("#profile-link").removeClass('selected')
    $("#rankings-link").removeClass('selected')
    $("#search-link").removeClass('selected')
    $("#mygroups-link").removeClass('selected')
    $("#admin-link").addClass('selected')
    $("#login-link").removeClass('selected')




}



Template.admin.helpers({

    tab: function() {
        return Template.instance().currentTab.get();
    },

    
     
})

Template.admin.events({

    'click .nav-pills li': function( event, template ) {
        var currentTab = $( event.target ).closest( "li" );

        currentTab.addClass( "active" );
        $( ".nav-pills li" ).not( currentTab ).removeClass( "active" );

        template.currentTab.set( currentTab.data( "template" ) );
    }


})