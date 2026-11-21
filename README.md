# Trendora — Fashion E-Commerce Website

**Trendora** is a beginner-friendly frontend fashion e-commerce web application inspired by platforms like Myntra. Built using standard web technologies (**HTML5, CSS3, and Vanilla JavaScript**), it provides an interactive shopping experience with persistent cart and wishlist management using browser `localStorage`.

---

## Features

### 1. Homepage (`index.html`)
- Clean header with the brand name and sticky navigation bar.
- Fashion promotional banner with an "Explore Collection" call-to-action button.
- Featured product showcases linking directly to individual detail pages.
- Responsive footer with copyright information.

### 2. Product Catalog (`products.html`)
- **Live Search Bar:** Real-time search by product name.
- **Category Filter Dropdown:** Filter items by Men's Clothing, Women's Clothing, Shoes, and Accessories.
- **Empty State Feedback:** Displays a friendly message when no items match the search query.

### 3. Dynamic Product Details (`product-details.html`)
- Dynamically loads product information (image, name, price, description) using URL query parameters (`?id=X`).
- **Category-Aware Sizing:** Sizes automatically adjust based on category (clothing sizes `S`-`XL`, shoe sizes `UK 7`-`UK 10`, or `Free Size` for accessories).
- Quantity selector and action buttons for adding to Cart or Wishlist.

### 4. Shopping Cart (`cart.html`)
- Stored persistently using browser `localStorage`.
- Prevents duplicate entries by automatically updating the quantity of existing items.
- Controls to increase (`+`), decrease (`-`), or remove items.
- Automatic subtotal calculation formatted in Indian Rupees (₹).
- Empty cart state with navigation back to the product catalog.

### 5. Wishlist (`wishlist.html`)
- Toggle items in and out of the wishlist directly from product detail pages.
- Horizontal responsive grid layout displaying saved items side-by-side.
- Remove button to quickly take items off the wishlist.

### 6. Checkout & Demo Order Confirmation (`checkout.html`)
- Delivery details form with validation for Name, 10-digit Mobile Number, Address, City, and 6-digit PIN Code.
- Live order summary showing items, sizes, quantities, and final total.
- Interactive demo order placement that generates a unique Order ID and confirmation summary.
- Automatically clears the cart upon demo order completion.

---

## Tech Stack

- **HTML5:** Semantic elements (`header`, `nav`, `main`, `section`, `article`, `footer`).
- **CSS3:** Custom styles using a clean **Pink, White, and Black** fashion color palette, Flexbox layouts, and media queries for mobile responsiveness.
- **JavaScript (ES6):** Vanilla JavaScript for DOM manipulation, URL parameter parsing, event handling, and `localStorage` state management.

---

## Project Structure

```text
Trendora/
├── index.html              # Homepage
├── products.html           # Product catalog with search and filters
├── product-details.html    # Dynamic product detail view
├── wishlist.html           # Saved items wishlist
├── cart.html               # Shopping cart with quantity controls
├── checkout.html           # Checkout form and demo order confirmation
├── css/
│   └── style.css           # Global stylesheet (Pink, White, and Black theme)
├── js/
│   └── script.js           # Client-side JavaScript logic
├── images/                 # Banner and product photos
└── README.md               # Project documentation
```

---

## How to Run Locally

1. **Clone the repository:**
   ```bash
   git clone https://github.com/kirtikasinha0806-crypto/Trendora-Myntra-Clone-SRDT.git
   ```
2. **Navigate to the project folder:**
   ```bash
   cd Trendora-Myntra-Clone-SRDT
   ```
3. **Open the website:**
   - Double-click `index.html` to open it directly in any modern browser (Chrome, Edge, Firefox, Safari).
   - Alternatively, start a simple local server:
     ```bash
     # Using Python
     python -m http.server 3000
     ```
     Then open `http://localhost:3000/` in your browser.

---

## Note
This is a frontend demonstration project developed for academic coursework. No real payments, database backends, or shipping services are connected.
