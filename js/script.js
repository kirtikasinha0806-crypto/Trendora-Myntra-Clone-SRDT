// Products data
const products = [
    {
        id: "1",
        name: "Men's White T-Shirt",
        category: "men",
        categoryName: "Men's Clothing",
        price: 799,
        image: "images/Men's White T-shirt.jpg",
        description: "Classic crewneck white t-shirt crafted with 100% breathable cotton. Perfect for daily casual wear, lightweight and durable."
    },
    {
        id: "2",
        name: "Woman's Floral Dress",
        category: "women",
        categoryName: "Women's Clothing",
        price: 1499,
        image: "images/Woman's floral dress.jpg",
        description: "Elegant floral print summer dress featuring a relaxed silhouette and soft, airy fabric. Ideal for sunny outings and brunch dates."
    },
    {
        id: "3",
        name: "Unisex Jeans",
        category: "men",
        categoryName: "Clothing",
        price: 1899,
        image: "images/Unisex jeans.jpg",
        description: "Timeless slim-fit blue denim jeans with classic 5-pocket styling and comfort stretch. Pairs effortlessly with any top or jacket."
    },
    {
        id: "4",
        name: "Woman's Handbag",
        category: "accessories",
        categoryName: "Accessories",
        price: 2199,
        image: "images/Woman's handbag.jpg",
        description: "Premium structured handbag with spacious compartments and elegant hardware. A chic accessory for work and weekend wear."
    },
    {
        id: "5",
        name: "Unisex Sneakers",
        category: "shoes",
        categoryName: "Shoes",
        price: 1999,
        image: "images/Unisex Sneakers.jpg",
        description: "Trendy low-top canvas sneakers with cushioned insoles and durable rubber outsoles. Designed for all-day comfort and street style."
    },
    {
        id: "6",
        name: "Unisex Vintage Brown Leather Watch",
        category: "accessories",
        categoryName: "Accessories",
        price: 1599,
        image: "images/Unisex Vintage Brown Leather Watch.jpg",
        description: "Sophisticated analog wristwatch with a rich brown genuine leather strap and minimalist dial. Adds a classy touch to any attire."
    },
    {
        id: "7",
        name: "Sunglasses",
        category: "accessories",
        categoryName: "Accessories",
        price: 999,
        image: "images/Sunglasses.jpg",
        description: "Classic retro sunglasses with polarized UV400 protective lenses and a lightweight dark frame. Shields your eyes with effortless style."
    }
];

// Get cart from localStorage
function getCart() {
    const cart = localStorage.getItem("trendora_cart");
    return cart ? JSON.parse(cart) : [];
}

// Save cart to localStorage
function saveCart(cart) {
    localStorage.setItem("trendora_cart", JSON.stringify(cart));
    updateNavBadges();
}

// Get wishlist from localStorage
function getWishlist() {
    const wishlist = localStorage.getItem("trendora_wishlist");
    return wishlist ? JSON.parse(wishlist) : [];
}

// Save wishlist to localStorage
function saveWishlist(wishlist) {
    localStorage.setItem("trendora_wishlist", JSON.stringify(wishlist));
    updateNavBadges();
}

// Update cart and wishlist count in navbar
function updateNavBadges() {
    const cart = getCart();
    const wishlist = getWishlist();

    let totalCartCount = 0;
    for (let i = 0; i < cart.length; i++) {
        totalCartCount += cart[i].quantity;
    }

    const wishlistCount = wishlist.length;

    const navLinks = document.querySelectorAll("header nav ul li a");
    navLinks.forEach(function (link) {
        const href = link.getAttribute("href");
        if (href && href.includes("wishlist.html")) {
            link.textContent = wishlistCount > 0 ? `Wishlist (${wishlistCount})` : "Wishlist";
        }
        if (href && href.includes("cart.html")) {
            link.textContent = totalCartCount > 0 ? `Cart (${totalCartCount})` : "Cart";
        }
    });
}

// Search and category filter on products page
function setupProductSearchAndFilter() {
    const searchInput = document.getElementById("product-search");
    const categorySelect = document.getElementById("category-select");
    const searchForm = document.querySelector("section form");
    const catalogSection = document.querySelector("section:has(article)");
    const productArticles = document.querySelectorAll("section article");

    if (!searchInput || !categorySelect || productArticles.length === 0) {
        return;
    }

    // Stop form from refreshing page on enter
    if (searchForm) {
        searchForm.addEventListener("submit", function (e) {
            e.preventDefault();
        });
    }

    // Message when no products found
    let noProductsMessage = document.getElementById("no-products-message");
    if (!noProductsMessage && catalogSection) {
        noProductsMessage = document.createElement("p");
        noProductsMessage.id = "no-products-message";
        noProductsMessage.textContent = "No products found matching your search. Try another keyword or category.";
        noProductsMessage.style.display = "none";
        catalogSection.appendChild(noProductsMessage);
    }

    // Filter products based on search and category
    function filterProducts() {
        const searchTerm = searchInput.value.trim().toLowerCase();
        const selectedCategory = categorySelect.value;
        let visibleCount = 0;

        productArticles.forEach(function (article) {
            const titleElement = article.querySelector("h4");
            const productName = titleElement ? titleElement.textContent.toLowerCase() : "";
            const articleCategory = article.getAttribute("data-category");

            let matchesCategory = false;
            if (selectedCategory === "all") {
                matchesCategory = true;
            } else if (articleCategory === selectedCategory) {
                matchesCategory = true;
            } else if (article.id === "product-3" && (selectedCategory === "men" || selectedCategory === "women")) {
                matchesCategory = true;
            }

            const matchesSearch = productName.includes(searchTerm);

            if (matchesCategory && matchesSearch) {
                article.style.display = "flex";
                visibleCount++;
            } else {
                article.style.display = "none";
            }
        });

        if (noProductsMessage) {
            noProductsMessage.style.display = visibleCount === 0 ? "block" : "none";
        }
    }

    searchInput.addEventListener("input", filterProducts);
    categorySelect.addEventListener("change", filterProducts);
}

// Product details page
function setupProductDetails() {
    const detailImage = document.getElementById("detail-product-image");
    const detailName = document.getElementById("detail-product-name");
    const detailCategory = document.getElementById("detail-product-category");
    const detailPrice = document.getElementById("detail-product-price");
    const detailDescription = document.getElementById("detail-product-description");
    const detailSize = document.getElementById("detail-product-size");
    const detailQuantity = document.getElementById("detail-product-quantity");
    const addToCartBtn = document.getElementById("add-to-cart-btn");
    const addToWishlistBtn = document.getElementById("add-to-wishlist-btn");

    if (!detailImage || !detailName) {
        return;
    }

    // Get id from url
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get("id");

    const product = products.find(function (p) {
        return p.id === productId;
    }) || products[0];

    // Show product details
    detailImage.src = product.image;
    detailImage.alt = product.name;
    detailName.textContent = product.name;

    if (detailCategory) {
        detailCategory.textContent = product.categoryName;
    }
    if (detailPrice) {
        detailPrice.textContent = "₹" + product.price.toLocaleString("en-IN");
    }
    if (detailDescription) {
        detailDescription.textContent = product.description;
    }

    document.title = "Trendora - " + product.name;

    // Set size options based on product type
    if (detailSize) {
        if (product.category === "accessories") {
            detailSize.innerHTML = '<option value="Free Size">Free Size (Standard)</option>';
        } else if (product.category === "shoes") {
            detailSize.innerHTML = `
                <option value="UK 7">UK 7</option>
                <option value="UK 8">UK 8</option>
                <option value="UK 9">UK 9</option>
                <option value="UK 10">UK 10</option>
            `;
        } else {
            detailSize.innerHTML = `
                <option value="S">S - Small</option>
                <option value="M">M - Medium</option>
                <option value="L">L - Large</option>
                <option value="XL">XL - Extra Large</option>
            `;
        }
    }

    // Check if product is in wishlist
    function updateWishlistButtonState() {
        if (!addToWishlistBtn) return;
        const wishlist = getWishlist();
        const isSaved = wishlist.includes(product.id);

        if (isSaved) {
            addToWishlistBtn.textContent = "♥ In Wishlist";
            addToWishlistBtn.style.backgroundColor = "#ff3f6c";
            addToWishlistBtn.style.color = "#ffffff";
        } else {
            addToWishlistBtn.textContent = "Add to Wishlist";
            addToWishlistBtn.style.backgroundColor = "#ffffff";
            addToWishlistBtn.style.color = "#ff3f6c";
        }
    }
    updateWishlistButtonState();

    // Add to cart button click
    if (addToCartBtn) {
        addToCartBtn.addEventListener("click", function () {
            let quantity = 1;
            if (detailQuantity) {
                quantity = parseInt(detailQuantity.value, 10);
                if (isNaN(quantity) || quantity < 1) {
                    alert("Please select a valid quantity (at least 1).");
                    return;
                }
            }

            const selectedSize = detailSize ? detailSize.value : "Standard";
            const cart = getCart();

            // Check if product with same size is already in cart
            const existingItem = cart.find(function (item) {
                return item.id === product.id && item.size === selectedSize;
            });

            if (existingItem) {
                existingItem.quantity += quantity;
            } else {
                cart.push({
                    id: product.id,
                    name: product.name,
                    price: product.price,
                    image: product.image,
                    size: selectedSize,
                    quantity: quantity
                });
            }

            saveCart(cart);

            const originalText = addToCartBtn.textContent;
            addToCartBtn.textContent = "✓ Added to Cart!";
            setTimeout(function () {
                addToCartBtn.textContent = originalText;
            }, 1500);

            alert(`${product.name} (Size: ${selectedSize}, Qty: ${quantity}) has been added to your cart!`);
        });
    }

    // Add or remove from wishlist
    if (addToWishlistBtn) {
        addToWishlistBtn.addEventListener("click", function () {
            let wishlist = getWishlist();
            const index = wishlist.indexOf(product.id);

            if (index > -1) {
                wishlist.splice(index, 1);
                saveWishlist(wishlist);
                updateWishlistButtonState();
                alert(`${product.name} has been removed from your wishlist.`);
            } else {
                wishlist.push(product.id);
                saveWishlist(wishlist);
                updateWishlistButtonState();
                alert(`${product.name} has been added to your wishlist!`);
            }
        });
    }
}

// Shopping cart page
function setupCartPage() {
    const emptyCartMessage = document.getElementById("empty-cart-message");
    const cartItemsContainer = document.getElementById("cart-items-container");
    const cartSummary = document.getElementById("cart-summary");
    const subtotalPriceEl = document.getElementById("cart-subtotal-price");
    const proceedCheckoutBtn = document.querySelector('a[href="checkout.html"]');

    if (!cartItemsContainer || !emptyCartMessage || !cartSummary) {
        return;
    }

    // Display cart items and calculate subtotal
    function renderCart() {
        const cart = getCart();

        if (cart.length === 0) {
            emptyCartMessage.style.display = "block";
            cartItemsContainer.style.display = "none";
            cartSummary.style.display = "none";
            if (subtotalPriceEl) {
                subtotalPriceEl.textContent = "₹0";
            }
            return;
        }

        emptyCartMessage.style.display = "none";
        cartItemsContainer.style.display = "block";
        cartSummary.style.display = "block";

        let itemsHtml = "<h3>Cart Items</h3>";
        let subtotal = 0;

        cart.forEach(function (item, index) {
            const itemTotal = item.price * item.quantity;
            subtotal += itemTotal;

            itemsHtml += `
                <div class="cart-item">
                    <img src="${item.image}" alt="${item.name}" class="cart-item-image">
                    <div class="cart-item-details">
                        <h4>${item.name}</h4>
                        <p>Size: <strong>${item.size}</strong></p>
                        <p>Price: ₹${item.price.toLocaleString("en-IN")}</p>
                    </div>
                    <div class="cart-item-qty">
                        <button type="button" class="qty-btn" onclick="changeCartItemQuantity(${index}, -1)" title="Decrease quantity">-</button>
                        <span class="qty-val">${item.quantity}</span>
                        <button type="button" class="qty-btn" onclick="changeCartItemQuantity(${index}, 1)" title="Increase quantity">+</button>
                    </div>
                    <div class="cart-item-price">
                        ₹${itemTotal.toLocaleString("en-IN")}
                    </div>
                    <div>
                        <button type="button" class="remove-btn" onclick="removeCartItem(${index})">Remove</button>
                    </div>
                </div>
            `;
        });

        cartItemsContainer.innerHTML = itemsHtml;

        if (subtotalPriceEl) {
            subtotalPriceEl.textContent = "₹" + subtotal.toLocaleString("en-IN");
        }
    }

    // Stop checkout click if cart is empty
    if (proceedCheckoutBtn) {
        proceedCheckoutBtn.addEventListener("click", function (e) {
            const cart = getCart();
            if (cart.length === 0) {
                e.preventDefault();
                alert("Your shopping cart is empty! Please add products before proceeding to checkout.");
            }
        });
    }

    // Change quantity of cart item
    window.changeCartItemQuantity = function (index, delta) {
        const cart = getCart();
        if (cart[index]) {
            cart[index].quantity += delta;
            if (cart[index].quantity <= 0) {
                const confirmRemove = confirm(`Remove ${cart[index].name} from your cart?`);
                if (confirmRemove) {
                    cart.splice(index, 1);
                } else {
                    cart[index].quantity = 1;
                }
            } else if (cart[index].quantity > 10) {
                alert("Maximum limit of 10 items reached for this product.");
                cart[index].quantity = 10;
            }
            saveCart(cart);
            renderCart();
        }
    };

    // Remove item from cart
    window.removeCartItem = function (index) {
        const cart = getCart();
        if (cart[index]) {
            const removedItem = cart.splice(index, 1);
            saveCart(cart);
            renderCart();
            if (removedItem.length > 0) {
                alert(`${removedItem[0].name} removed from your cart.`);
            }
        }
    };

    renderCart();
}

// Wishlist page
function setupWishlistPage() {
    const emptyWishlistMessage = document.getElementById("empty-wishlist-message");
    const wishlistItemsContainer = document.getElementById("wishlist-items-container");

    if (!emptyWishlistMessage || !wishlistItemsContainer) {
        return;
    }

    // Show saved items
    function renderWishlist() {
        const wishlistIds = getWishlist();

        const savedProducts = products.filter(function (product) {
            return wishlistIds.includes(product.id);
        });

        if (savedProducts.length === 0) {
            emptyWishlistMessage.style.display = "block";
            wishlistItemsContainer.style.display = "none";
            wishlistItemsContainer.innerHTML = `
                <h3>Saved Items</h3>
                <p><em>No items saved yet. Browse our collection to add your favorite products!</em></p>
            `;
            return;
        }

        emptyWishlistMessage.style.display = "none";
        wishlistItemsContainer.style.display = "flex";

        let cardsHtml = "<h3>Saved Items</h3>";

        savedProducts.forEach(function (product) {
            cardsHtml += `
                <article id="wishlist-item-${product.id}">
                    <img src="${product.image}" alt="${product.name}" width="200">
                    <h4>${product.name}</h4>
                    <p>Category: ${product.categoryName}</p>
                    <p>Price: ₹${product.price.toLocaleString("en-IN")}</p>
                    <p><a href="product-details.html?id=${product.id}">View Details</a></p>
                    <button type="button" class="wishlist-remove-btn" onclick="removeFromWishlist('${product.id}')">Remove</button>
                </article>
            `;
        });

        wishlistItemsContainer.innerHTML = cardsHtml;
    }

    // Remove product from wishlist
    window.removeFromWishlist = function (productId) {
        let wishlist = getWishlist();
        const index = wishlist.indexOf(productId);
        if (index > -1) {
            wishlist.splice(index, 1);
            saveWishlist(wishlist);
            renderWishlist();
        }
    };

    renderWishlist();
}

// Checkout page
function setupCheckoutPage() {
    const checkoutForm = document.getElementById("checkout-form");
    const checkoutItemsPreview = document.getElementById("checkout-items-preview");
    const checkoutTotalAmountEl = document.getElementById("checkout-total-amount");
    const placeDemoOrderBtn = document.getElementById("place-demo-order-btn");
    const demoConfirmationContainer = document.getElementById("demo-confirmation-container");
    const orderSummarySection = document.getElementById("order-summary-section");
    const deliveryFormSection = checkoutForm ? checkoutForm.closest("section") : null;
    const returnToCartLink = document.querySelector('main > p:has(a[href="cart.html"])') || document.querySelector('a[href="cart.html"]');

    if (!checkoutItemsPreview || !placeDemoOrderBtn || !demoConfirmationContainer) {
        return;
    }

    const cart = getCart();

    // Show order summary from cart
    if (cart.length === 0) {
        checkoutItemsPreview.innerHTML = `
            <p><em>Your cart is currently empty.</em></p>
            <p><a href="products.html">Browse products</a> to add items before checking out.</p>
        `;
        if (checkoutTotalAmountEl) {
            checkoutTotalAmountEl.textContent = "₹0";
        }
    } else {
        let previewHtml = "";
        let total = 0;

        cart.forEach(function (item) {
            const itemTotal = item.price * item.quantity;
            total += itemTotal;
            previewHtml += `
                <div class="checkout-item-row">
                    <span>${item.name} (Size: ${item.size}) &times; ${item.quantity}</span>
                    <strong>₹${itemTotal.toLocaleString("en-IN")}</strong>
                </div>
            `;
        });

        checkoutItemsPreview.innerHTML = previewHtml;

        if (checkoutTotalAmountEl) {
            checkoutTotalAmountEl.textContent = "₹" + total.toLocaleString("en-IN");
        }
    }

    // Place demo order click
    placeDemoOrderBtn.addEventListener("click", function () {
        const currentCart = getCart();

        if (currentCart.length === 0) {
            alert("Your shopping cart is empty! Please add products before placing an order.");
            return;
        }

        // Form field validations
        const nameInput = document.getElementById("customer-name");
        const phoneInput = document.getElementById("customer-phone");
        const addressInput = document.getElementById("customer-address");
        const cityInput = document.getElementById("customer-city");
        const pincodeInput = document.getElementById("customer-pincode");

        const name = nameInput ? nameInput.value.trim() : "";
        const phone = phoneInput ? phoneInput.value.trim() : "";
        const address = addressInput ? addressInput.value.trim() : "";
        const city = cityInput ? cityInput.value.trim() : "";
        const pincode = pincodeInput ? pincodeInput.value.trim() : "";

        if (!name) {
            alert("Please enter your full name.");
            if (nameInput) nameInput.focus();
            return;
        }

        const phoneDigits = phone.replace(/\D/g, "");
        if (phoneDigits.length < 10) {
            alert("Please enter a valid 10-digit mobile number.");
            if (phoneInput) phoneInput.focus();
            return;
        }

        if (!address) {
            alert("Please enter your delivery address.");
            if (addressInput) addressInput.focus();
            return;
        }

        if (!city) {
            alert("Please enter your city / town.");
            if (cityInput) cityInput.focus();
            return;
        }

        const pinDigits = pincode.replace(/\D/g, "");
        if (pinDigits.length !== 6) {
            alert("Please enter a valid 6-digit PIN code.");
            if (pincodeInput) pincodeInput.focus();
            return;
        }

        // Calculate total amount
        let totalAmount = 0;
        currentCart.forEach(function (item) {
            totalAmount += item.price * item.quantity;
        });

        const demoOrderId = "TRD-" + Math.floor(100000 + Math.random() * 900000);

        // Hide form and summary
        if (deliveryFormSection) {
            deliveryFormSection.style.display = "none";
        }
        if (orderSummarySection) {
            orderSummarySection.style.display = "none";
        }
        if (returnToCartLink) {
            returnToCartLink.style.display = "none";
        }

        // Show confirmation details
        demoConfirmationContainer.innerHTML = `
            <h3>Demo Order Confirmed!</h3>
            <p><strong>Order ID:</strong> ${demoOrderId}</p>
            <p>Thank you, <strong>${name}</strong>! Your demo order has been placed successfully.</p>
            <p><strong>Delivery Address:</strong> ${address}, ${city} - ${pincode}</p>
            <p><strong>Contact Phone:</strong> +91 ${phoneDigits}</p>
            <p><strong>Total Amount:</strong> ₹${totalAmount.toLocaleString("en-IN")} (Cash on Delivery)</p>
            <br>
            <p><a href="products.html">Continue Shopping</a></p>
        `;

        demoConfirmationContainer.hidden = false;
        demoConfirmationContainer.style.display = "block";

        // Clear cart
        localStorage.removeItem("trendora_cart");
        updateNavBadges();

        demoConfirmationContainer.scrollIntoView({ behavior: "smooth" });
    });
}

// Run functions when page loads
document.addEventListener("DOMContentLoaded", function () {
    updateNavBadges();
    setupProductSearchAndFilter();
    setupProductDetails();
    setupCartPage();
    setupWishlistPage();
    setupCheckoutPage();
});
