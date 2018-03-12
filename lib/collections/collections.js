Posts = new Mongo.Collection('posts');
// Comments = new Mongo.Collection('comments');


ProfileImages = new FS.Collection("ProfileImages",  {
  stores: [new FS.Store.GridFS("profileImages")]
    
});


// Set Meteor Collection Riles


ProfileImages.allow({
   insert: function(userId, doc){
       return true
   },
   update: function(userId, doc, fields, modifier){
       return true;
   },

   download: function(){
        return true;
   }
    
});


UserImages = new Meteor.Collection("userImages");


UserImages.allow({
    insert: function(){
        return true;
    },
    
    update: function(userId, doc, fields, modifier){
        return true;

    }
    
    
})