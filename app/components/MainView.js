import {Marionette} from '../../vendor/vendor';
import tpl from '../templates/main.tpl';

// var Entities = {};

export default Marionette.View.extend({
    template: tpl,
    className: "main-view",

    regions: {
        contentRegion: ".js-content-region"
    }
});
