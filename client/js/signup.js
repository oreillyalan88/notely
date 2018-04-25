Template.signup.rendered = function(){

}

Template.signup.events({
   "submit.form-signup": function(event){
       var username = trimInput(event.target.username.value);
       var email = trimInput(event.target.email.value);
       var password = trimInput(event.target.password.value);
       var password2 = trimInput(event.target.password2.value);

       if(isNotEmpty(email) 
       && isNotEmpty(username)
       && isNotEmpty(password)
       && isEmail(email) 
       && areValidPasswords(password, password2))
       
       {
           
 
                        
      Accounts.createUser({
          username: username,
          email: email,
          password: password,
          uploadScore :0,
          profile:{
              upScore:0,
              downScore:0,
              voted:[],
              

              
          }
      }, function(err){
          if (err){
              Bert.alert(err.reason, "danger", "growl-top-right")
              
          } else {
                UserImages.insert({
                userId: Meteor.userId(),
                username: username,
                image: '/400x400.jpg',
                        })
                        ,
              Bert.alert("Account Created, You are now logged in", "success", "growl-top-right")
              Router.go("/profile")
          }
          
      });    
           
     }
       return false;
       
   },

    'click [data-social-login]' ( event, template ) {
        const service = event.target.getAttribute( 'data-social-login' ),
            options = {
                requestPermissions: [ 'email' ]
            };

        if ( service === 'loginWithTwitter' ) {
            delete options.requestPermissions;
        }

        Meteor[ service ]( options, ( error ) => {
            if ( error ) {
                Bert.alert( error.message, 'danger' );
            }else{

                let profile = Meteor.user().services;

                if (profile.twitter){

                    if(Meteor.user().profile.upScore == undefined){
                        var img_url = profile.twitter.profile_image_url;
                        img_url = img_url.replace(/_normal/g, "");
                        let username = profile.twitter.screenName;
                        let fullName = Meteor.user().profile.name;

                        var temp = username;
                        if (checkIfUserExists(temp)){
                            var append = makeId()
                            temp = temp+append

                            Bert.alert("Account Created, You are now logged in", "success", "growl-top-right")
                            sweetAlert("", "The username on your social media account already exists, a random username "+temp+" has been chose for you. This can be changed in your profile settings.", "info");


                        }

                        Meteor.call('TwitterUserObjectScaffold', Meteor.userId(), temp, img_url, fullName)
                        Router.go("/profile")
                    }
                    else {
                        Bert.alert("Account Created, You are now logged in", "success", "growl-top-right")
                        Router.go("/profile")
                    }


                }else if (profile.google){
                    console.log('Google')

                    if(Meteor.user().profile.upScore == undefined){



                        let img_url = profile.google.picture;
                        var email = profile.google.email
                        var username = email.substring(0, email.lastIndexOf("@"));
                        let fullName = Meteor.user().profile.name;

                        var temp = username;
                        if (checkIfUserExists(temp)){
                            var append = makeId()
                            temp = temp+append

                            Bert.alert("Account Created, You are now logged in", "success", "growl-top-right")
                            sweetAlert("", "The username on your social media account already exists, a random username "+temp+" has been chose for you. This can be changed in your profile settings.", "info");


                        }

                        Meteor.call('GoogleUserObjectScaffold', Meteor.userId(), temp, img_url, fullName)
                        Router.go("/profile")
                    }
                    else {
                        Bert.alert("Account Created, You are now logged in", "success", "growl-top-right")
                        Router.go("/profile")
                    }

                }else if (profile.github){
                    // console.log('Git')

                    if(Meteor.user().profile.upScore == undefined){

                        // console.log('BANANANAS')



                        var email = profile.github.email
                        var username = profile.github.username;
                        let img_url = "https://github.com/"+username+".png?size=200";
                        let fullName = Meteor.user().profile.name;
                        // console.log(email,img_url,username,fullName)

                        var temp = username;
                        if (checkIfUserExists(temp)){
                            var append = makeId()
                            temp = temp+append
                            // console.log(temp)
                            Bert.alert("Account Created, You are now logged in", "success", "growl-top-right")
                            sweetAlert("", "The username on your social media account already exists, a random username "+temp+" has been chose for you. This can be changed in your profile settings.", "info");


                        }

                        Meteor.call('GithubUserObjectScaffold', Meteor.userId(), temp, img_url, fullName)
                        // // Bert.alert("Account Created, You are now logged in", "success", "growl-top-right")
                        Router.go("/profile")
                    }
                    else {
                        Bert.alert("Account Created, You are now logged in", "success", "growl-top-right")
                        Router.go("/profile")
                    }
                }
            }

        });

        return false; // prevent submit for form validation
    }


});


