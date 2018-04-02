if(Meteor.isServer){
    
    Meteor.publish('Posts', function(){
        if(!this.userId){
            return false;
            throw new Meteor.Error('not authorized');
            
        }else {
            return Posts.find();
        }
    })    
    
    Meteor.publish('Module', function(){
        if(!this.userId){
            return false;
            throw new Meteor.Error('not authorized');
            
        }else {
            return Module.find();
        }
    })
    
    Meteor.publish('Years', function(){
        if(!this.userId){
            return false;
            throw new Meteor.Error('not authorized');
            
        }else {
            return Years.find();
        }
    })
    
    Meteor.publish('Courses', function(){
        if(!this.userId){
            return false;
            throw new Meteor.Error('not authorized');
            
        }else {
            return Courses.find();
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
    
        
    Meteor.publish('Departments', function(){
        if(!this.userId){
            return false;
            throw new Meteor.Error('not authorized');
            
        }else {
            return Departments.find();
        }
    })
    
    Meteor.publish('Colleges', function(){
        if(!this.userId){
            return false;
            throw new Meteor.Error('not authorized');
            
        }else {
            return Colleges.find();
        }
    })
    
    
    
    Meteor.publish("ProfileImages", function(){

            return ProfileImages.find();

    })
    
    Meteor.publish("UserImages", function(){
   
        if(!this.userId){
            return false;
            throw new Meteor.Error('not authorized');
            
        }else {
            return UserImages.find();
        }

    })

    Meteor.publish("FileCollection", function () {
        console.log("publishing fileUploads");
        return FileCollection.find();
    });
}