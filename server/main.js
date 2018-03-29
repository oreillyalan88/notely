import { Meteor } from 'meteor/meteor';

ServiceConfiguration.configurations.remove({
    service: "twitter"
});

ServiceConfiguration.configurations.insert({
    service: "twitter",
    appId: '213899456026662',
    secret: '46af3d4de09f23d6f9e343b187fc8623'
});

Accounts.onCreateUser(function (options, user) {

    if (!user.services.twitter) {
        return user;
    }
    user.username = user.services.twitter.name;
    user.emails = [{address: user.services.twitter.email}];

    return user;
});