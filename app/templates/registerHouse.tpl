<input type="text" name="address" placeholder="Address" class="js-address-input-text js-text-input text-input">
<input type="text" name="zip-code" placeholder="Zip Code" class="js-zipcode-input-text js-text-input text-input">
<input type="text" name="rent" placeholder="Monthly Rent" class="js-rent-input-text js-text-input text-input">
<br>

<div class="select-input-container">
    <span class="bedroom-input-container">
        <label for="bedroom-select">Bedrooms</label>
        <select class="js-bedrooms-select js-select-input select-input" id="bedroom-select">
            <% _.each([null, 1, 2, 3, 4, 5], function(option) { %>
                <option value="<%= option %>"><%- option %></option>
            <% }); %>
        </select>
    </span>
    <span class="bathroom-input-container">
        <label for="bathroom-select">Bathrooms</label>
        <select class="js-bathrooms-select js-select-input select-input" id="bathroom-select">
            <% _.each([null, 1, 2, 3], function(option) { %>
                <option value="<%= option %>"><%- option %></option>
            <% }); %>
        </select>
    </span>
    <span class="parking-input-container">
        <label for="parking-select">Parking Spots</label>
        <select class="js-parking-select js-select-input select-input" id="parking-select">
            <% _.each([null, 0, 1, 2, 3, 4], function(option) { %>
                <option value="<%= option %>"><%- option %></option>
            <% }); %>
        </select>
    </span>
</div>
<br>
<div class="checkbox-input-container">
    <input type="checkbox" name="free-washing" id="free-washing" class="js-free-washing-input-checkbox js-checkbox-input">
    <label for="free-washing">Free Washing</label>
    <input type="checkbox" id="useable-basement" name="useable-basement" class="js-useable-basement-checkbox js-checkbox-input">
    <label for="useable-basement">Useable Basement</label>
</div>
<div class="modal-button-container">
    <button class="js-cancel-button cancel-button low-btn">Cancel</button>
    <button class="js-submit-register-house-button med-btn">Register</button>
</div>