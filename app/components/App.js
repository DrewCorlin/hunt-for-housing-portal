import {Marionette} from '../../vendor/vendor';
import BaseView from './BaseView';

export default Marionette.Application.extend({
    region: '#app',

    onStart() {
        window.serverSession = {'authToken': null};
        this.showView(new BaseView());
    }
});
