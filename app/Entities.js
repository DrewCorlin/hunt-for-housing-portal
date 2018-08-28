import { Backbone } from '../vendor/vendor';
import Urls from "./urls";

export default {
    User: Backbone.Model.extend({
        defaults: {
            loggedIn: false
        }
    }),
    UserLogin: Backbone.Model.extend({
        defaults: {
            username: null,
            password: null
        },
        url: Urls.login
    }),
    UserLogout: Backbone.Model.extend({
        defaults: {
            username: null
        },
        url: Urls.logout
    }),
    HouseRegister: Backbone.Model.extend({
        defaults: {
            address: null,
            zipCode: null,
            rent: null,
            bedrooms: null,
            bathrooms: null,
            parkingSpots: null
        },
        url: Urls.registerHouse
    })
};