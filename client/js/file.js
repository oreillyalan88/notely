Template.StagedFiles.helpers({
    thisModulesFiles: function(){

        let thisModulesFiles = Module.find(
            {
                admin_id: Meteor.userId()
            },
            {
                uploads:{
                    $exists: true,
                    $not: {$size: 0}
                }
            },
            {
                sort: {moduleName:-1}

            },

        )

        // var _ids = thisModulesFiles.map(a => a._id);
        // // console.log(_ids)
        // // console.log(thisModulesFiles)
        //
        // let thisPostsFiles = Posts.find(
        //     {
        //         moduleId:{ $in : _ids }
        //     },
        //     {
        //         uploads:{
        //             $exists: true,
        //             $not: {$size: 0}
        //         }
        //     }
        // ).fetch()


        // var posts
        // console.log(thisPostsFiles)

        return thisModulesFiles
    },


})

Template.Files.helpers({
    thisPostsFiles: function(_id){

        let thisPostsFiles = Posts.find(
            {
                moduleId: _id
            },
            {
                uploads:{
                    $exists: true,
                    $not: {$size: 0}
                }
            },
            {
                sort: {createdAt:-1}


            }
        )



        return thisPostsFiles
    },


})