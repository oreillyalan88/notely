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
                   createdAt: new Date(),
                   upScore: 0,
                   downScore: 0,
                   voted: [username],
                   userId: Meteor.userId(),
                   
               });
               
        
               
           }
       },
       
        removePost: function(postId){
           if(!Meteor.userId()){
               throw new Meteor.Error('not authorized')
               this.stop();
               return false;
               
           }else {
               Posts.remove(postId);
               
           }
       },
       
       
       countVotes: function(thisPost, Name){
            if(!Meteor.userId()){
               throw new Meteor.Error('not authorized')
               this.stop();
               return false;
               
           }else {
               Posts.update(thisPost,{$addToSet: {voted: Name}});
               
           }
       },
       
        userUpVotePoint: function(postAuthor){
            if(!Meteor.userId()){
               throw new Meteor.Error('not authorized')
               this.stop();
               return false;
               
           }else {
               Meteor.users.update(postAuthor,{$inc: {'profile.upScore': +1}});
               
           }
       },
       
        upVote: function(thisUser, thisPost){
           if(!thisUser){
               throw new Meteor.Error('not authorized')
               return false;
           }else{
               Posts.update(thisPost, {$inc: {upScore: +1}})
           }
           
           
       },
       
        userDownVotePoint: function(postAuthor){
            if(!Meteor.userId()){
               throw new Meteor.Error('not authorized')
               this.stop();
               return false;
               
           }else {
               Meteor.users.update(postAuthor,{$inc: {'profile.downScore': +1}});
               
           }
       },
       
        downVote: function(thisUser, thisPost){
           if(!thisUser){
               throw new Meteor.Error('not authorized')
               return false;
           }else{
               Posts.update(thisPost, {$inc: {downScore: +1}})
           }
           
           
       },
       

       
    });
    
}