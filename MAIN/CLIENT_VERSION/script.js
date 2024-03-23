// Sample data for grocery items
const items = [];
const cart = []; // Adding the cart array declaration

// Function to generate random integer within a range
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Generate 50 grocery items
const groceryNames = ['Rice', 'Wheat flour', 'Sugar', 'Salt', 'Dal', 'Tea', 'Coffee', 'Oil', 'Spices', 'Milk', 'Eggs', 'Bread', 'Butter', 'Cheese', 'Fruits', 'Vegetables', 'Pulses', 'Cereals', 'Noodles', 'Pasta', 'Sauce', 'Jam', 'Honey', 'Biscuits', 'Chocolates', 'Snacks', 'Juice', 'Water', 'Soft drinks', 'Ice cream', 'Yogurt', 'Cookies', 'Cakes', 'Bakery items', 'Frozen foods', 'Canned foods', 'Condiments', 'Pickles', 'Vinegar', 'Soy sauce', 'Mayonnaise', 'Ketchup', 'Mustard', 'Salad dressing', 'Syrup', 'Gravy', 'Curry paste', 'Coconut milk'];

for (let i = 0; i < 50; i++) {
    const itemName = groceryNames[Math.floor(Math.random() * groceryNames.length)];
    const inventory = getRandomInt(1, 100);
    const price = getRandomInt(10, 1000);
    const discount = getRandomInt(0, 50);
    items.push({ name: itemName, inventory: inventory, price: price, discount: discount });
}

document.addEventListener('DOMContentLoaded', function() {
    const cartOverlay = document.querySelector('.cart-overlay');
    const cartText = document.querySelector('.cart-text');

    // Show/hide cart overlay when cart text is clicked
    cartText.addEventListener('click', function() {
        cartOverlay.classList.toggle('show');
    });

    // Close the cart overlay when clicking outside of it
    window.addEventListener('click', function(event) {
        if (!event.target.closest('.cart') && !event.target.closest('.cart-text')) {
            cartOverlay.classList.remove('show');
        }
    });

    // Display initial items
    displayItems();
});

// Function to display items
function displayItems() {
    const itemsContainer = document.querySelector('.items-container');
    itemsContainer.innerHTML = '';

    items.forEach(item => {
        const itemDiv = document.createElement('div');
        itemDiv.classList.add('item');
        itemDiv.innerHTML = `
            <h3>${item.name}</h3>
            <p>Inventory: ${item.inventory}</p>
            <p>Price: ₹${item.price}</p>
            <p>Discount: ${item.discount}%</p>
            <button onclick="addToCart('${item.name}', ${item.price}, ${item.discount})">Add to Cart</button>
        `;
        itemsContainer.appendChild(itemDiv);
    });
}

// Function to search items
function searchItems() {
    const searchTerm = document.getElementById('search').value.toLowerCase();
    const filteredItems = items.filter(item => item.name.toLowerCase().includes(searchTerm));
    if (filteredItems.length > 0) {
        displayFilteredItems(filteredItems);
    } else {
        alert('No matching items found.');
    }
}

// Function to display filtered items
function displayFilteredItems(filteredItems) {
    const itemsContainer = document.querySelector('.items-container');
    itemsContainer.innerHTML = '';

    filteredItems.forEach(item => {
        const itemDiv = document.createElement('div');
        itemDiv.classList.add('item');
        itemDiv.innerHTML = `
            <h3>${item.name}</h3>
            <p>Inventory: ${item.inventory}</p>
            <p>Price: ₹${item.price}</p>
            <p>Discount: ${item.discount}%</p>
            <button onclick="addToCart('${item.name}', ${item.price}, ${item.discount})">Add to Cart</button>
        `;
        itemsContainer.appendChild(itemDiv);
    });
}

// Function to add items to the cart
function addToCart(name, price, discount) {
    const itemTotalPrice = price - (price * discount / 100);

    const cartItemDiv = document.createElement('div');
    cartItemDiv.classList.add('cart-item');
    cartItemDiv.innerHTML = `<p>${name}</p><p>Price: ₹${itemTotalPrice}</p>`;
    cartItems.appendChild(cartItemDiv);

    updateCartCount();
    updateTotalPrice(itemTotalPrice);
}

// Function to update cart count
function updateCartCount() {
    const cartCount = document.querySelector('.cart-count');
    const itemCount = document.querySelectorAll('.cart-item').length;
    cartCount.textContent = itemCount;
}

// Function to update total price
function updateTotalPrice(itemTotalPrice) {
    const totalPriceElement = document.getElementById('totalPrice');
    const discountedPriceElement = document.getElementById('discountedPrice');

    let totalPrice = parseFloat(totalPriceElement.textContent);
    let discountedPrice = parseFloat(discountedPriceElement.textContent);

    totalPrice += itemTotalPrice;
    discountedPrice += itemTotalPrice * (1 - discount / 100);

    totalPriceElement.textContent = totalPrice.toFixed(2);
    discountedPriceElement.textContent = discountedPrice.toFixed(2);
}

// Function to toggle cart visibility
function toggleCart() {
    const cartOverlay = document.getElementById('cartOverlay');
    cartOverlay.classList.toggle('show');
}

// Initial display of items
displayItems();

// Function to add item to cart
function addToCart(name, price, discount) {
    const item = { name: name, price: price, discount: discount };
    cart.push(item);
    showCart();
    // alert('Item added to cart.');
}

// Function to display cart items
function showCart() {
    const cartPage = document.querySelector('.cart-page');
    // cartPage.style.display = 'block';

    const cartItemsDiv = document.querySelector('.cart-items');
    cartItemsDiv.innerHTML = '';

    let totalPrice = 0;
    let discountedPrice = 0;

    cart.forEach(item => {
        const cartItemDiv = document.createElement('div');
        cartItemDiv.classList.add('cart-item');
        cartItemDiv.innerHTML = `
            <p>${item.name} - ₹${item.price}</p>`;
        cartItemsDiv.appendChild(cartItemDiv);
        totalPrice += item.price;
        discountedPrice += item.price * ((100 - item.discount) / 100);
    });

    document.getElementById('totalPrice').innerText = totalPrice;
    document.getElementById('discountedPrice').innerText = discountedPrice;
}

// Function to checkout (dummy function for now)
function checkout() {
    alert('Checkout functionality will be implemented later.');
}