import { Marionette, App } from '../../vendor/vendor';
import LoginModalView from './modals/LoginModalView';
import RegisterHouseView from './RegisterHouseView';
import tpl from '../templates/ribbon.tpl';

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
        App.on('user:loggedIn', this._userLoggedIn, this);
    },

    onClickLogin: function() {
        App.trigger('modal:open', new LoginModalView());
    },

    onClickLogout: function() {
        var logoutUser = App.request('user:logout');
        var view = this;
        logoutUser.done(function(response) {
            document.cookie = App.request('cookie:string', 'authToken=;');
            document.cookie = App.request('cookie:string', 'username=;');
            document.cookie = App.request('cookie:string', 'loggedIn=false;');
            App.trigger('toast:show', "Successfully logged out");
            view.model.set('loggedIn', false);
        }).fail(function(response) {
            // FIX THIS
            if (response.status === 200) {
                document.cookie = App.request('cookie:string', 'authToken=;');
                document.cookie = App.request('cookie:string', 'username=;');
                document.cookie = App.request('cookie:string', 'loggedIn=false;');
                App.trigger('toast:show', "Successfully logged out");
                view.model.set('loggedIn', false);
                return;
            }
            App.trigger("error:toast:show", response.responseText);
        });
    },

    onClickRegister: function() {
        App.trigger('modal:open', new RegisterHouseView());
    },

    _userLoggedIn: function() {
        document.cookie = "loggedIn=true";
        if (this.model) {
            this.model.set('loggedIn', true);
        }
    }
});
