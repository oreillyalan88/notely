// if (Meteor.isClient) {
//     Meteor.startup(function () {
//
//         Router.go('profile');
//
//     });
// }


Router.configure({
    layoutTemplate: 'main_layout'
})


Router.map(function(){

      
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
        template: 'admin',
        
    //      data: function(){
        
        
      
    //   var modules = Modules.find(
    //     {
    //         admin_id: Meteor.userId()
    //     },
    //     {
    //         requested:{
    //             $exists: true, 
    //             $not: {$size: 0} 
    //         }
    //     },
    //     {
    //         sort: {moduleName:-1}
            
    //     }
    //     );
        
    //      viewData = {

    //         modules: modules
            
    //         }
    //     return viewData
    //     window.scrollTo(0, 0);  
    //      }
         
        
        
    });  
    
    //Rankings
    this.route('rankings',{
        path: '/rankings',
        template: 'rankings'
    });


    //Posts
    this.route('posts',{    //route name
        path: 'mygroups/:slug/posts',    //url address
        template: 'posts', //template called

        data: function(){
            var moduleId = this.params.slug;



            viewData = {
                moduleId: moduleId,
                posts: Posts.find({moduleId: moduleId},{sort: {createdAt:-1}}).fetch()
            }
            return  viewData
            window.scrollTo(0, 0);

        }
    });


    //All Groups
    this.route('schools',{
        path: 'search/:slug',
        template: 'schools',
        
     data: function(){
        var currentCollege = this.params.slug;
        var _id = Colleges.findOne({slug: currentCollege})._id._str
         console.log(_id)
        var __id =Departments.findOne({collegeId: _id})
         console.log(__id)
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
         console.log(collegeName)

        var course = Courses.find({collegeId:collegeName._id._str}).fetch()
        console.log(course)
        var course_slug = this.params.course_slug;
        console.log(course_slug)
        course_slug = titleCase(course_slug.replace(/-/g,' '));
         console.log(course_slug)

        course_slug = course.find(x => x.name ===  course_slug)
         console.log(course_slug)
         console.log(course_slug.name, course_slug._id)
         var years = Years.find({course: course_slug.name, courseId: course_slug._id}).fetch()
         console.log(years)



        viewData = {

         thisCollege: collegeName,
         thisDepartment: course_slug,
         years: Years.find({course: course_slug.name, courseId: course_slug._id}, {sort: {year:1}}).fetch()

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
         console.log(collegeName)
        var course = Courses.find({collegeId:collegeName._id._str}).fetch()
         console.log(course)

         var course_slug = this.params.course_slug;
        course_slug = titleCase(course_slug.replace(/-/g,' '));

        course_slug = course.find(x => x.name ===  course_slug)
         console.log(course_slug._id)

        var year_slug = this.params.year_slug;
         console.log(year_slug)

         // var thisCourse = Courses.findOne({name:temp})
        viewData = {

         college_slug: this.params.college_slug,
         department_slug: this.params.department_slug,
         course_slug: this.params.course_slug,
         thisCollege: collegeName,
         thisDepartment: course_slug,
         year_slug:year_slug,
         modules: Module.find({courseId: course_slug._id, year:year_slug}).fetch()

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
        module_slug = this.params.module_slug
         console.log(module_slug)



         var modules_id = Module.findOne({courseId: course_slug._id, year:year_slug, sluggedModuleName:module_slug})._id
        
        console.log(modules_id)
        viewData = {

         moduleId : modules_id,
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

   
