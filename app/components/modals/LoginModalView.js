import { Marionette, App } from '../../../vendor/vendor';
import tpl from '../../templates/modals/loginModal.tpl';

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

        var userLogin = App.request("user:login", username, password);
        userLogin.done(function(response) {
            App.trigger('toast:show', "Successfully logged in");
            App.trigger('user:loggedIn');
            document.cookie = App.request('cookie:string', 'authToken=' + response.authToken + ';');
            document.cookie = App.request('cookie:string', 'loggedIn=true;');
            document.cookie = App.request('cookie:string', 'username=' + username + ';');
        }).fail(function(response) {
            App.trigger('error:toast:show', response.responseText);
        });
        App.trigger('modal:close');
    }
});