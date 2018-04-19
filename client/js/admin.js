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
        let modules = Module.find(
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



    thisAdminsUsers: function(){

       let myAdminUsers = Module.find(
                {
                    admin_id: Meteor.userId()
                },
                {
                    approved:{
                        $exists: true,
                        $not: {$size: 0}
                    }
                },
                {
                    sort: {moduleName:-1}

                }
            );

            return myAdminUsers

        },

    
     
})

Template.Approved.helpers({

    userProfilePic: function(userName){
        let userProfilePic = UserImages.findOne(
            {
                username: userName
            }
        ).image

        return userProfilePic
        console.log(userProfilePic)

    },

})