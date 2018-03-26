Template.schools.rendered = function() {
    // console.log(Template.parentData().slug)
    $("#search-link").addClass('selected')
    $("#posts-link").removeClass('selected')
    $("#rankings-link").removeClass('selected')
    $("#profile-link").removeClass('selected')
    $("#login-link").removeClass('selected')
    
    
    
},

Template.schools.helpers({
  get_college: function() {
      var slug= Template.parentData().slug
      console.log(slug)
    return  slug 
}

})
