Router.onBeforeAction(function() {
  $(window).scrollTop(0);
  this.next();
});

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
    this.route('schools',{
        path: 'search/:slug/schools',
        template: 'schools',
        
     data: function(){
        var currentCollege = this.params.slug;
        var _id = Colleges.findOne({slug: currentCollege})._id._str
        var __id =Departments.findOne({collegeId: _id})
        viewData = {
           slug: currentCollege,
           departments:  Departments.findOne({collegeId: _id}).schools
     }
        console.log(viewData)
        console.log(viewData.slug)
        console.log(viewData.departments)
        return  viewData
        window.scrollTo(0, 0);     

    }
    });
    
    //Groups
    this.route('groups',{
        path: '/search/:college_slug/schools/:department_slug',
        template: 'groups',
        
    data: function(){
        var currentDepartment = this.params.department_slug;
        var currentCollege = this.params.college_slug;
        console.log(currentDepartment, currentCollege)
        window.scrollTo(0, 0);    
        
    }
    });
        
    //My Groups
    this.route('mygroups',{
        path: '/mygroups',
        template: 'mygroups'
    });
    
    //Search
    this.route('search',{
        path: '/search',
        template: 'search'
    });
    
});