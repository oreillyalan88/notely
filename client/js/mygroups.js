Template.mygroups.rendered = function(){
    
        
    $("#posts-link").removeClass('selected')
    $("#profile-link").removeClass('selected')
    $("#rankings-link").removeClass('selected')
    $("#search-link").removeClass('selected')
    $("#login-link").removeClass('selected')
    $("#mygroups-link").addClass('selected')
    $("#group-link").removeClass('selected')
  
    
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


