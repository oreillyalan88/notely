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
              Router.go("/posts")
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
            }
            else{
                Router.go('/posts')
                Bert.alert("Your Are Now Logged In", "success", "growl-top-right")
                console.log(Meteor.user())
            }

        });


    }


});


