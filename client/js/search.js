Template.search.rendered = function() {
    
    $("#search-link").addClass('selected')
    $("#posts-link").removeClass('selected')
    $("#rankings-link").removeClass('selected')
    $("#profile-link").removeClass('selected')
    $("#login-link").removeClass('selected')
    
    
    
}

Template.search.helpers({

    colleges: function() {
        var colleges = Colleges.find({},
        {
            sort: {name:1}
            
        }
        );
        
       return colleges
        
    }
})