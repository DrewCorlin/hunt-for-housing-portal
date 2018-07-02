// Non view-specific events avaliable to global app channel
export default {
    requests: {
        "user:authToken": function() {
            return window.serverSession.authToken;
        }
    },
    triggers: {
        'set:user:authToken': function(authToken) {
            window.serverSession.authToken = authToken;
        },
        'set:user:username': function(username) {
            window.serverSession.username = username;
        }
    }
};