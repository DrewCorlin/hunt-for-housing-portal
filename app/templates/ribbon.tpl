<div class="house-interaction-container">
    <button class='js-find-house-button btn'>Find</button>
    <button class='js-register-house-button btn'>Register</button>
</div>
<div class="account-interaction-container">
    <button class='js-login-button btn'>
        <% if (loggedIn) { %> 
        Logout
        <% } else { %>
        Login
        <% } %>
    </button>
</div>