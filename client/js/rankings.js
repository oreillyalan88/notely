Template.rankings.rendered = function() {
    
    $("#rankings-link").addClass('selected')
    $("#posts-link").removeClass('selected')
    $("#search-link").removeClass('selected')
    $("#profile-link").removeClass('selected')
    $("#login-link").removeClass('selected')
    
    
    
}


Template.rankings.helpers({
    scoreLeader: function(){
        var scoreLeader = Meteor.users.findOne({},{sort: {'profile.upScore': -1}}); //user with must upvotes
        return scoreLeader;
    }
})
    
