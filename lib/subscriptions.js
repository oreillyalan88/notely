if(Meteor.isClient){
	Meteor.subscribe('Posts');
	Meteor.subscribe('Users');
	Meteor.subscribe('Colleges');
	Meteor.subscribe('Modules');
	Meteor.subscribe('Courses');
	Meteor.subscribe('Departments');
	Meteor.subscribe('ProfileImages');
	Meteor.subscribe('UserImages');
}

   

