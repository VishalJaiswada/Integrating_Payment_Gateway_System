document.addEventListener("DOMContentLoaded", () => {
    // Fetch the cart items from local storage or set an empty array if no items are found
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    // Ensure every item in the cart has a valid quantity property
    cart = cart.map(item => ({
        ...item,
        quantity: item.quantity || 1, // Default quantity is 1 if undefined
    }));

    // Get references to cart elements in the HTML
    const cartItems = document.getElementById("cart-items");
    const totalPriceEl = document.getElementById("total-price");
    const checkoutButton = document.getElementById("checkout-button");

    // Function to display the cart items
    function displayCart() {
        cartItems.innerHTML = ""; // Clear existing cart items
        let totalPrice = 0; // Initialize total price

        cart.forEach((item, index) => {
            // Create a container for each cart item
            const itemContainer = document.createElement("div");
            itemContainer.classList.add("cart-item");

            // Add the item image
            const itemImage = document.createElement("img");
            itemImage.src = item.image;
            itemImage.alt = item.name;

            // Add item details (name and price)
            const itemDetails = document.createElement("div");
            itemDetails.classList.add("item-details");
            itemDetails.innerHTML = `
                <h3>${item.name}</h3>
                <p>Price: $${item.price.toFixed(2)}</p>
            `;

            // Add quantity controls (+ and - buttons)
            const quantityControls = document.createElement("div");
            quantityControls.classList.add("quantity-controls");
            quantityControls.innerHTML = `
                <button class="decrease-qty" data-index="${index}">-</button>
                <span class="quantity">${item.quantity}</span>
                <button class="increase-qty" data-index="${index}">+</button>
            `;

            // Add a remove button
            const removeButton = document.createElement("button");
            removeButton.classList.add("remove-item");
            removeButton.textContent = "Remove";
            removeButton.dataset.index = index;

            // Append everything to the item container
            itemContainer.appendChild(itemImage);
            itemContainer.appendChild(itemDetails);
            itemContainer.appendChild(quantityControls);
            itemContainer.appendChild(removeButton);

            // Add the item container to the cart
            cartItems.appendChild(itemContainer);

            // Update the total price
            totalPrice += item.price * item.quantity;
        });

        // Update the total price in the HTML
        totalPriceEl.textContent = totalPrice.toFixed(2);
    }

    // Function to save the cart to local storage
    function saveCart() {
        localStorage.setItem("cart", JSON.stringify(cart));
    }

    // Event listener for quantity controls
    cartItems.addEventListener("click", (e) => {
        const index = parseInt(e.target.dataset.index, 10);

        // Increase quantity
        if (e.target.classList.contains("increase-qty")) {
            cart[index].quantity++;
        }

        // Decrease quantity
        if (e.target.classList.contains("decrease-qty")) {
            if (cart[index].quantity > 1) {
                cart[index].quantity--;
            } else {
                alert("Quantity cannot be less than 1. Use the remove button if you want to delete the item.");
            }
        }

        // Remove item
        if (e.target.classList.contains("remove-item")) {
            cart.splice(index, 1);
        }

        // Update cart display and save changes
        displayCart();
        saveCart();
    });

    // Checkout functionality
    checkoutButton.addEventListener("click", () => {
        if (cart.length === 0) {
            alert("Your cart is empty! Please add items before checking out.");
            return;
        }

        alert("Thank you for your purchase! Total: $" + totalPriceEl.textContent);
        localStorage.removeItem("cart"); // Clear cart data
        cart = []; // Reset cart array
        displayCart(); // Update the cart UI
        window.location.href = "index.html"; // Redirect to the home page
    });

    // Display the cart items on page load
    displayCart();
});
