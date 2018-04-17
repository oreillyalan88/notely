if(Meteor.isServer){
    Meteor.methods({
       //Methods for adding postss 
       addPosts: function(postInput, moduleId){
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
               var uploads = TempPostCollection.find({userId: Meteor.userId()}).fetch();
               if (uploads!=undefined){

               var countUploads = uploads.length
               Meteor.users.update({_id: userId},{$inc: {'uploads.uploadScore': +countUploads}})
               }

               TempPostCollection.remove({userId: Meteor.userId()})



               Posts.insert({
                   postInput: postInput,
                   author: username,
                   date:date,
                   createdAt: new Date(),
                   profilePic: image,
                   upScore: 0,
                   downScore: 0,
                   voted: [username],
                   userId: userId,
                   uploads: uploads,
                   moduleId: moduleId
               });
               
        
               
           }
       },
       
       
        addCourseYear: function( id, year, course, courseImage){
            if(!Meteor.userId()){
               throw new Meteor.Error('not authorized')
               this.stop();
               return false;
               
           }else {
               
               
            var exists = Years.findOne({course:course,courseId: id, year:year})

            if (exists){
               throw new Meteor.Error('not authorized')
               this.stop();
               return false;

            }
            
            else {
             Years.insert({
              course: course,
              year: year,
                 courseId: id,
              logo:courseImage,
             })
            }
       }},
       
        addCourseModules: function( year,sluggedModuleName, courseId, moduleName, moduleLogo){
            if(!Meteor.userId()){
                // console.log("1   "+year,courseId,moduleName)

                throw new Meteor.Error('not authorized')
               this.stop();
               return false;
               
           }else {
               
               
            var exists = Module.findOne({year:year, courseId:courseId, moduleName:moduleName})

                // console.log("2   "+year,courseId,moduleName)
            if (exists){
               throw new Meteor.Error('not authorized')
               this.stop();
               return false;

            }

            else {
                // console.log("3   "+year,courseId,moduleName)

                var courseImage = moduleLogo
                Module.insert({
              year: year,
              courseId: courseId,
              moduleName: moduleName,
              sluggedModuleName: sluggedModuleName,
              logo:courseImage,
              requested: [],
              rejected: [],
              approved: [],
              admin_id: Meteor.userId(),
               reject_id: Meteor.call('makeId')
             })
            }
       }},

        addCourse: function( id, name, courseLogo, department){
            if(!Meteor.userId()){
               throw new Meteor.Error('not authorized')
               this.stop();
               return false;
               
           }else {



                var exists = Courses.findOne({collegeId:id, name:name})

                if (exists){
                    throw new Meteor.Error('not authorized')
                    this.stop();
                    return false;

                }
                else{
                    Courses.insert({
                        department: department,
                        name: name,
                        collegeId: id,
                        logo:courseLogo
                    })
                }}
       },
       
        removePost: function(postId){
           if(!Meteor.userId()){
               throw new Meteor.Error('not authorized')
               this.stop();
               return false;
               
           }else {

               var uploadScore= Posts.findOne({_id:postId}).uploads.length
               var userId= Posts.findOne({_id:postId}).userId

               if (uploadScore!=undefined || uploadScore>0){

                   var countUploads = uploadScore.length
                   Meteor.users.update({_id: userId},{$inc: {'uploads.uploadScore': -countUploads}})
                   var isNull = Meteor.users.findOne({_id: userId}).uploads.uploadScore
                   if(isNaN(isNull)){
                       console.log('you got here')
                       Meteor.users.update({_id: userId},{$set: {'uploads.uploadScore': 0}})
                   }
               }

               Posts.remove(postId);
               
           }
       },




        deletePostByUpload: function(uploadId){
            if(!Meteor.userId()){
                throw new Meteor.Error('not authorized')
                this.stop();
                return false;

            }else {
                Posts.remove({ 'uploads.upload_id': { $eq: uploadId } } )

            }
        },


        removeTempUpload: function(uploadId){
            if(!Meteor.userId()){
                throw new Meteor.Error('not authorized')
                this.stop();
                return false;

            }else {
                TempPostCollection.remove({upload_id:uploadId});

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
               console.log("here"+thisImage)
                Posts.update({userId:thisUser},{$set: {profilePic: thisImage }},{ "multi": true})
           }
           
           
       },
       
      addComments: function(commentInput, postId, id){
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
                          userId: userId,
                              commentId: id
                      
                  }
                   
              }});
               
        
               
          }
      },

        removeComment: function (userId, commentId) {
            if(!Meteor.userId()){
                throw new Meteor.Error('not authorized')
                this.stop();
                return false;

            }else {
                Posts.update(
                    {userId:userId },
                    { $pull: { "comments" : { "commentId": commentId } } },
                    {multi:true});

            }
        },
      
       joinRequest: function(thisModuleId, Name){
            if(!Meteor.userId()){
               throw new Meteor.Error('not authorized')
               this.stop();
               return false;
               
           }else {
                Module.update(thisModuleId,{$addToSet: {requested: {name: Name}}});
               
           }
       },
          
       deleteRequest:function(adminId, thisModule, Name){
            if(!Meteor.userId()){
               throw new Meteor.Error('not authorized')
               this.stop();
               return false;
               
           }else {
                Module.update({admin_id:adminId, moduleName: thisModule},{ $pull: { requested: { name : Name} } })
           }
       },
              
       approveRequest: function(adminId, thisModule, Name){
            if(!Meteor.userId()){
               throw new Meteor.Error('not authorized')
               this.stop();
               return false;
               
           }else {
                Module.update({admin_id:adminId, moduleName: thisModule},{$addToSet: {approved: {name:  Name}}});


           }
       },       
       
       rejectRequest: function(adminId, thisModule, Name){
            if(!Meteor.userId()){
               throw new Meteor.Error('not authorized')
               this.stop();
               return false;
               
           }else {
                Module.update(thisModule,{$addToSet: {rejected: Name}});
               
           }
       },


       
        addRoles: function(userId, thisModule){
            if(!Meteor.userId()){
               throw new Meteor.Error('not authorized')
               this.stop();
               return false;
               
           }else {
              Roles.addUsersToRoles(userId, [thisModule])

               
           }
       },

        makeId: function() {
            var text = "";
            var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

            for (var i = 0; i < 10; i++)
                text += possible.charAt(Math.floor(Math.random() * possible.length));

            return text;
        }

       
    });
    
}