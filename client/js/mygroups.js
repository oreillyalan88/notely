Template.mygroups.rendered = function(){


    $("#profile-link").removeClass('selected')
    $("#rankings-link").removeClass('selected')
    $("#search-link").removeClass('selected')
    $("#mygroups-link").addClass('selected')
    $("#admin-link").removeClass('selected')
    $("#login-link").removeClass('selected')



}


Template.mygroups.helpers({


    modules: function () {

        let currentUser =  Meteor.users.findOne({ _id: Meteor.userId() }).username

        console.log(currentUser)

        return Module.find( { 'approved.name': { $lte: currentUser } } )
    },

    membersCount : function(members){
        return  (members.length || 0);
    }


})


