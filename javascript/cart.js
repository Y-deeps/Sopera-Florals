// ================= Enhanced Cart Management =================
class CartManager {
    constructor() {
        this.items = JSON.parse(localStorage.getItem('petalbloom-cart')) || [];
        this.promoCode = localStorage.getItem('petalbloom-promo') || '';
        this.promoDiscount = 0;
        this.init();
    }

    init() {
        this.updateCartUI();
        this.setupEventListeners();
        this.loadCartItems();
    }

    // ================= Cart Operations =================
    addItem(product, quantity = 1) {
        const existingItem = this.items.find(item => item.id === product.id);
        
        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            this.items.push({ ...product, quantity });
        }
        
        this.saveCart();
        this.updateCartUI();
        this.showNotification(`${product.name} added to cart!`);
        this.animateCartIcon();
    }

    removeItem(productId) {
        this.items = this.items.filter(item => item.id !== productId);
        this.saveCart();
        this.updateCartUI();
        this.showNotification('Item removed from cart');
    }

    updateQuantity(productId, quantity) {
        const item = this.items.find(item => item.id === productId);
        if (item) {
            item.quantity = Math.max(1, quantity);
            this.saveCart();
            this.updateCartUI();
        }
    }

    clearCart() {
        this.items = [];
        this.saveCart();
        this.updateCartUI();
        this.showNotification('Cart cleared');
    }

    // ================= Cart Calculations =================
    getSubtotal() {
        return this.items.reduce((total, item) => total + (item.price * item.quantity), 0);
    }

    getShipping() {
        const subtotal = this.getSubtotal();
        return subtotal >= 50 ? 0 : 9.99;
    }

    getTax() {
        return this.getSubtotal() * 0.08; // 8% tax
    }

    getTotal() {
        const subtotal = this.getSubtotal();
        const shipping = this.getShipping();
        const tax = this.getTax();
        const discount = this.promoDiscount;
        
        return Math.max(0, subtotal + shipping + tax - discount);
    }

    getItemCount() {
        return this.items.reduce((count, item) => count + item.quantity, 0);
    }

    // ================= Promo Code Management =================
    applyPromoCode(code) {
        const promoCodes = {
            'WELCOME15': 0.15,
            'SPRING20': 0.20,
            'SAVE10': 0.10,
            'FREESHIP': 9.99
        };

        const upperCode = code.toUpperCase();
        if (promoCodes[upperCode]) {
            this.promoCode = upperCode;
            this.promoDiscount = promoCodes[upperCode] * this.getSubtotal();
            localStorage.setItem('petalbloom-promo', upperCode);
            this.updateOrderSummary();
            this.showNotification(`Promo code applied! You saved ₹${this.promoDiscount.toFixed(2)}`);
            return true;
        } else {
            this.showNotification('Invalid promo code', 'error');
            return false;
        }
    }

    removePromoCode() {
        this.promoCode = '';
        this.promoDiscount = 0;
        localStorage.removeItem('petalbloom-promo');
        this.updateOrderSummary();
        this.showNotification('Promo code removed');
    }

    // ================= UI Updates =================
    updateCartUI() {
        const cartCount = document.getElementById('cart-count');
        if (cartCount) {
            cartCount.textContent = this.getItemCount();
        }
    }

    updateOrderSummary() {
        const subtotal = document.getElementById('subtotal');
        const shipping = document.getElementById('shipping');
        const tax = document.getElementById('tax');
        const total = document.getElementById('total');

        if (subtotal) subtotal.textContent = `₹${this.getSubtotal().toFixed(2)}`;
        if (shipping) shipping.textContent = `₹${this.getShipping().toFixed(2)}`;
        if (tax) tax.textContent = `₹${this.getTax().toFixed(2)}`;
        if (total) total.textContent = `₹${this.getTotal().toFixed(2)}`;
    }

    loadCartItems() {
        const cartItems = document.getElementById('cart-items');
        if (!cartItems) return;

        if (this.items.length === 0) {
            cartItems.innerHTML = `
                <div class="empty-cart">
                    <i class="fas fa-shopping-cart"></i>
                    <h2>Your cart is empty</h2>
                    <p>Add some beautiful flowers to get started!</p>
                    <a href="product.html" class="btn btn-primary">Start Shopping</a>
                </div>
            `;
            this.updateOrderSummary();
            return;
        }

        cartItems.innerHTML = this.items.map(item => `
            <div class="cart-item" data-id="${item.id}">
                <div class="cart-item-image">
                    <img src="${item.image}" alt="${item.name}">
                </div>
                <div class="cart-item-details">
                    <h3 class="cart-item-name">${item.name}</h3>
                    <div class="cart-item-price">₹${item.price.toFixed(2)}</div>
                    <div class="cart-item-quantity">
                        <div class="quantity-selector">
                            <button class="quantity-btn minus" onclick="cartManager.updateQuantity(${item.id}, ${item.quantity - 1})">-</button>
                            <input type="number" class="quantity-input" value="${item.quantity}" min="1" max="10" onchange="cartManager.updateQuantity(${item.id}, parseInt(this.value))">
                            <button class="quantity-btn plus" onclick="cartManager.updateQuantity(${item.id}, ${item.quantity + 1})">+</button>
                        </div>
                    </div>
                </div>
                <div class="cart-item-actions">
                    <button class="wishlist-btn" onclick="cartManager.moveToWishlist(${item.id})">
                        <i class="far fa-heart"></i> Save for later
                    </button>
                    <button class="remove-btn" onclick="cartManager.removeItem(${item.id})">
                        <i class="fas fa-trash"></i> Remove
                    </button>
                </div>
            </div>
        `).join('');

        this.updateOrderSummary();
    }

    // ================= Event Listeners =================
    setupEventListeners() {
        // Promo code form
        const promoForm = document.querySelector('.promo-code-form');
        if (promoForm) {
            promoForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const input = document.getElementById('promo-code');
                if (input && input.value.trim()) {
                    this.applyPromoCode(input.value.trim());
                }
            });
        }

        // Checkout button
        const checkoutBtn = document.querySelector('.checkout-btn');
        if (checkoutBtn) {
            checkoutBtn.addEventListener('click', () => {
                if (this.items.length === 0) {
                    this.showNotification('Your cart is empty', 'error');
                    return;
                }
                this.proceedToCheckout();
            });
        }
    }

    // ================= Utility Functions =================
    saveCart() {
        localStorage.setItem('petalbloom-cart', JSON.stringify(this.items));
    }

    animateCartIcon() {
        const cartIcon = document.querySelector('.cart-link');
        if (cartIcon) {
            cartIcon.style.transform = 'scale(1.3)';
            setTimeout(() => {
                cartIcon.style.transform = 'scale(1)';
            }, 300);
        }
    }

    showNotification(message, type = 'success') {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: ${type === 'error' ? '#dc3545' : 'linear-gradient(135deg, var(--primary-color), var(--primary-dark))'};
            color: white;
            padding: 15px 20px;
            border-radius: 8px;
            box-shadow: var(--shadow-lg);
            z-index: 10000;
            animation: slideInRight 0.3s ease;
            font-family: 'Poppins', sans-serif;
            font-weight: 500;
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }

    moveToWishlist(productId) {
        const item = this.items.find(item => item.id === productId);
        if (item) {
            // Add to wishlist (simplified for demo)
            const wishlist = JSON.parse(localStorage.getItem('petalbloom-wishlist')) || [];
            if (!wishlist.find(w => w.id === productId)) {
                wishlist.push(item);
                localStorage.setItem('petalbloom-wishlist', JSON.stringify(wishlist));
                this.removeItem(productId);
                this.showNotification('Moved to wishlist!');
            }
        }
    }

    proceedToCheckout() {
        // In a real app, this would navigate to checkout page
        this.showNotification('Proceeding to checkout...');
        setTimeout(() => {
            window.location.href = 'checkout.html';
        }, 1500);
    }
}

// ================= Initialize Cart =================
let cartManager;

function initializeCartPage() {
    cartManager = new CartManager();
    
    // Load saved promo code if exists
    const savedPromo = localStorage.getItem('petalbloom-promo');
    if (savedPromo) {
        const promoInput = document.getElementById('promo-code');
        if (promoInput) {
            promoInput.value = savedPromo;
        }
        cartManager.applyPromoCode(savedPromo);
    }
}

// ================= Global Functions =================
function applyPromoCode() {
    const input = document.getElementById('promo-code');
    if (input && cartManager) {
        cartManager.applyPromoCode(input.value.trim());
    }
}

function proccedToCheckout() {
    if (cartManager) {
        cartManager.proceedToCheckout();
    }
}

// Make functions globally accessible
window.applyPromoCode = applyPromoCode;
window.proccedToCheckout = proccedToCheckout;
