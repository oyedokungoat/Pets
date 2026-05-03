// main.js – basic interactivity for the pet store

document.addEventListener('DOMContentLoaded', function () {

    // ---- MOBILE MENU TOGGLE ----
    var menuToggle = document.getElementById('menuToggle');
    var mainNav = document.getElementById('mainNav');

    if (menuToggle && mainNav) {
        menuToggle.addEventListener('click', function () {
            mainNav.classList.toggle('open');
        });
    }

    // ---- RANDOM WELLNESS TIP ----
    var tips = [
        "Keep fresh water available for your pets at all times.",
        "Regular vet check-ups keep your furry friend happy.",
        "A balanced diet is the key to a shiny coat.",
        "Exercise your dog daily for a healthy heart.",
        "Cats love vertical spaces – add a cat tree!"
    ];
    var tipElement = document.getElementById('dailyTip');
    if (tipElement) {
        var randomIndex = Math.floor(Math.random() * tips.length);
        tipElement.textContent = tips[randomIndex];
    }

    // ---- CART BADGE (read from localStorage) ----
    updateCartBadge();

    // ---- VIEW TOGGLE (basic) ----
    var viewToggle = document.getElementById('viewToggle');
    if (viewToggle) {
        viewToggle.addEventListener('click', function (e) {
            if (e.target.tagName === 'BUTTON') {
                var view = e.target.dataset.view;
                // remove 'active' from all buttons
                var buttons = viewToggle.querySelectorAll('button');
                for (var i = 0; i < buttons.length; i++) {
                    buttons[i].classList.remove('active');
                }
                e.target.classList.add('active');
                console.log('View mode changed to: ' + view);
                // Later we will add classes to the body to change layout
            }
        });
    }

});

// Function to update the cart badge number
function updateCartBadge() {
    var cart = JSON.parse(localStorage.getItem('petCart') || '[]');
    var count = 0;
    for (var i = 0; i < cart.length; i++) {
        count += cart[i].quantity;
    }
    var badge = document.getElementById('cartBadge');
    if (badge) {
        badge.textContent = count;
    }
}