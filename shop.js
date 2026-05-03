// shop.js – renders the product grid and handles filtering

document.addEventListener('DOMContentLoaded', function () {

    var productGrid = document.getElementById('productGrid');
    var filterButtons = document.querySelectorAll('.filter-btn');

    function renderProducts(category) {
        productGrid.innerHTML = '';

        var filtered = products;
        if (category && category !== 'all') {
            filtered = products.filter(function (p) {
                return p.category === category;
            });
        }

        if (filtered.length === 0) {
            productGrid.innerHTML = '<p class="no-results">No products found in this category.</p>';
            return;
        }

        filtered.forEach(function (product) {
            var card = document.createElement('div');
            card.className = 'product-card';
            card.innerHTML =
                '<img src="' + product.image + '" alt="' + product.name + '">' +
                '<h3>' + product.name + '</h3>' +
                '<p class="price">$' + product.price.toFixed(2) + '</p>' +
                '<button class="btn btn-add add-to-cart-btn" data-id="' + product.id + '">Add to Cart</button>';
            productGrid.appendChild(card);
        });

        // Attach event listeners to all new "Add to Cart" buttons
        var addButtons = document.querySelectorAll('.add-to-cart-btn');
        addButtons.forEach(function (btn) {
            btn.addEventListener('click', function () {
                var productId = parseInt(btn.getAttribute('data-id'));
                // Find the product object
                var product = products.find(function (p) {
                    return p.id === productId;
                });
                if (product) {
                    addToCart(product);
                }
            });
        });
    }

    filterButtons.forEach(function (btn) {
        btn.addEventListener('click', function () {
            filterButtons.forEach(function (b) { b.classList.remove('active'); });
            btn.classList.add('active');
            var category = btn.getAttribute('data-category');
            renderProducts(category);
        });
    });

    // Check URL category
    var urlParams = new URLSearchParams(window.location.search);
    var urlCategory = urlParams.get('category');
    if (urlCategory) {
        var initialBtn = document.querySelector('.filter-btn[data-category="' + urlCategory + '"]');
        if (initialBtn) {
            filterButtons.forEach(function (b) { b.classList.remove('active'); });
            initialBtn.classList.add('active');
        }
        renderProducts(urlCategory);
    } else {
        renderProducts('all');
    }
});