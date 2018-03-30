if(Meteor.isClient){
	Meteor.subscribe('Posts');
	Meteor.subscribe('Users');
	Meteor.subscribe('Colleges');
	Meteor.subscribe('Courses');
	Meteor.subscribe('Years');
	Meteor.subscribe('Departments');
	Meteor.subscribe('ProfileImages');
	Meteor.subscribe('UserImages');
	Meteor.subscribe('Module');

}

   

