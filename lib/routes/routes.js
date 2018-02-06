Router.configure({
    layoutTemplate: 'main_layout'
})

Router.map(function(){
    //Posts
    this.route('posts',{
        path: '/',
        template: 'posts'
    });
});