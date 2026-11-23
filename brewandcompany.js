let cart = [];

// Open shopping cart
function openCart() {
    const cartDrawer = document.getElementById("cart-drawer");
    const cartBackdrop = document.getElementById("cart-backdrop");

    // Make the drawer interactive
    cartDrawer.removeAttribute("inert");
    cartDrawer.setAttribute("aria-hidden", "false");

    // Open the cart and backdrop
    cartDrawer.classList.add("open");
    cartBackdrop.classList.add("open");

    // Move keyboard focus into the cart
    cartDrawer.querySelector(".close-cart-btn").focus();
}

// Close shopping cart
function closeCart() {
    const cartDrawer = document.getElementById("cart-drawer");
    const cartBackdrop = document.getElementById("cart-backdrop");

    // Return focus to the basket button
    document.getElementById("header-cart-btn").focus();

    // Close the cart and backdrop
    cartDrawer.classList.remove("open");
    cartBackdrop.classList.remove("open");

    // Prevent interaction with the closed cart
    cartDrawer.setAttribute("inert", "");
    cartDrawer.setAttribute("aria-hidden", "true");
}

// Animate cart button
function pulseCartBadge() {
    const cartBtn = document.getElementById("header-cart-btn");

    cartBtn.classList.remove("pulse");
    void cartBtn.offsetWidth;
    cartBtn.classList.add("pulse");
}

// Add item to cart
function addToOrder(itemName, price) {
    const existingItem = cart.find(item => item.name === itemName);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            name: itemName,
            price: price,
            quantity: 1
        });
    }

    renderCart();
    pulseCartBadge();
}

// Increase quantity
function increaseQuantity(index) {
    if (cart[index]) {
        cart[index].quantity += 1;
    }

    renderCart();
}

// Decrease quantity
function decreaseQuantity(index) {
    if (!cart[index]) return;

    cart[index].quantity -= 1;

    if (cart[index].quantity <= 0) {
        cart.splice(index, 1);
    }

    renderCart();
}

// Remove item
function removeFromOrder(index) {
    cart.splice(index, 1);
    renderCart();
}

// Render cart
function renderCart() {
    const cartList = document.getElementById("cart-list");
    const itemCountEl = document.getElementById("item-count");
    const totalPriceEl = document.getElementById("total-price");
    const proceedBtn = document.getElementById("proceed-checkout-btn");

    const totalItems = cart.reduce(
        (sum, item) => sum + item.quantity,
        0
    );

    const totalAmount = cart.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );

    itemCountEl.textContent = totalItems;
    itemCountEl.classList.toggle("hidden", totalItems === 0);

    totalPriceEl.textContent = totalAmount.toFixed(2);
    proceedBtn.disabled = cart.length === 0;

    cartList.innerHTML = "";

    if (cart.length === 0) {
        const emptyMessage = document.createElement("li");
        emptyMessage.className = "empty-msg";
        emptyMessage.textContent = "Your cart is empty.";

        cartList.appendChild(emptyMessage);
        return;
    }

    cart.forEach((item, index) => {
        const li = document.createElement("li");

        // Item name and price
        const itemInfo = document.createElement("div");
        itemInfo.className = "cart-item-info";

        const itemName = document.createElement("span");
        itemName.textContent = item.name;

        const itemPrice = document.createElement("span");
        itemPrice.textContent =
            "₱" + (item.price * item.quantity).toFixed(2);

        itemInfo.append(itemName, itemPrice);

        // Controls
        const controls = document.createElement("div");
        controls.className = "cart-item-controls";

        const quantityControls = document.createElement("div");
        quantityControls.className = "quantity-controls";

        // Decrease button
        const decreaseBtn = document.createElement("button");
        decreaseBtn.type = "button";
        decreaseBtn.className = "quantity-btn";
        decreaseBtn.textContent = "−";
        decreaseBtn.setAttribute(
            "aria-label",
            "Decrease " + item.name + " quantity"
        );
        decreaseBtn.addEventListener("click", () => {
            decreaseQuantity(index);
        });

        // Quantity number
        const quantityNumber = document.createElement("span");
        quantityNumber.className = "quantity-number";
        quantityNumber.textContent = item.quantity;

        // Increase button
        const increaseBtn = document.createElement("button");
        increaseBtn.type = "button";
        increaseBtn.className = "quantity-btn";
        increaseBtn.textContent = "+";
        increaseBtn.setAttribute(
            "aria-label",
            "Increase " + item.name + " quantity"
        );
        increaseBtn.addEventListener("click", () => {
            increaseQuantity(index);
        });

        quantityControls.append(
            decreaseBtn,
            quantityNumber,
            increaseBtn
        );

        // Remove button
        const removeBtn = document.createElement("button");
        removeBtn.type = "button";
        removeBtn.className = "remove-btn";
        removeBtn.textContent = "Remove";
        removeBtn.addEventListener("click", () => {
            removeFromOrder(index);
        });

        controls.append(quantityControls, removeBtn);
        li.append(itemInfo, controls);

        cartList.appendChild(li);
    });
}

// Open checkout
function openCheckout() {
    if (cart.length === 0) {
        alert("Please add an item to your order first.");
        return;
    }

    renderCheckoutSummary();
    closeCart();

    const modal = document.getElementById("checkout-modal");
    modal.classList.add("open");
    modal.setAttribute("aria-hidden", "false");
}

// Close checkout
function closeCheckout() {
    const modal = document.getElementById("checkout-modal");

    modal.classList.remove("open");
    modal.setAttribute("aria-hidden", "true");
}

let checkoutReturnFocus = null;

function showCheckoutDialog() {
    const dialog = document.getElementById("checkout-modal");

    checkoutReturnFocus = document.activeElement;

    if (!dialog.open) {
        dialog.showModal();
    }

    document.getElementById("full-name").focus();
}

function hideCheckoutDialog() {
    const dialog = document.getElementById("checkout-modal");

    if (dialog.open) {
        dialog.close();
    }

    if (checkoutReturnFocus &&
        checkoutReturnFocus.isConnected &&
        !checkoutReturnFocus.closest("[inert]")) {
        checkoutReturnFocus.focus();
    } else {
        document.getElementById("header-cart-btn").focus();
    }
}

// Render checkout summary
function renderCheckoutSummary() {
    const summaryList = document.getElementById("checkout-summary");
    const checkoutTotal = document.getElementById("checkout-total");

    summaryList.innerHTML = "";

    const totalAmount = cart.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );

    cart.forEach(item => {
        const li = document.createElement("li");

        const description = document.createElement("span");
        description.textContent =
            item.name + " × " + item.quantity;

        const price = document.createElement("span");
        price.textContent =
            "₱" + (item.price * item.quantity).toFixed(2);

        li.append(description, price);
        summaryList.appendChild(li);
    });

    checkoutTotal.textContent = totalAmount.toFixed(2);
}

// Place demo order
function placeOrder(event) {
    event.preventDefault();

    if (cart.length === 0) {
        alert("Please add an item to your order first.");
        closeCheckout();
        return;
    }

    const fullName = document.getElementById("full-name").value.trim();
    const contactNumber = document.getElementById("contact-number").value.trim();
    const orderType = document.getElementById("order-type").value;

    const totalAmount = cart.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );

    alert(
        "Thank you, " + fullName + "!\n\n" +
        "Contact Number: " + contactNumber + "\n" +
        "Order Type: " + orderType + "\n" +
        "Total: ₱" + totalAmount.toFixed(2) + "\n\n" +
        "Your demo order has been received."
    );

    cart = [];

    renderCart();

    document.getElementById("checkout-form").reset();

    closeCheckout();
}

// Close checkout when clicking outside
document.getElementById("checkout-modal").addEventListener(
    "click",
    function(event) {
        if (event.target === this) {
            closeCheckout();
        }
    }
);

// Initial cart display
renderCart();

