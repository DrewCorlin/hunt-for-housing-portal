// Global events - Kept in the same file to allow lint to detect duplicate keys
// For now group like requests together to allow separation later
// TODO: Find a better way to separate these
import Entities from './Entities';
import { _, App } from  '../vendor/vendor';

var DEV_HEADERS = {headers: {'X-House-Finder-User': 'Drew'}};
// Create a map of functions for each 'object'
var User = {
    login: function(username, password) {
        var userLogin = new Entities.UserLogin({username: username, password: password});
        var defer = $.Deferred();
        userLogin.save(null, DEV_HEADERS).done(function(response) {
            defer.resolve(response);
        }).fail(function(response) {
            defer.reject(response);
        });
        return defer.promise();
    },
    logout: function() {
        var cookieMap = App.request('cookie:map', document.cookie);
        var authToken = cookieMap.authToken;
        var username = cookieMap.username;
        var userLogout = new Entities.UserLogout({username: username});
        var defer = $.Deferred();
        DEV_HEADERS.headers['X-User-Auth-Token'] = authToken;
        userLogout.save(null, DEV_HEADERS).done(function(response) {
            defer.resolve(response);
        }).fail(function(response) {
            defer.reject(response);
        });
        return defer.promise();
    }
};

var House = {
    register: function(houseData) {
        var houseRegister = new Entities.HouseRegister(houseData);
        var defer = $.Deferred();
        houseRegister.save(null, DEV_HEADERS).done(function(response) {
            defer.resolve(response);
        }).fail(function(response) {
            defer.reject(response);
        });
        return defer.promise();
    }
};

export default {
    // Expects return from requester
    requests: {
        'cookie:map': function(cookieString) {
            var cookies = cookieString.split('; ');
            var cookieMap = {};
            _.each(cookies, function(cookie) {
                var cur = cookie.split('=');
                cookieMap[cur[0]] = cur[1];
            });
            return cookieMap;
        },
        'user:login': function(username, password) {
            return User.login(username, password);
        },
        'user:logout': function() {
            return User.logout();
        },
        'house:register': function(houseData) {
            return House.register(houseData);
        },
        'cookie:string': function(cookieString) {
            var expiration = new Date();
            expiration.setTime(expiration.getTime() + 2592000); // 30 days, to match backend authToken peristance
            return cookieString + ' expires=' + expiration.toUTCString() + ';';
        }
    },
    // No return expected
    triggers: {}
};