/// Suppose you have an array to store the added cart items
let cart = [];

// Function to add an item to the cart
function addToCart(product) {
    // Check if the product is already in the cart
    const existingProduct = cart.find(item => item.id === product.id);
    if (existingProduct) {
        existingProduct.quantity += 1; // Increase the quantity if it's already in the cart
    } else {
        product.quantity = 1; // Set the quantity to 1 for a new item
        cart.push(product);
    }
    localStorage.setItem('cart', JSON.stringify(cart)); // Store the cart in the localStorage
    displayCart(); // Update the cart display
}

// Function to display the cart content on the "panier.html" page
function displayCart() {
    cart = JSON.parse(localStorage.getItem('cart')); // Get the cart object from the localStorage
    const cartItemsContainer = document.querySelector("#cart-items");
    cartItemsContainer.innerHTML = ''; // Clear the container
    let total = 0;
    let htmlContent = '';

    // Loop through the items in the cart
    cart.forEach((item, index) => {
        total += item.price * item.quantity; // Calculate total price
        // Create HTML content for each cart item
        htmlContent += `
            <div class="cart-item">
                    <img src="${product.image}" alt="${product.name}" width="100" height="100">
                    <span>${product.name}</span>
                    <span>${product.quantity}</span>
                    <span>${product.price} €</span>
                    <button onclick="removeFromCart(${index})">Remove</button>
                    </div>
            `;
    });

    // Add the items to the cart container
    cartItemsContainer.innerHTML = htmlContent;
    // Display the total
    cartItemsContainer.innerHTML += `<div class="total">Total: ${total.toFixed(2)} €</div>`;
}

// Function to remove an item from the cart
function removeFromCart(index) {
    cart[index].quantity -= 1;
    if (cart[index].quantity <= 0) {
        cart.splice(index, 1); // Remove the item if the quantity is 0
    }
    displayCart(); // Update the cart display
}

document.addEventListener('DOMContentLoaded', function() {
    displayCart(); // Assurez-vous que cette fonction est définie dans votre scripts.js
});


// Add event listener to the "Add to Cart" button in the product details page
document.getElementById('add-to-cart-btn').addEventListener('click', function() {
    const product = {
        image: productImage,
        id: productId, // You'll need to ensure productId is defined
        name: productName,
        price: parseFloat(productPrice.replace('Prix : ', '')), // Convert the price to a number
        // Add other product details as needed
    };
    addToCart(product);
});

