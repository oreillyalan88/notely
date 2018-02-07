if(Meteor.isServer){
    Meteor.methods({
       //Methods for adding postss 
       addPosts: function(postSubject, postInput){
           if(!Meteor.userId()){
               throw new Meteor.Error('not authorized')
               return false;
               
           }else {
               var username = Meteor.user().username;
               var year = new Date().getFullYear();
               var month = new Date().getMonth()+1;
               var day = new Date().getDate()
               var date = (day +"/"+ month +"/"+year).toString();
               
               Posts.insert({
                   postSubject: postSubject,
                   postInput: postInput,
                   author: username,
                   date:date,
                   createdAt: new Date(0),
                   upScore: 0,
                   downScore: 0,
                   voted: [username],
                   userId: Meteor.userId(),
                   
               });
               
           }
       }
    });
    
}