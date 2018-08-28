import { Marionette, App } from '../../vendor/vendor';
import tpl from '../templates/registerHouse.tpl';

export default Marionette.View.extend({
    template: tpl,
    className: 'create-house-view',

    events: {
        'click .js-parking-input-checkbox': 'onChangeParkingCheckbox',
        'click .js-submit-register-house-button': 'onSubmitRegister',
        'click .js-cancel-button': 'onCancel'
    },

    onChangeParkingCheckbox: function() {
        if (this.$('.js-parking-input-checkbox').is(':checked')) {
            this.$('.js-parking-select').removeClass('select-input--disabled').prop('disabled', false);
        } else {
            this.$('.js-parking-select').addClass('select-input--disabled').prop('disabled', true);
        }
    },

    onCancel: function() {
        App.trigger("modal:close");
    },

    onSubmitRegister: function() {
        var inputs = this._validateAndCollectInput();
        if (inputs) {
            var registerHouse = App.request('house:register', inputs);
            registerHouse.done(function(response) {
                App.trigger('toast:show', "Successfully registered house");
            }).fail(function(response) {
                App.trigger('error:toast:show', response.responseText);
            });
        } else {
            App.trigger('error:toast:show', 'Must complete all required fields');
        }
    },

    _validateAndCollectInput: function() {
        this.$('.js-text-input').each(function() {
            $(this).removeClass('text-input--error');
        });
        this.$('.js-select-input').each(function() {
            $(this).removeClass('select-input--error');
        });
        var requiredFieldsFilled = true;
        var inputs = { // All set to null for clarity of what is being passed around
            address: null,
            zipCode: null,
            rent: null,
            bedrooms: null,
            bathrooms: null,
            parkingSpots: null
        };

        var addressInput = this.$('.js-address-input-text').val();
        if (addressInput.length === 0) {
            this.$('.js-address-input-text').addClass('text-input--error');
            requiredFieldsFilled = false;
        } else {
            inputs.address = addressInput;
        }
        var zipcodeInput = this.$('.js-zipcode-input-text').val();
        if (zipcodeInput.length !== 5 || parseInt(zipcodeInput) === NaN) {
            this.$('.js-zipcode-input-text').addClass('text-input--error');
            requiredFieldsFilled = false;
        } else {
            inputs.zipCode = parseInt(zipcodeInput);
        }

        var rentInput = this.$('.js-rent-input-text').val().replace('$', '').replace(',', '');
        if (rentInput.length === 0 || parseInt(rentInput) === NaN) {
            this.$('.js-rent-input-text').addClass('text-input--error');
            requiredFieldsFilled = false;
        } else {
            inputs.rent = parseInt(rentInput);
        }
        inputs.freeWashing = this.$('.js-free-washing-input-checkbox').is(':checked');
        inputs.useableBasement = this.$('.js-useable-basement-input-checkbox').is(':checked');

        if (this.$('.js-bedrooms-select').val() === "") {
            this.$('.js-bedrooms-select').addClass('select-input--error');
            requiredFieldsFilled = false;
        } else {
            inputs.bedrooms = parseInt(this.$('.js-bedrooms-select').val());
        }

        if (this.$('.js-bathrooms-select').val() === "") {
            this.$('.js-bathrooms-select').addClass('select-input--error');
            requiredFieldsFilled = false;
        } else {
            inputs.bathrooms = this.$('.js-bathrooms-select').val();
        }

        if (this.$('.js-parking-select').val() === "") {
            this.$('.js-parking-select').addClass('select-input--error');
            requiredFieldsFilled = false;
        } else {
            inputs.parkingSpots = parseInt(this.$('.js-parking-select').val());
        }

        return requiredFieldsFilled ? inputs : null;
    }
});
