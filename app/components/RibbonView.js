import {Marionette, App} from '../../vendor/vendor';
// import ModalView from './ModalView';
import tpl from '../templates/ribbon.tpl';
// import loginModalTpl from '../templates/modals/loginModal.tpl';

// var LoginModalView = Marionette.View.extend({
//     template: loginModalTpl,

//     events: {
//         "click .js-cancel": "onCancel"
//     },

//     onCancel: function() {
//         console.log('cancel');
//         // Create modal region that takes a view and displays it
//         // Conventions:
//         //  Must have a cancel button that destroys the view (and hides the region?)
//         //  Confirmation button will destroy the view (and hide region?) when it is done
//     }
// });

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
        App.request('user:login', "hi there", "hi again");
    }
});
