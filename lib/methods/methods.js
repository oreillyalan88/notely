if(Meteor.isServer){
    Meteor.methods({
       //Methods for adding postss 
       addPosts: function(postSubject, postInput){
           if(!Meteor.userId()){
               throw new Meteor.Error('not authorized')
               return false;
               
           }else {
               var userId = Meteor.userId();
               var username = Meteor.user().username;
               var year = new Date().getFullYear();
               var month = new Date().getMonth()+1;
               var day = new Date().getDate()
               var date = (month +"/"+ day +"/"+year).toString();
               var temp_image = UserImages.findOne({userId: userId},{image:1, _id:0});
               var image = temp_image.image;
            //   console.log(userId)
            //   console.log(image)

 
               
               Posts.insert({
                   postSubject: postSubject,
                   postInput: postInput,
                   author: username,
                   date:date,
                   createdAt: new Date(),
                   profilePic: image,
                   upScore: 0,
                   downScore: 0,
                   voted: [username],
                   userId: userId,
                   
               });
               
        
               
           }
       },
       
       
        addCourseYear: function( id, year, course, courseImage){
            if(!Meteor.userId()){
               throw new Meteor.Error('not authorized')
               this.stop();
               return false;
               
           }else {
               
               
            exists = Years.findOne({course:course, year:year})

            if (exists){
               throw new Meteor.Error('not authorized')
               this.stop();
               return false;

            }
            
            else {
             Years.insert({
              course: course,
              year: year,
              departmentId: id,
              logo:courseImage,
             })
            }
       }},
       
        addCourseModules: function( year, courseId, moduleName){
            if(!Meteor.userId()){
               throw new Meteor.Error('not authorized')
               this.stop();
               return false;
               
           }else {
               
               
            exists = Modules.findOne({year:year, moduleName:moduleName})

            if (exists){
               throw new Meteor.Error('not authorized')
               this.stop();
               return false;

            }
            
            else {
            var courseImage = "https://ijnet.org/sites/default/files/images/migrate/2010-09-29/25647.jpg"
             Modules.insert({
              year: year,
              courseId: courseId,
              moduleName: moduleName,
              logo:courseImage,
             })
            }
       }},
       
        addCourse: function( id, name, department){
            if(!Meteor.userId()){
               throw new Meteor.Error('not authorized')
               this.stop();
               return false;
               
           }else {
             Courses.insert({
              department: department,
              name: name,
              collegeId: id,
              logo:"https://ijnet.org/sites/default/files/images/migrate/2010-09-29/25647.jpg"
             })}
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
       
        updateAllPostImages: function(thisUser, thisImage){
           if(!thisUser){
               throw new Meteor.Error('not authorized')
               return false;
           }else{
                Posts.update({userId:thisUser},{$set: {profilePic: thisImage }},{ "multi": true})
           }
           
           
       },
       
      addComments: function(commentInput, postId){
          if(!Meteor.userId()){
              throw new Meteor.Error('not authorized')
              return false;
               
          }else {
              var userId = Meteor.userId();
              var username = Meteor.user().username;
              var year = new Date().getFullYear();
              var month = new Date().getMonth()+1;
              var day = new Date().getDate()
              var date = (day +"/"+ month +"/"+year).toString();
              
              var temp_image = UserImages.findOne({userId: userId},{image:1, _id:0});
              var image = temp_image.image;
              console.log(postId + "    "+ image)
              Posts.update({
                 _id: postId
              },{
                  $push:{
    
                          comments: {
                          profilePic: image,
                          commentInput: commentInput,
                          author: username,
                          date:date,
                          createdAt: new Date(),
                          userId: userId
                      
                  }
                   
              }});
               
        
               
          }
      },
       

       
    });
    
}