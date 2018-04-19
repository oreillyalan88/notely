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


        if(scoreLeader.profile.upScore==0)
        {
            return false
            console.log('didntwork')
        }
        else {
            return scoreLeader;
            console.log("worked!")

        }
    },

    scoreLeaderProfilePic: function (){
        var scoreLeader = Meteor.users.findOne({},{sort: {'profile.upScore': -1}}); //user with must upvotes

        var profilePic = UserImages.findOne({userId:scoreLeader._id}).image
        console.log(profilePic)
        return profilePic;

    },

    topSharer: function (){

        var shareLeader = Meteor.users.findOne({},{sort: {'uploadScore': -1}}); //user with must uploads

        if(shareLeader.uploads==0)
        {
            return false
            console.log('didntwork')
        }
        else {
            return shareLeader;
            console.log("worked!")

        }
    },

    topSharerProfilePic: function (){
        var shareLeader = Meteor.users.findOne({},{sort: {'uploadScore': -1}}); //user with must uploads

        var profilePic = UserImages.findOne({userId:shareLeader._id}).image
        console.log(profilePic)
        return profilePic;

    }
})
    
