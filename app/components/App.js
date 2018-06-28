import {Marionette} from '../../vendor/vendor';
import BaseView from './BaseView';

export default Marionette.Application.extend({
    region: '#app',

    onStart() {
        this.showView(new BaseView());
    }
});
