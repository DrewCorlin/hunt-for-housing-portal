import { Marionette, App, toast } from '../../vendor/vendor';
import Entities from '../Entities';
import RibbonView from './RibbonView';
import RegisterHouseView from './RegisterHouseView';
import tpl from '../templates/base.tpl';

export default Marionette.View.extend({
    template: tpl,
    className: "base-view",

    regions: {
        ribbonRegion: ".js-ribbon-region",
        contentRegion: ".js-content-region",
        modalRegion: ".js-modal-region"
    },

    onRender: function() {
        var cookieMap = App.request('cookie:map', document.cookie);
        var user = new Entities.User({loggedIn: cookieMap.loggedIn});
        this.showChildView("ribbonRegion", new RibbonView({model: user}));
    },

    initialize: function() {
        // Global view-specific events
        App.on('modal:open', this.openModal, this);
        App.on('modal:close', this.closeModal, this);
        App.on('toast:show', this.showToast, this);
        App.on('error:toast:show', this.showErrorToast, this);
    },

    openModal: function(view) {
        this.showChildView('modalRegion', view);
    },

    closeModal: function(view) {
        this.getRegion('modalRegion').empty();
    },

    showToast: function(text) {
        toast.success(text);
    },

    showErrorToast: function(text) {
        toast.error(text, "Error");
    },

    onChildviewRegisterHouse: function() {
        this.showChildView('contentRegion', new RegisterHouseView());
    }
});
