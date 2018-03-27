
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
    
    //Admin
    this.route('admin',{
        path: '/admin',
        template: 'admin'
    });  
    
    //Rankings
    this.route('rankings',{
        path: '/rankings',
        template: 'rankings'
    });
    
    //All Groups
    this.route('schools',{
        path: 'search/:slug',
        template: 'schools',
        
     data: function(){
        var currentCollege = this.params.slug;
        var _id = Colleges.findOne({slug: currentCollege})._id._str
        var __id =Departments.findOne({collegeId: _id})
        viewData = {
           slug: currentCollege,
           departments:  Departments.findOne({collegeId: _id}).schools
     }
        return  viewData
        window.scrollTo(0, 0);     

    }
    });
    
    //Groups
    this.route('course',{
        path: '/search/:college_slug/:department_slug',
        template: 'course',
        
    data: function(){
        
        var currentDepartment = this.params.department_slug;
        var currentCollege = this.params.college_slug;
        var _id = Colleges.findOne({slug: currentCollege})._id._str
        var temp = currentDepartment.replace(/-/g,' '); 
        var schools = Departments.findOne({collegeId: _id}).schools
        var department = schools.find(x => x.name ===  titleCase(temp) )
        var departmentName = department.name
        var courses = Courses.find({collegeId: _id, department: departmentName}).fetch()




        viewData = {
          
          currentCollege_id: _id,  
          currentDapartmentName: departmentName,
          courses: Courses.find({collegeId: _id, department: departmentName}).fetch()
          
          
          

     }
        return viewData

        
        window.scrollTo(0, 0);    
        
    }
    });
    
    this.route('year', {
        path: '/search/:college_slug/:department_slug/:course_slug/',
        template: 'years',
        
                
     data: function(){
        
        var collegeName = this.params.college_slug 
        collegeName = Colleges.findOne({slug: collegeName})

        var course = Courses.find({collegeId:collegeName._id._str}).fetch()
        
        var course_slug = this.params.course_slug;
        course_slug = titleCase(course_slug.replace(/-/g,' ')); 
        
        course_slug = course.find(x => x.name ===  course_slug)

        
        
    
        viewData = {

         thisCollege: collegeName,
         thisDepartment: course_slug,  
         years: Years.find({course: course_slug.name, courseId: course_slug._id}).fetch()
     }
        return viewData
        window.scrollTo(0, 0);    
        
    }
    })
    
    
    this.route('modules', {
        path: '/search/:college_slug/:department_slug/:course_slug/:year_slug',
        template: 'modules',
        
                
     data: function(){
        var collegeName = this.params.college_slug 
        collegeName = Colleges.findOne({slug: collegeName})

        var course = Courses.find({collegeId:collegeName._id._str}).fetch()
        
        var course_slug = this.params.course_slug;
        course_slug = titleCase(course_slug.replace(/-/g,' ')); 
        
        course_slug = course.find(x => x.name ===  course_slug)

        var year_slug = this.params.year_slug;
        
        // var thisCourse = Courses.findOne({name:temp})
        viewData = {

         college_slug: this.params.college_slug,
         department_slug: this.params.department_slug,
         course_slug: this.params.course_slug,
         thisCollege: collegeName,
         thisDepartment: course_slug,
         year_slug:year_slug,
         modules: Modules.find({courseId: course_slug._id, year:year_slug}).fetch()
     }
        return viewData
        window.scrollTo(0, 0);    
        
    }
    })
    
    
        this.route('moduleposts', {
        path: '/search/:college_slug/:department_slug/:course_slug/:year_slug/:module_slug/posts',
        template: 'posts',
        
                
     data: function(){
        var collegeName = this.params.college_slug 
        collegeName = Colleges.findOne({slug: collegeName})

        var course = Courses.find({collegeId:collegeName._id._str}).fetch()
        
        var course_slug = this.params.course_slug;
        course_slug = titleCase(course_slug.replace(/-/g,' ')); 
        
        course_slug = course.find(x => x.name ===  course_slug)

        var year_slug = this.params.year_slug,
        module_slug = this.params.module_slug,
        module_slug = titleCase(module_slug.replace(/-/g,' ')); 
        
        var modules_id = Modules.findOne({courseId: course_slug._id, year:year_slug, moduleName:module_slug})._id
        
        console.log(modules_id)
        viewData = {


         college_slug: this.params.college_slug,
         department_slug: this.params.department_slug,
         course_slug: this.params.course_slug,
         thisCollege: collegeName,
         thisDepartment: course_slug,
         year_slug:year_slug,
         posts: Posts.find({moduleId: modules_id},{sort: {createdAt:-1}}).fetch()
     }
        return viewData
        window.scrollTo(0, 0);    
        
    }
    })
         
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