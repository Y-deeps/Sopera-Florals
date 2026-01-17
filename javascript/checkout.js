// ================= Checkout Management =================
class CheckoutManager {
    constructor() {
        this.cartItems = JSON.parse(localStorage.getItem('petalbloom-cart')) || [];
        this.promoCode = localStorage.getItem('petalbloom-promo') || '';
        this.selectedPaymentMethod = 'card';
        this.init();
    }

    init() {
        this.loadOrderSummary();
        this.setupEventListeners();
        this.setupFormValidation();
    }

    // ================= Load Order Summary =================
    loadOrderSummary() {
        const orderItems = document.getElementById('order-items');
        if (!orderItems) return;

        if (this.cartItems.length === 0) {
            orderItems.innerHTML = '<p class="empty-message">Your cart is empty</p>';
            this.updateOrderTotals();
            return;
        }

        orderItems.innerHTML = this.cartItems.map(item => `
            <div class="order-item">
                <div class="order-item-info">
                    <div class="order-item-name">${item.name}</div>
                    <div class="order-item-quantity">Qty: ${item.quantity}</div>
                </div>
                <div class="order-item-price">₹${(item.price * item.quantity).toFixed(2)}</div>
            </div>
        `).join('');

        this.updateOrderTotals();
    }

    // ================= Update Order Totals =================
    updateOrderTotals() {
        const subtotal = this.getSubtotal();
        const shipping = this.getShipping();
        const tax = this.getTax();
        const total = this.getTotal();

        document.getElementById('subtotal').textContent = `₹${subtotal.toFixed(2)}`;
        document.getElementById('shipping').textContent = `₹${shipping.toFixed(2)}`;
        document.getElementById('tax').textContent = `₹${tax.toFixed(2)}`;
        document.getElementById('total').textContent = `₹${total.toFixed(2)}`;
    }

    // ================= Calculations =================
    getSubtotal() {
        return this.cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
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
        return subtotal + shipping + tax;
    }

    // ================= Event Listeners =================
    setupEventListeners() {
        // Payment method selection
        document.querySelectorAll('.payment-method').forEach(method => {
            method.addEventListener('click', () => {
                this.selectPaymentMethod(method);
            });
        });

        // Form submission
        const form = document.getElementById('checkout-form');
        if (form) {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                this.processOrder();
            });
        }

        // Card number formatting
        const cardNumber = document.getElementById('cardNumber');
        if (cardNumber) {
            cardNumber.addEventListener('input', (e) => {
                this.formatCardNumber(e.target);
            });
        }

        // Expiry date formatting
        const expiry = document.getElementById('expiry');
        if (expiry) {
            expiry.addEventListener('input', (e) => {
                this.formatExpiryDate(e.target);
            });
        }

        // CVV validation
        const cvv = document.getElementById('cvv');
        if (cvv) {
            cvv.addEventListener('input', (e) => {
                e.target.value = e.target.value.replace(/\D/g, '').slice(0, 4);
            });
        }
    }

    // ================= Payment Method Selection =================
    selectPaymentMethod(methodElement) {
        document.querySelectorAll('.payment-method').forEach(m => {
            m.classList.remove('selected');
        });
        
        methodElement.classList.add('selected');
        this.selectedPaymentMethod = methodElement.dataset.method;

        // Show/hide card form based on payment method
        const cardForm = document.getElementById('card-form');
        if (cardForm) {
            cardForm.style.display = this.selectedPaymentMethod === 'card' ? 'block' : 'none';
        }
    }

    // ================= Form Validation =================
    setupFormValidation() {
        const inputs = document.querySelectorAll('input[required], select[required]');
        inputs.forEach(input => {
            input.addEventListener('blur', () => {
                this.validateField(input);
            });
        });
    }

    validateField(field) {
        const value = field.value.trim();
        let isValid = true;
        let errorMessage = '';

        // Remove existing error
        this.removeFieldError(field);

        if (!value) {
            isValid = false;
            errorMessage = 'This field is required';
        } else {
            // Specific validations
            switch (field.type) {
                case 'email':
                    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    if (!emailRegex.test(value)) {
                        isValid = false;
                        errorMessage = 'Please enter a valid email address';
                    }
                    break;
                case 'tel':
                    const phoneRegex = /^[\d\s\-\+\(\)]+$/;
                    if (!phoneRegex.test(value) || value.length < 10) {
                        isValid = false;
                        errorMessage = 'Please enter a valid phone number';
                    }
                    break;
                case 'text':
                    if (field.id === 'zipCode') {
                        const zipRegex = /^\d{5}(-\d{4})?$/;
                        if (!zipRegex.test(value)) {
                            isValid = false;
                            errorMessage = 'Please enter a valid ZIP code';
                        }
                    }
                    break;
            }
        }

        if (!isValid) {
            this.showFieldError(field, errorMessage);
        }

        return isValid;
    }

    showFieldError(field, message) {
        field.style.borderColor = '#dc3545';
        
        const errorElement = document.createElement('div');
        errorElement.className = 'field-error';
        errorElement.textContent = message;
        errorElement.style.cssText = `
            color: #dc3545;
            font-size: 0.8rem;
            margin-top: 5px;
            font-family: 'Poppins', sans-serif;
        `;
        
        field.parentNode.appendChild(errorElement);
    }

    removeFieldError(field) {
        field.style.borderColor = '';
        const errorElement = field.parentNode.querySelector('.field-error');
        if (errorElement) {
            errorElement.remove();
        }
    }

    // ================= Formatting Functions =================
    formatCardNumber(input) {
        let value = input.value.replace(/\s/g, '');
        let formattedValue = '';
        
        for (let i = 0; i < value.length; i++) {
            if (i > 0 && i % 4 === 0) {
                formattedValue += ' ';
            }
            formattedValue += value[i];
        }
        
        input.value = formattedValue.slice(0, 19); // Max 19 chars (16 digits + 3 spaces)
    }

    formatExpiryDate(input) {
        let value = input.value.replace(/\D/g, '');
        
        if (value.length >= 2) {
            value = value.slice(0, 2) + '/' + value.slice(2, 4);
        }
        
        input.value = value.slice(0, 5); // MM/YY format
    }

    // ================= Order Processing =================
    processOrder() {
        // Validate all required fields
        const requiredFields = document.querySelectorAll('input[required], select[required]');
        let isFormValid = true;

        requiredFields.forEach(field => {
            if (!this.validateField(field)) {
                isFormValid = false;
            }
        });

        // Check terms acceptance
        const termsCheckbox = document.getElementById('terms');
        if (!termsCheckbox.checked) {
            this.showNotification('Please accept the terms and conditions', 'error');
            return;
        }

        if (!isFormValid) {
            this.showNotification('Please fill in all required fields correctly', 'error');
            return;
        }

        if (this.cartItems.length === 0) {
            this.showNotification('Your cart is empty', 'error');
            return;
        }

        // Process payment based on selected method
        this.processPayment();
    }

    processPayment() {
        const placeOrderBtn = document.querySelector('.place-order-btn');
        placeOrderBtn.disabled = true;
        placeOrderBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';

        // Simulate payment processing
        setTimeout(() => {
            this.completeOrder();
        }, 2000);
    }

    completeOrder() {
        // Create order object
        const order = {
            id: this.generateOrderId(),
            date: new Date().toISOString(),
            items: this.cartItems,
            customer: this.getCustomerInfo(),
            payment: {
                method: this.selectedPaymentMethod,
                status: 'completed'
            },
            totals: {
                subtotal: this.getSubtotal(),
                shipping: this.getShipping(),
                tax: this.getTax(),
                total: this.getTotal()
            },
            status: 'confirmed'
        };

        // Save order to localStorage (in real app, this would be sent to server)
        const orders = JSON.parse(localStorage.getItem('petalbloom-orders')) || [];
        orders.push(order);
        localStorage.setItem('petalbloom-orders', JSON.stringify(orders));

        // Clear cart
        localStorage.removeItem('petalbloom-cart');
        localStorage.removeItem('petalbloom-promo');

        // Show success message and redirect
        this.showNotification('Order placed successfully!', 'success');
        
        setTimeout(() => {
            window.location.href = 'order-confirmation.html?orderId=' + order.id;
        }, 1500);
    }

    // ================= Utility Functions =================
    generateOrderId() {
        return 'PB' + Date.now() + Math.random().toString(36).substr(2, 9).toUpperCase();
    }

    getCustomerInfo() {
        return {
            firstName: document.getElementById('firstName').value,
            lastName: document.getElementById('lastName').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            address: {
                street: document.getElementById('address').value,
                city: document.getElementById('city').value,
                state: document.getElementById('state').value,
                zipCode: document.getElementById('zipCode').value,
                country: document.getElementById('country').value
            },
            orderNotes: document.getElementById('orderNotes').value
        };
    }

    showNotification(message, type = 'success') {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: ${type === 'error' ? '#dc3545' : 'linear-gradient(135deg, #28a745, #20c997)'};
            color: white;
            padding: 15px 20px;
            border-radius: 8px;
            box-shadow: var(--shadow-lg);
            z-index: 10000;
            animation: slideInRight 0.3s ease;
            font-family: 'Poppins', sans-serif;
            font-weight: 500;
            max-width: 300px;
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }
}

// ================= Initialize Checkout =================
let checkoutManager;

function initializeCheckoutPage() {
    checkoutManager = new CheckoutManager();
    
    // Update cart count
    const cartItems = JSON.parse(localStorage.getItem('petalbloom-cart')) || [];
    const cartCount = document.getElementById('cart-count');
    if (cartCount) {
        cartCount.textContent = cartItems.reduce((count, item) => count + item.quantity, 0);
    }
}

// ================= Global Function =================
function placeOrder() {
    if (checkoutManager) {
        checkoutManager.processOrder();
    }
}

// Make function globally accessible
window.placeOrder = placeOrder;
