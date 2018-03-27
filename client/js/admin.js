Template.admin.rendered = function() {
    
    
}



Template.admin.helpers({

    modules: function() {
        modules = Modules.find(
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
    
    "click #approve": function(event){

        
        
        
        // var thisModule = Modules.findOne({requested: {name:this.requested.name}})._id
        // var postAuthor = Modules.findOne({_id: this._id}).userId
        // var Name = Meteor.user().username;
        // var thisPostsRequests = Modules.findOne({_id: this._id},{requested: {$in: Name}}).requested;
        
  
        
        // console.log(userProfilePic)
        
        // Meteor.call("approveRequest", thisModule, Name)
     
    },
    
    
    "click #reject": function(){
        console.log("goodbye")

    },

})