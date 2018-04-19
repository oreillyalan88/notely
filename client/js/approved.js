Template.Approved.rendered = function(){

}



Template.Approved.helpers({

    userProfilePic: function(userName){
        userProfilePic = UserImages.findOne(
            {
                username: userName
            }
        ).image

        return userProfilePic

    },


})

Template.Approved.events({
    'click #removeApprovalScenarioButton': function() {

        var adminId = Meteor.userId()
        var userName = this.data.name;
        var moduleName = this.moduleName;
        var moduleId = Module.findOne({moduleName:moduleName,admin_id:adminId})._id

        var userId = Meteor.users.findOne({username:userName})._id

        console.log(userName,adminId,moduleName,moduleId)
        Meteor.call("deleteApproval", adminId, moduleName, userName)
        Meteor.call("rejectRequest", adminId, moduleId, userName)

        Bert.alert("User: "+userName+" has been granted access to "+moduleName, "success", "growl-top-right");

        return false;
    },

});