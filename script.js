document.addEventListener("DOMContentLoaded", () => {
    const addToCartButtons = document.querySelectorAll(".add-to-cart");

    // Fetch existing cart items from local storage or initialize an empty array
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    // Function to save the cart to local storage
    function saveCart() {
        localStorage.setItem("cart", JSON.stringify(cart));
    }

    // Add event listeners to all "Add to Cart" buttons
    addToCartButtons.forEach(button => {
        button.addEventListener("click", () => {
            const productContainer = button.parentElement; // Get the product container
            const name = button.dataset.name; // Get product name
            const price = parseFloat(button.dataset.price); // Get product price
            const image = productContainer.querySelector("img").src; // Get product image source

            // Check if the item is already in the cart
            const existingItem = cart.find(item => item.name === name);
            if (existingItem) {
                existingItem.quantity++; // If it exists, just increment the quantity
            } else {
                // Otherwise, add a new item to the cart
                cart.push({
                    name: name,
                    price: price,
                    image: image,
                    quantity: 1,
                });
            }

            // Save the updated cart to local storage
            saveCart();

            // Notify the user
            alert(`${name} has been added to your cart!`);
        });
    });
});
