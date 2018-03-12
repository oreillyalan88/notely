if(Meteor.isClient){
	Meteor.subscribe('Posts');
	Meteor.subscribe('Users');
	// Meteor.subscribe('Comments');
	Meteor.subscribe('ProfileImages');
	Meteor.subscribe('UserImages');
}