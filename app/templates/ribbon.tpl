<div class="house-interaction-container">
    <button class='js-find-house-button med-btn'>Find</button>
    <button class='js-register-house-button med-btn'>Register</button>
</div>
<div class="account-interaction-container">
        <% if (window.serverSession.authToken) { %> 
            <button class='js-logout-button med-btn'>Logout</button>
        <% } else { %>
            <button class='js-login-button med-btn'>Login</button>
        <% } %>
</div>