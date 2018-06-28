import {Marionette, App} from '../../vendor/vendor';
import tpl from '../templates/ribbon.tpl';
import loginModalTpl from '../templates/modals/loginModal.tpl';

var LoginModalView = Marionette.View.extend({
    template: loginModalTpl,

    events: {
        "click .js-cancel": "onCancel"
    },

    onCancel: function() {
        console.log('cancel');
        App.request('close:modal');
    },

    onSubmitLogin: function() {
        console.log("submit login");
        var username = this.$(".js-username-input").val();
        var password = this.$(".js-password-input").val();
        App.request('user:login', username, password);
    }
});

export default Marionette.View.extend({
    template: tpl,
    className: "ribbon-view",

    // onRender: function() {
    //     // Set up App.request("modal:view", primaryButtonText)
    //     this.$('.js-credentials-container').hide();
    // },

    events: {
        "click .js-login-button": "onClickLogin"
    },

    onClickLogin: function() {
        this.model.set("loggedIn", true);
        App.request('show:modal', new LoginModalView());
    }
});
