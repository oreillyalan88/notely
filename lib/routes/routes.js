Router.configure({
    layoutTemplate: 'main_layout'
})

Router.map(function(){
    //Posts
    this.route('posts',{    //route name
        path: '/posts',    //url address
        template: 'posts' //template called
    });
    
    this.route('login',{
        path: '/',
        template: 'login'
    });
    
    
});