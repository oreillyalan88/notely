Template.admin.rendered = function() {



    $("#profile-link").removeClass('selected')
    $("#rankings-link").removeClass('selected')
    $("#search-link").removeClass('selected')
    $("#mygroups-link").removeClass('selected')
    $("#admin-link").addClass('selected')
    $("#login-link").removeClass('selected')




}



Template.admin.helpers({

    modules: function() {
        modules = Module.find(
        {
            admin_id: Meteor.userId()
        },
        {
            requested:{
                $exists: true, 
                $not: {$size: 0} 
            }
        },
        {
            sort: {moduleName:-1}
            
        }
        );
        
      return modules
        
    },
    
    userProfilePic: function(userName){
    userProfilePic = UserImages.findOne(
        {
            username: userName
        }
        ).image
        
      return userProfilePic
      console.log(userProfilePic)
    },
    
     
})

Template.admin.events({
    
    // "click input[type=submit]": function(e, t) {
    //     if ($(e.target).prop("id") == "approveScenarioButton") {
    //         // Save the scenario
    
    //         // console.log(t.data);                   
    //         // // console.log(t.data.name); 

    //             return false
    //     } else if ($(e.target).prop("id") == "rejectScenarioButton") {
    //         // Submit the scenario
    //         console.log("you")
            
    //     }

    // }

})