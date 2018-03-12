if(Meteor.isServer){
    
    Meteor.publish('Posts', function(){
        if(!this.userId){
            return false;
            throw new Meteor.Error('not authorized');
            
        }else {
            return Posts.find();
        }
    })
    
    Meteor.publish('Users', function(){
        if(!this.userId){
            return false;
            throw new Meteor.Error('not authorized');
            
        }else {
            return Meteor.users.find();
        }
    })
    
    // Meteor.publish('Comments', function(){
    //     if(!this.userId){
    //         return false;
    //         throw new Meteor.Error('not authorized');
            
    //     }else {
    //         return Meteor.comments.find();
    //     }
    // })
    
    Meteor.publish("ProfileImages", function(){

            return ProfileImages.find();

    })
    
    Meteor.publish("UserImages", function(){
   
            return UserImages.find();

    })
}