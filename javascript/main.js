// ================= User Authentication & Profile =================
// Initialize user profile on page load
document.addEventListener('DOMContentLoaded', function() {
    // Create default admin user if not exists
    createDefaultAdminUser();
    updateUserProfile();
});

function createDefaultAdminUser() {
    let users = JSON.parse(localStorage.getItem('users') || '[]');
    const targetAdminEmail = '322103210177.deepthi@gvpcew.ac.in';
    
    // Find existing admin user
    let adminUser = users.find(u => u.email === targetAdminEmail);
    
    if (!adminUser) {
        // Remove any old admin users
        users = users.filter(u => !u.email.includes('admin@soperaflorals.com'));
        
        // Create new admin user
        const defaultAdmin = {
            name: 'Admin1',
            email: targetAdminEmail,
            phone: '9123456789',
            password: 'Admin@123',
            createdAt: new Date().toISOString()
        };
        users.push(defaultAdmin);
        localStorage.setItem('users', JSON.stringify(users));
    } else {
        // Update existing admin user to ensure correct password
        adminUser.password = 'Admin@123';
        localStorage.setItem('users', JSON.stringify(users));
    }
}

function updateUserProfile() {
    const userMenu = document.getElementById('user-menu');
    if (!userMenu) return;

    const isLoggedIn = sessionStorage.getItem('isLoggedIn') === 'true';
    const userEmail = sessionStorage.getItem('userEmail');
    
    if (isLoggedIn && userEmail) {
        // Get user data from localStorage
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        const user = users.find(u => u.email === userEmail);
        
        if (user) {
            // Check if user is admin
            const isAdmin = userEmail.includes('admin') || userEmail === '322103210177.deepthi@gvpcew.ac.in';
            
            // Hide Shop and Cart for admin users
            if (isAdmin) {
                hideShopAndCartForAdmin();
            }
            
            userMenu.innerHTML = `
                <div class="user-profile">
                    <div class="user-avatar" onclick="toggleUserDropdown()">
                        <i class="fas fa-user"></i>
                        <span class="user-name">${user.name.split(' ')[0]}</span>
                        <i class="fas fa-chevron-down"></i>
                    </div>
                    <div class="user-dropdown" id="user-dropdown">
                        <div class="user-info">
                            <div class="user-avatar-large">
                                <i class="fas fa-user"></i>
                            </div>
                            <div class="user-details">
                                <p class="user-name-full">${user.name}</p>
                                <p class="user-email">${user.email}</p>
                                ${isAdmin ? '<span class="admin-badge"><i class="fas fa-shield-alt"></i> Admin</span>' : ''}
                            </div>
                        </div>
                        <div class="dropdown-divider"></div>
                        <ul class="user-menu-items">
                            <li><a href="profile.html"><i class="fas fa-user"></i> My Profile</a></li>
                            <li><a href="#" onclick="showMyOrders()"><i class="fas fa-shopping-bag"></i> My Orders</a></li>
                            <li><a href="#" onclick="showMyWishlist()"><i class="fas fa-heart"></i> Wishlist</a></li>
                            <li><a href="#" onclick="showSettings()"><i class="fas fa-cog"></i> Settings</a></li>
                            ${isAdmin ? '<li><a href="html/admin.html" onclick="goToAdmin()" style="color: #667eea;"><i class="fas fa-shield-alt"></i> Admin Dashboard</a></li>' : ''}
                        </ul>
                        <div class="dropdown-divider"></div>
                        <button class="logout-btn" onclick="logout()">
                            <i class="fas fa-sign-out-alt"></i> Sign Out
                        </button>
                    </div>
                </div>
            `;
        }
    } else {
        // Show Sign In button
        userMenu.innerHTML = `
            <a href="html/signin.html" class="signin-btn">
                <i class="fas fa-user"></i> Sign In
            </a>
        `;
    }
}

function hideShopAndCartForAdmin() {
    // Hide Shop dropdown
    const shopDropdown = document.querySelector('li.dropdown');
    if (shopDropdown) {
        shopDropdown.style.display = 'none';
    }
    
    // Hide Cart link
    const cartLink = document.querySelector('a[href*="cart"]');
    if (cartLink) {
        cartLink.parentElement.style.display = 'none';
    }
}

function toggleUserDropdown() {
    const dropdown = document.getElementById('user-dropdown');
    if (dropdown) {
        dropdown.classList.toggle('show');
    }
}

// Close dropdown when clicking outside
document.addEventListener('click', function(event) {
    const userMenu = document.getElementById('user-menu');
    const dropdown = document.getElementById('user-dropdown');
    
    if (userMenu && !userMenu.contains(event.target) && dropdown) {
        dropdown.classList.remove('show');
    }
});

function logout() {
    // Clear session storage
    sessionStorage.removeItem('isLoggedIn');
    sessionStorage.removeItem('userEmail');
    
    // Show Shop and Cart sections again
    showShopAndCartForAll();
    
    // Update UI
    updateUserProfile();
    showNotification('You have been logged out successfully!', 'success');
    
    // Redirect to home page after a short delay
    setTimeout(() => {
        window.location.href = '../index.html';
    }, 1500);
}

function showShopAndCartForAll() {
    // Show Shop dropdown
    const shopDropdown = document.querySelector('li.dropdown');
    if (shopDropdown) {
        shopDropdown.style.display = 'block';
    }
    
    // Show Cart link
    const cartLink = document.querySelector('a[href*="cart"]');
    if (cartLink) {
        cartLink.parentElement.style.display = 'block';
    }
}

function showMyProfile() {
    const userEmail = sessionStorage.getItem('userEmail');
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find(u => u.email === userEmail);
    
    if (user) {
        showNotification(`Welcome, ${user.name}! Profile page coming soon.`, 'info');
    }
    toggleUserDropdown();
}

function showMyOrders() {
    showNotification('Your orders will be displayed here. Orders page coming soon!', 'info');
    toggleUserDropdown();
}

function showMyWishlist() {
    showNotification('Your wishlist will be displayed here. Wishlist page coming soon!', 'info');
    toggleUserDropdown();
}

function showSettings() {
    showNotification('Account settings page coming soon!', 'info');
    toggleUserDropdown();
}

function goToAdmin() {
    // Redirect to admin login page
    window.location.href = 'html/admin-login.html';
    toggleUserDropdown();
}

function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type} animate__animated animate__fadeInDown`;
    notification.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
        <span>${message}</span>
    `;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.add('animate__fadeOutUp');
        setTimeout(() => {
            if (document.body.contains(notification)) {
                document.body.removeChild(notification);
            }
        }, 1000);
    }, 3000);
}

// ================= Product Data =================
// Load products from admin-managed data or use default products
function loadProductsFromAdmin() {
    const adminProducts = localStorage.getItem('sopera-products-main');
    if (adminProducts) {
        return JSON.parse(adminProducts);
    }
    
    // Default products if no admin data exists
    return [
    {
        id: 1,
        name: "Fresh Marigold Garland",
        price: 299.00,
        image: "https://i.pinimg.com/736x/9b/58/cd/9b58cd7dc81466ee89a422b8146e51a7.jpg",
        category: "marigold",
        badge: "Popular",
        description: "Traditional yellow marigold garland for pooja and festivals",
        rating: 4.8,
        reviews: 127
    },
    {
        id: 2,
        name: "Jasmine String",
        price: 199.00,
        image: "https://i.pinimg.com/736x/a0/0d/a7/a00da7fafc108b7cb0552766d57e994d.jpg",
        category: "jasmine",
        badge: "Fresh",
        description: "Pure jasmine strings for daily worship and decoration",
        rating: 4.9,
        reviews: 89
    },
    {
        id: 3,
        name: "Pooja Thali Set",
        price: 899.00,
        image: "https://i.pinimg.com/474x/e5/6b/80/e56b803c12fa0f57aaa7d8b08ae66833.jpg",
        category: "pooja",
        badge: "Complete Set",
        description: "Complete pooja thali with all essential items",
        rating: 4.7,
        reviews: 156
    },
    {
        id: 4,
        name: "Sorrow & Condolences Bundles",
        price: 799.00,
        image: "https://i.pinimg.com/736x/22/01/6a/22016a1aaaf36bc0743d9af28ecfc44f.jpg",
        category: "general",
        badge: "Sympathy",
        description: "Thoughtful condolence flower arrangements for expressing sympathy",
        rating: 4.8,
        reviews: 92
    },
    {
        id: 5,
        name: "Red Rose Bouquet",
        price: 599.00,
        image: "https://i.pinimg.com/736x/e4/d3/aa/e4d3aa56ef5b14b5339c114cd8c5d052.jpg",
        category: "roses",
        badge: "Premium",
        description: "Fresh red roses for special occasions",
        rating: 4.8,
        reviews: 178
    },
    {
        id: 6,
        name: "Fresh Lilies",
        price: 649.00,
        image: "https://i.pinimg.com/736x/f5/22/f1/f522f1a61c378c9b8b16a3f049ce87ab.jpg",
        category: "general",
        badge: "Elegant",
        description: "Beautiful fresh lilies for elegant arrangements",
        rating: 4.9,
        reviews: 145
    },
    {
        id: 7,
        name: "Flower Basket",
        price: 799.00,
        image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400",
        category: "marigold",
        badge: "Festival Special",
        description: "Mixed flower basket for home decoration",
        rating: 4.9,
        reviews: 145
    },
    {
        id: 8,
        name: "Pooja Kalash",
        price: 349.00,
        image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400",
        category: "pooja",
        badge: "Essential",
        description: "Silver plated kalash for religious ceremonies",
        rating: 4.7,
        reviews: 98
    },
    {
        id: 9,
        name: "Lotus Flowers",
        price: 649.00,
        image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400",
        category: "general",
        badge: "Sacred",
        description: "Fresh lotus flowers for spiritual ceremonies",
        rating: 4.9,
        reviews: 167
    },
    {
        id: 10,
        name: "Mogra Garland",
        price: 399.00,
        image: "https://images.unsplash.com/photo-1560837926-4b3c9c4b5f3e?w=400",
        category: "jasmine",
        badge: "Traditional",
        description: "Traditional mogra garlands for special occasions",
        rating: 4.8,
        reviews: 189
    }
]};

// Initialize products variable
let products = loadProductsFromAdmin();

// ================= Shopping Cart Management =================
class ShoppingCart {
    constructor() {
        this.items = JSON.parse(localStorage.getItem('petalbloom-cart')) || [];
        this.updateCartUI();
    }

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

    getTotal() {
        return this.items.reduce((total, item) => total + (item.price * item.quantity), 0);
    }

    getItemCount() {
        return this.items.reduce((count, item) => count + item.quantity, 0);
    }

    saveCart() {
        localStorage.setItem('petalbloom-cart', JSON.stringify(this.items));
    }

    updateCartUI() {
        const cartCount = document.getElementById('cart-count');
        if (cartCount) {
            cartCount.textContent = this.getItemCount();
        }
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

    showNotification(message) {
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: linear-gradient(135deg, var(--primary-color), var(--primary-dark));
            color: white;
            padding: 15px 20px;
            border-radius: 8px;
            box-shadow: var(--shadow-lg);
            z-index: 10000;
            animation: slideInRight 0.3s ease;
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }
}

// Initialize cart
const cart = new ShoppingCart();

// ================= Mobile Navbar Toggle =================
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');

if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('toggle');
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
            navLinks.classList.remove('active');
            hamburger.classList.remove('toggle');
        }
    });
}

// ================= Mobile Dropdown Toggle =================
document.querySelectorAll('.dropdown > a').forEach(drop => {
    drop.addEventListener('click', e => {
        if (window.innerWidth <= 768) {
            e.preventDefault();
            const parent = drop.parentElement;
            const wasActive = parent.classList.contains('active');
            
            // Close all dropdowns
            document.querySelectorAll('.dropdown').forEach(d => d.classList.remove('active'));
            
            // Toggle current dropdown
            if (!wasActive) {
                parent.classList.add('active');
            }
        }
    });
});

// ================= Load Featured Products =================
function loadFeaturedProducts() {
    const container = document.getElementById('featured-products');
    if (!container) return;

    const featuredProducts = products.slice(0, 6);
    
    container.innerHTML = featuredProducts.map(product => `
        <div class="card" data-aos="fade-up">
            <div class="card-image">
                <img src="${product.image}" alt="${product.name}" loading="lazy">
                ${product.badge ? `<span class="card-badge">${product.badge}</span>` : ''}
                <div class="card-actions">
                    <button class="action-btn wishlist-btn" data-id="${product.id}" aria-label="Add to wishlist">
                        <i class="far fa-heart"></i>
                    </button>
                    <button class="action-btn quick-view-btn" data-id="${product.id}" aria-label="Quick view">
                        <i class="far fa-eye"></i>
                    </button>
                </div>
            </div>
            <div class="card-content">
                <h3 class="card-title">${product.name}</h3>
                <div class="card-price">₹${product.price.toFixed(2)}</div>
                <div class="card-rating">
                    ${generateStars(product.rating)}
                    <span>(${product.reviews})</span>
                </div>
                <p class="card-description">${product.description}</p>
                <button class="add-to-cart-btn" data-id="${product.id}">
                    <i class="fas fa-shopping-cart"></i> Add to Cart
                </button>
            </div>
        </div>
    `).join('');

    // Add event listeners to product cards
    attachProductEventListeners();
}

// ================= Generate Star Rating =================
function generateStars(rating) {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);
    
    let stars = '';
    for (let i = 0; i < fullStars; i++) {
        stars += '<i class="fas fa-star"></i>';
    }
    if (halfStar) {
        stars += '<i class="fas fa-star-half-alt"></i>';
    }
    for (let i = 0; i < emptyStars; i++) {
        stars += '<i class="far fa-star"></i>';
    }
    
    return stars;
}

// ================= Product Event Listeners =================
function attachProductEventListeners() {
    // Add to cart buttons
    document.querySelectorAll('.add-to-cart-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const productId = parseInt(this.dataset.id);
            const product = products.find(p => p.id === productId);
            if (product) {
                cart.addItem(product);
                
                // Button animation
                this.innerHTML = '<i class="fas fa-check"></i> Added!';
                this.style.background = 'linear-gradient(135deg, #28a745, #20c997)';
                
                setTimeout(() => {
                    this.innerHTML = '<i class="fas fa-shopping-cart"></i> Add to Cart';
                    this.style.background = '';
                }, 2000);
            }
        });
    });

    // Wishlist buttons
    document.querySelectorAll('.wishlist-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const icon = this.querySelector('i');
            if (icon.classList.contains('far')) {
                icon.classList.remove('far');
                icon.classList.add('fas');
                this.style.color = 'var(--primary-color)';
                cart.showNotification('Added to wishlist!');
            } else {
                icon.classList.remove('fas');
                icon.classList.add('far');
                this.style.color = '';
                cart.showNotification('Removed from wishlist');
            }
        });
    });

    // Quick view buttons
    document.querySelectorAll('.quick-view-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const productId = parseInt(this.dataset.id);
            const product = products.find(p => p.id === productId);
            if (product) {
                showQuickView(product);
            }
        });
    });
}

// ================= Quick View Modal =================
function showQuickView(product) {
    const modal = document.createElement('div');
    modal.className = 'quick-view-modal';
    modal.innerHTML = `
        <div class="modal-overlay" onclick="closeQuickView()"></div>
        <div class="modal-content">
            <button class="modal-close" onclick="closeQuickView()">
                <i class="fas fa-times"></i>
            </button>
            <div class="modal-grid">
                <div class="modal-image">
                    <img src="${product.image}" alt="${product.name}">
                </div>
                <div class="modal-details">
                    <h2>${product.name}</h2>
                    <div class="modal-price">₹${product.price.toFixed(2)}</div>
                    <div class="modal-rating">
                        ${generateStars(product.rating)}
                        <span>(${product.reviews} reviews)</span>
                    </div>
                    <p class="modal-description">${product.description}</p>
                    <div class="modal-quantity">
                        <label>Quantity:</label>
                        <div class="quantity-selector">
                            <button class="quantity-btn minus">-</button>
                            <input type="number" value="1" min="1" max="10" id="modal-quantity">
                            <button class="quantity-btn plus">+</button>
                        </div>
                    </div>
                    <button class="modal-add-to-cart" data-id="${product.id}">
                        <i class="fas fa-shopping-cart"></i> Add to Cart
                    </button>
                    <div class="modal-features">
                        <div class="feature-item">
                            <i class="fas fa-truck"></i>
                            <span>Free delivery over ₹500</span>
                        </div>
                        <div class="feature-item">
                            <i class="fas fa-leaf"></i>
                            <span>Fresh guarantee</span>
                        </div>
                        <div class="feature-item">
                            <i class="fas fa-undo"></i>
                            <span>7-day return policy</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;

    document.body.appendChild(modal);
    document.body.style.overflow = 'hidden';

    // Quantity selector functionality
    const quantityInput = modal.querySelector('#modal-quantity');
    const minusBtn = modal.querySelector('.quantity-btn.minus');
    const plusBtn = modal.querySelector('.quantity-btn.plus');

    minusBtn.addEventListener('click', () => {
        if (quantityInput.value > 1) {
            quantityInput.value = parseInt(quantityInput.value) - 1;
        }
    });

    plusBtn.addEventListener('click', () => {
        if (quantityInput.value < 10) {
            quantityInput.value = parseInt(quantityInput.value) + 1;
        }
    });

    // Add to cart functionality
    modal.querySelector('.modal-add-to-cart').addEventListener('click', function() {
        const quantity = parseInt(quantityInput.value);
        for (let i = 0; i < quantity; i++) {
            cart.addItem(product);
        }
        closeQuickView();
    });
}

function closeQuickView() {
    const modal = document.querySelector('.quick-view-modal');
    if (modal) {
        modal.remove();
        document.body.style.overflow = '';
    }
}

// ================= Newsletter Form =================
const newsletterForm = document.getElementById('newsletter-form');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const email = this.querySelector('input[type="email"]').value;
        
        if (email) {
            cart.showNotification('Thank you for subscribing! Check your email for 15% off.');
            this.reset();
            
            // Store email (in real app, this would be sent to backend)
            const subscribers = JSON.parse(localStorage.getItem('petalbloom-subscribers')) || [];
            if (!subscribers.includes(email)) {
                subscribers.push(email);
                localStorage.setItem('petalbloom-subscribers', JSON.stringify(subscribers));
            }
        }
    });
}

// ================= Back to Top Button =================
const backToTopBtn = document.getElementById('backToTop');
if (backToTopBtn) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    });

    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ================= Navbar Scroll Effect =================
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }
});

// ================= Search Functionality =================
function initializeSearch() {
    const searchInput = document.getElementById('search-input');
    const searchResults = document.getElementById('search-results');
    
    if (searchInput && searchResults) {
        let searchTimeout;
        
        searchInput.addEventListener('input', function() {
            clearTimeout(searchTimeout);
            const query = this.value.toLowerCase().trim();
            
            if (query.length < 2) {
                searchResults.style.display = 'none';
                return;
            }
            
            searchTimeout = setTimeout(() => {
                const results = products.filter(product => 
                    product.name.toLowerCase().includes(query) ||
                    product.description.toLowerCase().includes(query) ||
                    product.category.toLowerCase().includes(query)
                );
                
                displaySearchResults(results, query);
            }, 300);
        });
        
        // Close search results when clicking outside
        document.addEventListener('click', function(e) {
            if (!searchInput.contains(e.target) && !searchResults.contains(e.target)) {
                searchResults.style.display = 'none';
            }
        });
    }
}

function displaySearchResults(results, query) {
    const searchResults = document.getElementById('search-results');
    if (!searchResults) return;
    
    if (results.length === 0) {
        searchResults.innerHTML = `
            <div class="search-no-results">
                <i class="fas fa-search"></i>
                <p>No products found for "${query}"</p>
            </div>
        `;
    } else {
        searchResults.innerHTML = results.map(product => `
            <div class="search-result-item" onclick="selectProduct(${product.id})">
                <img src="${product.image}" alt="${product.name}">
                <div class="search-result-info">
                    <h4>${product.name}</h4>
                    <p>₹${product.price.toFixed(2)}</p>
                </div>
            </div>
        `).join('');
    }
    
    searchResults.style.display = 'block';
}

function selectProduct(productId) {
    const product = products.find(p => p.id === productId);
    if (product) {
        showQuickView(product);
        document.getElementById('search-results').style.display = 'none';
        document.getElementById('search-input').value = '';
    }
}

// ================= Initialize Everything =================
document.addEventListener('DOMContentLoaded', function() {
    loadFeaturedProducts();
    initializeSearch();
    
    // Check if user is logged in
    const currentUser = localStorage.getItem('sopera-user');
    if (currentUser) {
        const userData = JSON.parse(currentUser);
        // Update UI for logged in user
        updateAuthUI(userData);
    }
});

// Update auth UI for logged in users
function updateAuthUI(userData) {
    const signinLinks = document.querySelectorAll('a[href*="signin"]');
    const userDisplay = document.querySelector('.user-display');
    
    if (signinLinks) {
        signinLinks.forEach(link => {
            if (userData.isAdmin) {
                link.href = 'admin.html';
                link.textContent = 'Admin';
            } else {
                link.textContent = userData.name;
            }
        });
    }
}

// ================= Performance Optimization =================
// Lazy loading images
document.addEventListener('DOMContentLoaded', function() {
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src || img.src;
                    img.classList.add('loaded');
                    observer.unobserve(img);
                }
            });
        });

        document.querySelectorAll('img[loading="lazy"]').forEach(img => {
            imageObserver.observe(img);
        });
    }
});

// ================= Error Handling =================
window.addEventListener('error', function(e) {
    console.error('JavaScript error:', e.error);
    // In production, you might want to send this to an error tracking service
});

// Make functions globally accessible
window.closeQuickView = closeQuickView;
window.selectProduct = selectProduct;
