// cart.js – shopping cart management

// Get the cart array from localStorage (or an empty array if nothing is stored)
function getCart() {
    return JSON.parse(localStorage.getItem('petCart') || '[]');
}

// Save the cart array to localStorage
function saveCart(cart) {
    localStorage.setItem('petCart', JSON.stringify(cart));
}

// Add a product to the cart by its full product object
function addToCart(product) {
    var cart = getCart();
    // Check if product already exists
    var existing = cart.find(function (item) {
        return item.id === product.id;
    });
    if (existing) {
        existing.quantity += 1;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: 1
        });
    }
    saveCart(cart);
    updateCartBadge();
    // Optional: small animation feedback – we'll add a simple alert for now
    alert(product.name + ' added to cart!');
}

// Update the cart badge number in the header
function updateCartBadge() {
    var cart = getCart();
    var count = 0;
    cart.forEach(function (item) {
        count += item.quantity;
    });
    var badge = document.getElementById('cartBadge');
    if (badge) {
        badge.textContent = count;
    }
}

// Remove an item from the cart by id
function removeFromCart(id) {
    var cart = getCart().filter(function (item) {
        return item.id !== id;
    });
    saveCart(cart);
    updateCartBadge();
}

// Change the quantity of an item (positive number; if 0 it will be removed)
function updateQuantity(id, newQuantity) {
    var cart = getCart();
    var item = cart.find(function (item) {
        return item.id === id;
    });
    if (item) {
        if (newQuantity <= 0) {
            removeFromCart(id);
        } else {
            item.quantity = newQuantity;
            saveCart(cart);
            updateCartBadge();
        }
    }
}