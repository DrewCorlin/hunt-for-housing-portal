import {Marionette} from '../../vendor/vendor';
import MainView from './MainView';

export default Marionette.Application.extend({
    region: '#app',

    onStart() {
        this.showView(new MainView());
    }
});
