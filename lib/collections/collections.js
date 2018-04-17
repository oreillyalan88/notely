Posts = new Mongo.Collection('posts');

Colleges = new Mongo.Collection('colleges');

Departments = new Mongo.Collection('departments');

Courses = new Mongo.Collection('courses');

Module = new Mongo.Collection('module');

Years = new Mongo.Collection('years');

TempPostCollection  = new Mongo.Collection('TempPostCollection');


TempPostCollection.allow
({
    insert: function (userId, doc) {
        return true;
    }
,
    update: function (userId, doc) {
        return true;
    },
    remove: function (userId, doc) {
        return true;
    },

})

FileCollection = new FS.Collection("FileCollection", {
    stores: [new FS.Store.GridFS("fileCollection" )]
});

FileCollection.allow({
    insert: function (userId, doc) {
        return true;
    },
    update: function (userId, doc) {
        return true;
    },
    remove: function (userId, doc) {
        return true;
    },
    download: function (userId, doc) {
        return true;
    }
});


Posts.allow({
     update: function(){
       return true;
   },

    
})


ProfileImages = new FS.Collection("ProfileImages",  {
  stores: [new FS.Store.GridFS("profileImages")]
    
});


// Set Meteor Collection Riles


ProfileImages.allow({
   insert: function(userId, doc){
       return true
   },
   update: function(userId, doc, fields, modifier){
       return true;
   },

   download: function(){
        return true;
   }
    
});


UserImages = new Meteor.Collection("userImages");


UserImages.allow({
    insert: function(){
        return true;
    },
    
    update: function(userId, doc, fields, modifier){
        return true;

    }
    
    
})



//for easy search
UsersIndex = new EasySearch.Index({
    engine: new EasySearch.MongoDB({
        sort: function() {
            return { createdAt: -1 };
        },
        selector: function(searchObject, options, aggregation) {
            let selector = this.defaultConfiguration().selector(searchObject, options, aggregation),
                categoryFilter = options.search.props.categoryFilter;

            if(_.isString(categoryFilter) && !_.isEmpty(categoryFilter)) {
                selector.category = categoryFilter;
            }

            return selector;
        }
    }),
    collection: Users,
    fields: ['username'],
    defaultSearchOptions: {
        limit: 8
    },
    permission: () => {
        return true;
    }
});