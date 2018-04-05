Template.search.rendered = function() {


    $("#profile-link").removeClass('selected')
    $("#rankings-link").removeClass('selected')
    $("#search-link").addClass('selected')
    $("#mygroups-link").removeClass('selected')
    $("#admin-link").removeClass('selected')
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