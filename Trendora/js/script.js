// ============================================================
// TRENDORA - JAVASCRIPT (PHASE 3 PREPARATION)
// Shared Product Catalog & Dynamic Page Rendering
// ============================================================

// 1. SHARED PRODUCT CATALOG DATA
const products = [
    {
        id: "1",
        name: "Men's White T-Shirt",
        category: "Men's Clothing",
        price: "₹799",
        image: "images/Men's White T-shirt.jpg",
        description: "Classic crewneck white t-shirt crafted with 100% breathable cotton. Perfect for daily casual wear, lightweight and durable."
    },
    {
        id: "2",
        name: "Woman's Floral Dress",
        category: "Women's Clothing",
        price: "₹1,499",
        image: "images/Woman's floral dress.jpg",
        description: "Elegant floral print summer dress featuring a relaxed silhouette and soft, airy fabric. Ideal for sunny outings and brunch dates."
    },
    {
        id: "3",
        name: "Unisex Jeans",
        category: "Clothing",
        price: "₹1,899",
        image: "images/Unisex jeans.jpg",
        description: "Timeless slim-fit blue denim jeans with classic 5-pocket styling and comfort stretch. Pairs effortlessly with any top or jacket."
    },
    {
        id: "4",
        name: "Woman's Handbag",
        category: "Accessories",
        price: "₹2,199",
        image: "images/Woman's handbag.jpg",
        description: "Premium structured handbag with spacious compartments and elegant hardware. A chic accessory for work and weekend wear."
    },
    {
        id: "5",
        name: "Unisex Sneakers",
        category: "Shoes",
        price: "₹1,999",
        image: "images/Unisex Sneakers.jpg",
        description: "Trendy low-top canvas sneakers with cushioned insoles and durable rubber outsoles. Designed for all-day comfort and street style."
    },
    {
        id: "6",
        name: "Unisex Vintage Brown Leather Watch",
        category: "Accessories",
        price: "₹1,599",
        image: "images/Unisex Vintage Brown Leather Watch.jpg",
        description: "Sophisticated analog wristwatch with a rich brown genuine leather strap and minimalist dial. Adds a classy touch to any attire."
    },
    {
        id: "7",
        name: "Sunglasses",
        category: "Accessories",
        price: "₹999",
        image: "images/Sunglasses.jpg",
        description: "Classic retro sunglasses with polarized UV400 protective lenses and a lightweight dark frame. Shields your eyes with effortless style."
    }
];

// 2. DYNAMIC PRODUCT DETAILS RENDERING
document.addEventListener("DOMContentLoaded", function () {
    const detailImage = document.getElementById("detail-product-image");
    const detailName = document.getElementById("detail-product-name");
    const detailCategory = document.getElementById("detail-product-category");
    const detailPrice = document.getElementById("detail-product-price");
    const detailDescription = document.getElementById("detail-product-description");
    const detailSize = document.getElementById("detail-product-size");

    // Only run if we are on product-details.html
    if (detailImage && detailName) {
        // Read the product ID from URL parameter (e.g., ?id=2)
        const urlParams = new URLSearchParams(window.location.search);
        const productId = urlParams.get("id");

        // Find matching product in catalog; default to product 1 if none matched
        const product = products.find(p => p.id === productId) || products[0];

        if (product) {
            detailImage.src = product.image;
            detailImage.alt = product.name;
            detailName.textContent = product.name;

            if (detailCategory) {
                detailCategory.textContent = product.category;
            }
            if (detailPrice) {
                detailPrice.textContent = product.price;
            }
            if (detailDescription) {
                detailDescription.textContent = product.description;
            }

            // Update size options according to product category
            if (detailSize) {
                if (product.category === "Accessories") {
                    detailSize.innerHTML = `<option value="Free Size">Free Size (Standard)</option>`;
                } else if (product.category === "Shoes") {
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

            // Update page title dynamically
            document.title = `Trendora - ${product.name}`;
        }
    }
});
