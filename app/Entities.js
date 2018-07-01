import { Backbone } from '../vendor/vendor';

var root = 'http://127.0.0.1:8000/';

var Urls = {
    login: root + 'login',
    logout: root + 'logout'
};

export default {
    User: Backbone.Model.extend({
        defaults: {
            loggedIn: false
        }
    }),
    UserLogin: Backbone.Model.extend({
        defaults: {
            username: null,
            password: null
        },
        url: Urls.login
    })
};