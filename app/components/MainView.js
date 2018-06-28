import {Backbone, Marionette, App} from '../../vendor/vendor';
import tpl from '../templates/main.tpl';
import RibbonView from './RibbonView';

var root =  "localhost:8000/";

var Urls = {
    login: root + "login",
    logout: root + "logout"
};

var Entities = {
    User: Backbone.Model.extend({
        defaults: {
            loggedIn: false
        }
    }),
    UserLogin: Backbone.Model.extend({
        defaults: {
            username: null,
            password: null,
            loggedIn: false,
            displayCredentialsInput: false
        },
        url: Urls.login
    })
};

export default Marionette.View.extend({
    template: tpl,
    className: "main-view",

    regions: {
        ribbonRegion: ".js-ribbon-region",
        contentRegion: ".js-content-region",
        modalRegion: ".js-modal-region"
    },

    onRender: function() {
        this.showChildView("ribbonRegion", new RibbonView({model: new Entities.UserLogin()}));
    },

    initialize: function() {
        // Global events
        App.reply('modal:view', this.showModal);
        App.reply('user:login', this.login);
        App.reply('user:logout', this.logout);
    },

    showModal: function(view) {
        this.modalRegion.showView(view);
    },

    login: function(username, password) {
        console.log('login', username, password);
    },

    logout: function(username) {
        console.log('logout', username);
    },
});
