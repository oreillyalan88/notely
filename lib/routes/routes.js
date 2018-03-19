
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
        var _id = Colleges.findOne({slug: currentCollege})._id._str
        var temp = currentDepartment.replace(/-/g,' '); 
        var schools = Departments.findOne({collegeId: _id}).schools
        
        var department = schools.find(x => x.name ===  titleCase(temp) )
        var departmentName = department.name
        console.log(departmentName)
        var courses = Courses.find({collegeId: _id, department: departmentName}).fetch()
        console.log(courses)

        viewData = {
          
          currentCollege_id: _id,  
          currentDapartmentName: departmentName,
          currentCollege_slug: currentCollege,
          currentDepartment_slug: currentDepartment,
          courses: Courses.find({collegeId: _id, department: departmentName}).fetch()
          
          
          

     }
        return viewData
        console.log(viewData.courses)

        
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

   
   function titleCase(str) {
   var splitStr = str.toLowerCase().split(' ');
   for (var i = 0; i < splitStr.length; i++) {
       // You do not need to check if i is larger than splitStr length, as your for does that for you
       // Assign it back to the array
       splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);     
   }
   // Directly return the joined string
   return splitStr.join(' '); 
}