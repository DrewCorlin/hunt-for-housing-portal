import { Marionette, App } from '../../vendor/vendor';
import tpl from '../templates/registerHouse.tpl';

export default Marionette.View.extend({
    template: tpl,
    className: "create-house-view",

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
        console.log(inputs);
        if (inputs) {
            console.log("submitting request");
        } else {
            console.log("not submitting");
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
        var inputs = {};
        if (this.$('.js-address-input-text').val().length === 0) {
            this.$('.js-address-input-text').addClass('text-input--error');
            requiredFieldsFilled = false;
        } else {
            inputs.address = this.$('.js-address-input-text').val();
        }

        if (this.$('.js-zipcode-input-text').val().length !== 5 || this._isNotInteger(this.$('.js-zipcode-input-text').val())) {
            this.$('.js-zipcode-input-text').addClass('text-input--error');
            requiredFieldsFilled = false;
        } else {
            inputs.zipcode = parseInt(this.$('.js-zipcode-input-text').val());
        }

        if (this.$('.js-rent-input-text').val().length === 0 || this._isNotInteger(this.$('.js-rent-input-text').val())) {
            this.$('.js-rent-input-text').addClass('text-input--error');
            requiredFieldsFilled = false;
        } else {
            inputs.rent = parseInt(this.$('.js-rent-input-text').val());
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
    },

    _isNotInteger: function(potentialInt) {
        return !(Math.floor(potentialInt) === potentialInt && $.isNumeric(potentialInt));
    }
});
