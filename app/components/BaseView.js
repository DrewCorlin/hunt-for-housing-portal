import { Marionette, App, toast } from '../../vendor/vendor';
import Entities from '../Entities';
import RibbonView from './RibbonView';
import RegisterHouseView from './RegisterHouseView';
import tpl from '../templates/base.tpl';

var DEV_HEADERS = {headers: {'X-House-Finder-User': 'Drew'}};

export default Marionette.View.extend({
    template: tpl,
    className: "base-view",

    regions: {
        ribbonRegion: ".js-ribbon-region",
        contentRegion: ".js-content-region",
        modalRegion: ".js-modal-region"
    },

    onRender: function() {
        this.showChildView("ribbonRegion", new RibbonView({model: new Entities.User()}));
    },

    initialize: function() {
        // Global events
        App.on('modal:open', this.openModal, this);
        App.on('modal:close', this.closeModal, this);
        App.on('toast:show', this.showToast, this);
        App.on('error:toast:show', this.showErrorToast, this);
        App.reply('user:login', this.login, this);
        App.reply('user:logout', this.logout, this);
    },

    openModal: function(view) {
        this.showChildView('modalRegion', view);
    },

    closeModal: function(view) {
        this.getRegion('modalRegion').empty();
    },

    showToast: function(text) {
        $('.js-toast').removeClass('error-toast').addClass('toast');
        $('.js-toast').text(text);
        $('.js-toast').show(5000, function() {
            $(this).delay(5000).hide();
        });
    },

    showErrorToast: function(text) {
        $('.js-toast').removeClass('toast').addClass('error-toast');
        $('.js-toast').text(text);
        $('.js-toast').show(5000, function() {
            $(this).delay(5000).hide();
        });
    },

    login: function(username, password) {
        var userLogin = new Entities.UserLogin();
        var defer = $.Deferred();
        userLogin.save({username: username, password: password}, DEV_HEADERS).done(function(response) {
            defer.resolve();
            window.serverSession.authToken = response.authToken;
            App.trigger('toast:show', "Successfully logged in");
        }).fail(function(response) {
            defer.reject();
            // App.trigger('error:toast:show', response.responseText);
            toast.error("No dice");
        });
        return defer.promise();
    },

    logout: function(username) {
        console.log('logout', username);
    },

    onChildviewRegisterHouse: function() {
        this.showChildView('contentRegion', new RegisterHouseView());
    }
});
