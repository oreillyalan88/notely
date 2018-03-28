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
       var moduleId = Modules.findOne({moduleName:moduleName,admin_id:adminId})._id
       var userId = Meteor.users.findOne({username:userName})._id
       
       var ModuleCode = moduleName+"_"+moduleId;

          Meteor.call("approveRequest", adminId, moduleName, userName)
          Meteor.call("deleteRequest", adminId, moduleName, userName)
          Meteor.call("addRoles", userId,ModuleCode)
    
         Bert.alert("User: "+userName+" has been granted access to "+moduleName, "success", "growl-top-right");
   
    return false;
  },
  
  'click #rejectScenarioButton': function() {

       var userName = this.data.name;
       var moduleName = this.moduleName;
   
    
    Meteor.call("countVotes", thisPost, Name)
    Meteor.call("userDownVotePoint",postAuthor)


    Bert.alert("You Vote Was Placed", "success", "growl-top-right");
   
   
  }
});