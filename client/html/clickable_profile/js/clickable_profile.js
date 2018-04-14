Template.clickable_profile.onCreated( function() {
    this.currentTab = new ReactiveVar( "clickable_picture" );
});


Template.clickable_profile.helpers({

    tab: function(template) {

        if (template==undefined) {
            return Template.instance().currentTab.get();
        }
        else{
            this.currentTab = new ReactiveVar( "clickable_picture" );

        }
    }
})





Template.clickable_profile.events({

    'click .nav-pills li': function( event, template ) {
        var currentTab = $( event.target ).closest( "li" );
        console.log(template)

        currentTab.addClass( "active" );
        $( ".nav-pills li" ).not( currentTab ).removeClass( "active" );

        template.currentTab.set( currentTab.data( "template" ) );
    }


})


