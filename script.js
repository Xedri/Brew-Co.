
// ========================================
// 1. SHOPPING CART DATA
// ========================================

const cart = {};


// ========================================
// 2. FIND HTML ELEMENTS
// ========================================

const cartDisplay = document.querySelector("#cart-count");

const cartItemsDisplay = document.querySelector("#cart-items");

const cartTotalDisplay = document.querySelector("#cart-total");

const orderButtons = document.querySelectorAll(".add-to-cart");

const checkoutForm = document.querySelector("#checkout-form");

const confirmationDisplay =
    document.querySelector("#order-confirmation");


// ========================================
// 3. ADD PRODUCTS TO CART
// ========================================

orderButtons.forEach(function(button) {

    button.addEventListener("click", function() {

        const name = button.dataset.name;
        const price = Number(button.dataset.price);

        if (!cart[name]) {

            cart[name] = {
                price: price,
                quantity: 0
            };

        }

        cart[name].quantity++;

        updateCart();

    });

});


// ========================================
// 4. CREATE CART CONTROL BUTTONS
// ========================================

function createCartButton(label, action, name) {

    const button = document.createElement("button");

    button.type = "button";
    button.textContent = label;
    button.className = "cart-control";

    button.dataset.action = action;
    button.dataset.name = name;

    if (action === "remove") {
        button.classList.add("remove-control");
    }

    return button;

}


// ========================================
// 5. HANDLE CART BUTTON CLICKS
// ========================================

cartItemsDisplay.addEventListener("click", function(event) {

    const button = event.target.closest("button[data-action]");

    if (!button) {
        return;
    }

    const name = button.dataset.name;
    const action = button.dataset.action;

    if (!cart[name]) {
        return;
    }

    if (action === "increase") {

        cart[name].quantity++;

    }

    else if (action === "decrease") {

        cart[name].quantity--;

        if (cart[name].quantity <= 0) {
            delete cart[name];
        }

    }

    else if (action === "remove") {

        delete cart[name];

    }

    updateCart();

});


// ========================================
// 6. UPDATE SHOPPING CART
// ========================================

function updateCart() {

    let totalItems = 0;
    let totalPrice = 0;

    cartItemsDisplay.replaceChildren();

    const productNames = Object.keys(cart);

    // CHECK IF CART IS EMPTY

    if (productNames.length === 0) {

        const emptyMessage = document.createElement("li");

        emptyMessage.textContent = "Your cart is empty.";

        cartItemsDisplay.appendChild(emptyMessage);

    }

    // DISPLAY EACH PRODUCT

    productNames.forEach(function(name) {

        const product = cart[name];

        const subtotal = product.price * product.quantity;

        totalItems += product.quantity;
        totalPrice += subtotal;

        const listItem = document.createElement("li");

        listItem.className = "cart-item";

        const productDetails = document.createElement("span");

        productDetails.textContent =
            name + " x " + product.quantity +
            " — ₱" + subtotal.toFixed(2);


        // CREATE CONTROLS

        const controls = document.createElement("div");

        controls.className = "cart-controls";

        const decreaseButton =
            createCartButton("−", "decrease", name);

        const increaseButton =
            createCartButton("+", "increase", name);

        const removeButton =
            createCartButton("Remove", "remove", name);


        // ADD CONTROLS TO PRODUCT

        controls.append(
            decreaseButton,
            increaseButton,
            removeButton
        );

        listItem.append(productDetails, controls);

        cartItemsDisplay.appendChild(listItem);

    });


    // UPDATE TOTAL ITEMS

    cartDisplay.textContent = totalItems;


    // UPDATE TOTAL PRICE

    cartTotalDisplay.textContent =
        "₱" + totalPrice.toFixed(2);

} // IMPORTANT: updateCart ENDS HERE!


// ========================================
// 7. HANDLE CHECKOUT FORM
// ========================================

checkoutForm.addEventListener("submit", function(event) {

    event.preventDefault();


    // CHECK IF CART IS EMPTY

    const productNames = Object.keys(cart);

    if (productNames.length === 0) {

        alert("Your shopping cart is empty!");

        return;

    }


    // GET CUSTOMER INFORMATION

    const formData = new FormData(checkoutForm);

    const customerName =
        String(formData.get("customerName") || "").trim();

    const customerPhone =
        String(formData.get("customerPhone") || "").trim();

    const orderType =
        formData.get("orderType");


    // CREATE CONFIRMATION CONTENT

    confirmationDisplay.replaceChildren();

    const heading = document.createElement("h3");

    heading.textContent =
        "Thank you, " + customerName + "!";

    confirmationDisplay.appendChild(heading);


    const message = document.createElement("p");

    message.textContent =
        "Your demo order has been prepared.";

    confirmationDisplay.appendChild(message);


    const contact = document.createElement("p");

    contact.textContent =
        "Contact: " + customerPhone;

    confirmationDisplay.appendChild(contact);


    const type = document.createElement("p");

    type.textContent =
        "Order type: " + orderType;

    confirmationDisplay.appendChild(type);


    // CREATE ORDER SUMMARY

    const summaryHeading =
        document.createElement("h4");

    summaryHeading.textContent = "Order Summary";

    confirmationDisplay.appendChild(summaryHeading);


    let finalTotal = 0;

    productNames.forEach(function(name) {

        const product = cart[name];

        const subtotal =
            product.price * product.quantity;

        finalTotal += subtotal;

        const item = document.createElement("p");

        item.textContent =
            name + " x " + product.quantity +
            " — ₱" + subtotal.toFixed(2);

        confirmationDisplay.appendChild(item);

    });


    // DISPLAY FINAL TOTAL

    const total = document.createElement("h3");

    total.textContent =
        "Total: ₱" + finalTotal.toFixed(2);

    confirmationDisplay.appendChild(total);


    // SHOW CONFIRMATION

    confirmationDisplay.hidden = false;


    // CLEAR SHOPPING CART

    productNames.forEach(function(name) {

        delete cart[name];

    });


    updateCart();

    checkoutForm.reset();

});


// ========================================
// 8. INITIALIZE EMPTY CART
// ========================================

updateCart();
