

Template.sidebar.helpers({





    modules: function () {

        let currentUser =  Meteor.users.findOne({ _id: Meteor.userId() }).username

        console.log(currentUser)

        return Module.find( { 'approved.name': { $lte: currentUser } } )
    }


})


Template.sidebar.events({
    "click .logout": function(event){
        
        Meteor.logout(function(err){
            if(err){
               Bert.alert(err.reason, "danger", "growl-top-right") 
            }
            else{
               Router.go('/')
               Bert.alert("You Are Now Logged Out", "danger", "growl-top-right") 
            }
        })
    },
    
})
