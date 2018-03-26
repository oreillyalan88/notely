Posts = new Mongo.Collection('posts');

Colleges = new Mongo.Collection('colleges');

Departments = new Mongo.Collection('departments');

Courses = new Mongo.Collection('courses');

Modules = new Mongo.Collection('modules');

Years = new Mongo.Collection('years');



Posts.allow({
     update: function(){
       return true;
   },

    
})


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