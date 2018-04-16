Template.rankings.rendered = function() {


    $("#profile-link").removeClass('selected')
    $("#rankings-link").addClass('selected')
    $("#search-link").removeClass('selected')
    $("#mygroups-link").removeClass('selected')
    $("#admin-link").removeClass('selected')
    $("#login-link").removeClass('selected')

}


Template.rankings.helpers({
    scoreLeader: function(){
        var scoreLeader = Meteor.users.findOne({},{sort: {'profile.upScore': -1}}); //user with must upvotes
        return scoreLeader;
    },

    scoreLeaderProfilePic: function (){
        var scoreLeader = Meteor.users.findOne({},{sort: {'profile.upScore': -1}}); //user with must upvotes

        var profilePic = UserImages.findOne({userId:scoreLeader._id}).image
        console.log(profilePic)
        return profilePic;

    },

    topSharer: function (){

        var scoreLeader = Meteor.users.findOne({},{sort: {'profile.upScore': -1}}); //user with must upvotes
        return scoreLeader;
    }
})
    
