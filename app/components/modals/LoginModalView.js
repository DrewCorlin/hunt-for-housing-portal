import { Marionette, App } from '../../../vendor/vendor';
import Entities from '../../Entities';
import tpl from '../../templates/modals/loginModal.tpl';

var DEV_HEADERS = {headers: {'X-House-Finder-User': 'Drew'}};

export default Marionette.View.extend({
    template: tpl,

    events: {
        "click @ui.cancel": "onCancel",
        "click @ui.login": "onRequestLogin",
        "keydown @ui.password": "onKeydown"
    },

    ui: {
        cancel: '.js-cancel-button',
        login: '.js-request-login-button',
        username: '.js-username-input',
        password: '.js-password-input'
    },

    onCancel: function() {
        App.trigger("modal:close");
    },

    onKeydown: function(msg) {
        if (msg.keyCode === 13 && this.$(this.ui.password).focus()) {
            this.onRequestLogin();
        }
    },

    onRequestLogin: function() {
        this.$(this.ui.username).removeClass('text-input--error');
        this.$(this.ui.password).removeClass('text-input--error');

        var username = this.$(this.ui.username).val();
        var password = this.$(this.ui.password).val();
        var requiredFieldsFilled = true;
        if (!username) {
            this.$(this.ui.username).addClass('text-input--error');
            requiredFieldsFilled = false;
        }
        if (!password) {
            this.$(this.ui.password).addClass('text-input--error');
            requiredFieldsFilled = false;
        }
        if (!requiredFieldsFilled) { return; }
        this._login(username, password);
        App.trigger('modal:close');
    },

    _login: function(username, password) {
        var userLogin = new Entities.UserLogin();
        var defer = $.Deferred();
        userLogin.save({username: username, password: password}, DEV_HEADERS).done(function(response) {
            defer.resolve();
            window.serverSession.authToken = response.authToken;
            window.serverSession.username = username;
            App.trigger('toast:show', "Successfully logged in");
            App.trigger('user:loggedIn');
        }).fail(function(response) {
            defer.reject();
            App.trigger('error:toast:show', response.responseText);
        });
        return defer.promise();
    }
});