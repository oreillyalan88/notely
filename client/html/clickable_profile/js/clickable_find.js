Template.clickable_find.helpers({
    inputAttributes: function() {
        return { 'class': 'easy-search-input', 'placeholder': 'Start Searching' };
    },
    players: function() {
        return Meteor.users.find({}, { sort: { createdAt: -1 } });
    },
    selectedName: function() {
        var User = UsersIndex.config.mongoCollection.findOne({ __originalId: Session.get("selectedUser") });
        return User && User.username;
    },
    index: function () {
        return UsersIndex;
    },
    resultsCount: function() {
        return UsersIndex.getComponentDict().get('count');
    },
    showMore: function() {
        return false;
    },

    renderTmpl: () => Template.renderTemplate

});

Template.User.helpers({
    selected: function() {
        return Session.equals("selectedUser", this.__originalId) ? "selected" : '';
    },
});

Template.User.events({
    'click': function() {
        Session.set("selectedUser", this.__originalId);
    }
});