import {Marionette, App} from '../../vendor/vendor';
import LoginModalView from './modals/LoginModalView';
import RegisterHouseView from './RegisterHouseView';
import tpl from '../templates/ribbon.tpl';

export default Marionette.View.extend({
    template: tpl,
    className: "ribbon-view",

    events: {
        'click .js-login-button': 'onClickLogin',
        'click .js-register-house-button': 'onClickRegister'
    },

    onClickLogin: function() {
        App.trigger('modal:open', new LoginModalView());
    },

    onClickRegister: function() {
        App.trigger('modal:open', new RegisterHouseView());
    }
});
