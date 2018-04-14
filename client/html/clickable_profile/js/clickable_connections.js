Template.clickable_connections.onCreated( function() {
    this.currentTab = new ReactiveVar( "clickable_followers" );
});


Template.clickable_connections.helpers({



    thisProfilesFollowers: function(){
        const followers = this.profilesFollowers

        return Meteor.users.find({_id: {$in: followers}});


    },


});
Template.registerHelper('tabs', function() {
    return Template.instance().currentTab.get();
}),

Template.clickable_connections.events({

    'click .nested-nav-pills li': function( event, template ) {
        var currentTab = $( event.target ).closest( "li" );

        currentTab.addClass( "active" );
        $( ".nested-nav-pills li" ).not( currentTab ).removeClass( "active" );

        template.currentTab.set( currentTab.data( "template" ) );
    }


})

