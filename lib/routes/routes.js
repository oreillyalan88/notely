Router.configure({
    layoutTemplate: 'main_layout'
})

Router.map(function(){
    //Posts
    this.route('posts',{    //route name
        path: '/posts',    //url address
        template: 'posts' //template called
    });
      
    //Login
    this.route('login',{
        path: '/',
        template: 'login'
    });
    
    //Sign Up
    this.route('signup',{
        path: '/signup',
        template: 'signup'
    });
    
    //Profile
    this.route('profile',{
        path: '/profile',
        template: 'profile'
    });  
    
    //Rankings
    this.route('rankings',{
        path: '/rankings',
        template: 'rankings'
    });
    
    //All Groups
    this.route('groups',{
        path: '/groups',
        template: 'groups',
        data:function(){
         templateData = {
             
         }   
        }
    });
    
        
    //My Groups
    this.route('mygroups',{
        path: '/mygroups',
        template: 'mygroups'
    });
    
    //Schools
    this.route('schools',{
        path: '/groups/schools',
        template: 'schools'
    });
    
    //Search
    this.route('search',{
        path: '/search',
        template: 'search'
    });
    
});