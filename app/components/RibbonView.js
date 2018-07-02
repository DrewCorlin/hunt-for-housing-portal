import { Marionette, App } from '../../vendor/vendor';
import Entities from '../Entities';
import LoginModalView from './modals/LoginModalView';
import RegisterHouseView from './RegisterHouseView';
import tpl from '../templates/ribbon.tpl';

var DEV_HEADERS = {headers: {'X-House-Finder-User': 'Drew'}};

export default Marionette.View.extend({
    template: tpl,
    className: "ribbon-view",

    events: {
        'click @ui.login': 'onClickLogin',
        'click @ui.logout': 'onClickLogout',
        'click @ui.register': 'onClickRegister'
    },

    ui: {
        login: '.js-login-button',
        logout: '.js-logout-button',
        register: '.js-register-house-button'
    },

    initialize: function() {
        App.on('user:loggedIn', this._showLogoutButton, this);
    },

    onClickLogin: function() {
        App.trigger('modal:open', new LoginModalView());
    },

    onClickLogout: function() {
        var username = window.serverSession.username;
        var authToken = App.request('user:authToken');
        DEV_HEADERS.headers['X-User-Auth-Token'] = authToken;
        var userLogout = new Entities.UserLogout();
        var defer = $.Deferred();
        var view = this;
        userLogout.save({username: username}, DEV_HEADERS).done(function(response) {
            defer.resolve();
            window.serverSession.authToken = null;
            window.serverSession.username = null;
            App.trigger('toast:show', "Successfully logged out");
            view._showLoginButton();
        }).fail(function(response) {
            // FIX THIS
            if (response.status === 200) {
                defer.resolve();
                window.serverSession.authToken = null;
                window.serverSession.username = null;
                App.trigger('toast:show', "Successfully logged out");
                view._showLoginButton();
                return;
            }
            defer.reject();
            App.trigger("error:toast:show", response.responseText);
        });
        return defer.promise();
    },

    onClickRegister: function() {
        App.trigger('modal:open', new RegisterHouseView());
    },

    _showLogoutButton: function() {
        this.$(this.ui.login).addClass('hidden');
        this.$(this.ui.logout).removeClass('hidden');
    },

    _showLoginButton: function() {
        this.$(this.ui.logout).addClass('hidden');
        this.$(this.ui.login).removeClass('hidden');
    }
});
