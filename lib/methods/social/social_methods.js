if(Meteor.isServer){
    Meteor.methods({


    TwitterUserObjectScaffold: function(postAuthor,  username, img_url, fullName){
    if(!Meteor.userId()){
        throw new Meteor.Error('not authorized')
        this.stop();
        return false;

    }else {
        Meteor.users.update(postAuthor, {$set: { username: username, uploadScore :0,profile:{name: fullName,  upScore:0,downScore:0,voted:[]}}},
            function(err){
                if (err){
                    Bert.alert(err.reason, "danger", "growl-top-right")

                } else {
                    UserImages.insert({
                        userId: Meteor.userId(),
                        username: username,
                        image: img_url,
                    })


                }

            });

    }
},
        GoogleUserObjectScaffold: function(postAuthor,  username, img_url, fullName){
            if(!Meteor.userId()){
                throw new Meteor.Error('not authorized')
                this.stop();
                return false;

            }else {

                Meteor.users.update(postAuthor, {$set: { username: username, uploadScore :0,profile:{name: fullName, upScore:0,downScore:0,voted:[]}}},
                    function(err){
                        if (err){
                            Bert.alert(err.reason, "danger", "growl-top-right")

                        } else {
                            UserImages.insert({
                                userId: Meteor.userId(),
                                username: username,
                                image: img_url,
                            })


                        }

                    });

            }
        },

        GithubUserObjectScaffold: function(postAuthor,  username, img_url, fullName){
            if(!Meteor.userId()){
                throw new Meteor.Error('not authorized')
                this.stop();
                return false;

            }else {

                Meteor.users.update(postAuthor, {$set: { username: username, uploadScore :0,profile:{name: fullName, upScore:0,downScore:0,voted:[]}}},
                    function(err){
                        if (err){
                            Bert.alert(err.reason, "danger", "growl-top-right")

                        } else {
                            UserImages.insert({
                                userId: Meteor.userId(),
                                username: username,
                                image: img_url,
                            })


                        }

                    });

            }
        },

});}