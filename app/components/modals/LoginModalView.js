import { Marionette, App } from '../../../vendor/vendor';
import tpl from '../../templates/modals/loginModal.tpl';

export default Marionette.View.extend({
    template: tpl,

    events: {
        "click .js-cancel-button": "onCancel",
        "click .js-request-login-button": "onRequestLogin",
        "keydown .js-password-input": "onKeydown"
    },

    onCancel: function() {
        App.trigger("modal:close");
    },

    onKeydown: function(msg) {
        if (msg.keyCode === 13 && this.$('.js-password-input').focus()) {
            this.onRequestLogin();
        }
    },

    onRequestLogin: function() {
        this.$(".js-username-input").removeClass('text-input--error');
        this.$(".js-password-input").removeClass('text-input--error');

        var username = this.$(".js-username-input").val();
        var password = this.$(".js-password-input").val();
        var requiredFieldsFilled = true;
        if (!username) {
            this.$(".js-username-input").addClass('text-input--error');
            requiredFieldsFilled = false;
        }
        if (!password) {
            this.$(".js-password-input").addClass('text-input--error');
            requiredFieldsFilled = false;
        }
        if (!requiredFieldsFilled) { return; }
        App.request('user:login', username, password);
        App.trigger('modal:close');
    }
});