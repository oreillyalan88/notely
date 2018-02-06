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
    
    //Search
    this.route('search',{
        path: '/search',
        template: 'search'
    });
    
});