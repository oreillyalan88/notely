Template.Request.rendered = function(){
    
}



Template.Request.helpers({
        
    userProfilePic: function(userName){
    userProfilePic = UserImages.findOne(
        {
            username: userName
        }
        ).image
        
      return userProfilePic
    
    },
})


Template.Request.events({
  'click #approveScenarioButton': function() {
      
       var adminId = Meteor.userId()
       var userName = this.data.name;
       var moduleName = this.moduleName;
       var moduleId = Module.findOne({moduleName:moduleName,admin_id:adminId})._id

       var userId = Meteor.users.findOne({username:userName})._id


          Meteor.call("approveRequest", adminId, moduleName, userName)
          Meteor.call("deleteRequest", adminId, moduleName, userName)

          Bert.alert("User: "+userName+" has been granted access to "+moduleName, "success", "growl-top-right");
   
    return false;
  },
  
  'click #rejectScenarioButton': function() {

    var adminId = Meteor.userId()
       var userName = this.data.name;
       var moduleName = this.moduleName;
       var moduleId = Module.findOne({moduleName:moduleName,admin_id:adminId})._id
       var userId = Meteor.users.findOne({username:userName})._id
       var reject_id = Module.findOne({moduleName:moduleName,admin_id:adminId}).reject_id
    
          Meteor.call("rejectRequest", adminId, moduleName, userName)
          Meteor.call("deleteRequest", adminId, moduleName, userName)




        Bert.alert("User: "+userName+" has been denied access to "+moduleName, "danger", "growl-top-right");
   
   
   
  }
});

Template.Request_staging.helpers({
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


})