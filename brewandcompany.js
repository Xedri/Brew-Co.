let cart = [];

const siteConfig = {
    businessName: "Brew & Co.",
    tagline: "Coffee Made Exquisitely Better.",
    description: "Explore Brew & Co.'s handcrafted coffee, delicious pastries, and signature drinks.",
    menuHeading: "Our Best Sellers",
    aboutHeading: "About Brew & Co.",
    aboutText: "Located in the heart of Bacoor, Cavite, Brew & Co. was built around a simple idea: great coffee shouldn't feel rushed. Whether you're stopping by for a quick takeout iced Spanish latte, catching up with friends over coffee and pastries, or settling into a cozy corner to study or work, we serve freshly roasted espresso and homemade treats made to brighten your day.",
    contactEmail: "",
    location: "",
    currency: "PHP",
    footerText: "Brew & Co. — Website Demo"
};

function applyBranding() {
    const elements = {
        "site-brand": siteConfig.businessName,
        "site-description": siteConfig.description,
        "site-menu-heading": siteConfig.menuHeading,
        "site-about-heading": siteConfig.aboutHeading,
        "site-about-text": siteConfig.aboutText,
        "site-footer": siteConfig.footerText
    };

    Object.entries(elements).forEach(([id, value]) => {
        const element = document.getElementById(id);

        if (element) {
            element.textContent = value;
        }
    });

    // Preserve styled headline spans instead of replacing them with plain text.
    const heroTitle = document.getElementById("site-tagline");
    if (heroTitle) {
        // Headline wording comes from the site configuration, with an italic accent.
        heroTitle.replaceChildren();
        const segments = siteConfig.tagline.split(/(Exquisitely)/i);
        segments.forEach(segment => {
            if (segment.toLowerCase() === "exquisitely") {
                const accent = document.createElement("em");
                accent.textContent = segment;
                heroTitle.appendChild(accent);
            } else if (segment) {
                heroTitle.appendChild(document.createTextNode(segment));
            }
        });
    }

    document.title =
        `${siteConfig.businessName} | Coffee & Pastries`;
}

const products = [
    {
        id: "americano",
        name: "Americano",
        price: 99,
        category: "Coffee",
        description: "Rich espresso with hot water.",
        image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=500&q=80"
    },
    {
        id: "cafe-latte",
        name: "Cafe Latte",
        price: 119,
        category: "Coffee",
        description: "Smooth espresso with steamed milk.",
        image: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&w=500&q=80"
    },
    {
        id: "caramel-macchiato",
        name: "Caramel Macchiato",
        price: 129,
        category: "Coffee",
        description: "Espresso, milk, and caramel.",
        image: "https://images.unsplash.com/photo-1578314675249-a6910f80cc4e?auto=format&fit=crop&w=500&q=80"
    },
    {
        id: "mocha",
        name: "Mocha",
        price: 129,
        category: "Coffee",
        description: "Bold coffee, creamy chocolate.",
        image: "https://images.unsplash.com/photo-1570968915860-54d5c301fa9f?auto=format&fit=crop&w=500&q=80"
    },
    {
        id: "spanish-latte",
        name: "Spanish Latte",
        price: 135,
        category: "Coffee",
        description: "Espresso with condensed and fresh milk.",
        image: "https://images.unsplash.com/photo-1572442388796-11668a67e53d?auto=format&fit=crop&w=500&q=80"
    },
    {
        id: "matcha-latte",
        name: "Matcha Latte",
        price: 139,
        category: "Coffee",
        description: "Matcha with cold milk.",
        image: "https://images.unsplash.com/photo-1515823064-d6e0c04616a7?auto=format&fit=crop&w=500&q=80"
    },
    {
        id: "butter-croissant",
        name: "Butter Croissant",
        price: 85,
        category: "Pastries",
        description: "Flaky, golden-baked French pastry.",
        image: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=500&q=80"
    },
    {
        id: "choco-chip-cookie",
        name: "Choco Chip Cookie",
        price: 65,
        category: "Pastries",
        description: "Soft-baked cookie loaded with dark chocolate.",
        image: "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?auto=format&fit=crop&w=500&q=80"
    },
    {
        id: "blueberry-cheesecake",
        name: "Blueberry Cheesecake",
        price: 115,
        category: "Pastries",
        description: "A cheesecake with soft blueberry-tasting sweetness.",
        image: "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcTJ5y-PY8LyYjFCQNcWHhgRKE0x-NgzIfVIWA2jJstCV3cwTzpV"
    },
    {
        id: "red-velvet-cake",
        name: "Red Velvet Cake",
        price: 125,
        category: "Pastries",
        description: "Soft cake with overwhelming sweetness.",
        image: "https://cdn.apartmenttherapy.info/image/upload/f_auto,q_auto:eco,c_fit,w_730,h_913/k%2FPhoto%2FSeries%2F2022-01_Recipe-Showdown_Red-Velvet-Cake%2F2022-01_Recipe-Showdown_Red-Velvet-Cake_King-Arthur-2022-01-20_ATK0067"
    }
];


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
// Open checkout
function openCheckout() {
    if (cart.length === 0) {
        alert("Please add an item to your order first.");
        return;
    }

    // Update the order summary
    renderCheckoutSummary();

    // Close the shopping cart
    closeCart();

    // Get the checkout dialog
    const modal = document.getElementById("checkout-modal");

    // Open the native dialog
    if (!modal.open) {
        modal.showModal();
    }

    // Move focus to the first input
    document.getElementById("full-name").focus();
}

// Close checkout
function closeCheckout() {
    const modal = document.getElementById("checkout-modal");

    // Close the native dialog
    if (modal.open) {
        modal.close();
    }

    // Return focus to the basket button
    document.getElementById("header-cart-btn").focus();
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


function renderProducts() {
    const menuGrid = document.getElementById("menu-grid");

    if (!menuGrid) {
        console.error("Menu grid not found.");
        return;
    }

    menuGrid.replaceChildren();

  const visibleProducts = products.filter(product => {
    return activeCategory === "All" ||
           product.category === activeCategory;
});

visibleProducts.forEach(product => {
        // Create card
        const card = document.createElement("div");
        card.className = "menu-card";

        // Create image
        const image = document.createElement("img");
        image.src = product.image;
        image.alt = product.name;
        image.width = 600;
        image.height = 600;
        image.loading = "lazy";
        image.decoding = "async";

        // Create product name
        const title = document.createElement("h3");
        title.textContent = product.name;

        // Create description
        const description = document.createElement("p");
        description.textContent = product.description;

        // Create price row
        const priceRow = document.createElement("div");
        priceRow.className = "price-row";

        const price = document.createElement("strong");
        price.textContent = `₱${product.price}`;

        // Create Add to Order button
        const button = document.createElement("button");
        button.type = "button";
        button.textContent = "Add to Order";

        button.addEventListener("click", () => {
            addToOrder(product.name, product.price);
        });

        // Assemble the product card
        priceRow.append(price, button);
        card.append(image, title, description, priceRow);

        // Add the completed card to the menu
        menuGrid.appendChild(card);
    });
}

let activeCategory = "All";

function renderCategoryFilters() {
    const container =
        document.getElementById("category-filters");

    if (!container) return;

    const categories = [
        "All",
        ...new Set(products.map(product => product.category))
    ];

    container.replaceChildren();

    categories.forEach(category => {
        const button = document.createElement("button");

        button.type = "button";
        button.textContent = category;

        const isActive = category === activeCategory;
        button.classList.toggle("active", isActive);
        button.setAttribute("aria-pressed", String(isActive));

        button.addEventListener("click", () => {
            activeCategory = category;
            renderCategoryFilters();
            renderProducts();
        });

        container.appendChild(button);
    });
}

// Initialize the complete menu
function initializeMenu() {
    applyBranding();
    renderCategoryFilters();
    renderProducts();
}

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initializeMenu);
} else {
    initializeMenu();
}