// ================= Extended Product Data =================
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
        reviews: 127,
        featured: true
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
        reviews: 89,
        featured: true
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
        reviews: 156,
        featured: true
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
        reviews: 92,
        featured: false
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
        reviews: 178,
        featured: false
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
        reviews: 145,
        featured: false
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
        reviews: 145,
        featured: false
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
        reviews: 98,
        featured: false
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
        reviews: 167,
        featured: false
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
        reviews: 189,
        featured: false
    }
];

// Initialize allProducts variable
let allProducts = loadProductsFromAdmin();

// ================= Product Page State =================
let currentFilters = {
    search: '',
    categories: [],
    minPrice: 0,
    maxPrice: 200,
    minRating: 0,
    sortBy: 'featured'
};

let currentView = 'grid';
let filteredProducts = [...allProducts];

// ================= Initialize Product Page =================
function initializeProductPage() {
    loadProductsFromURL();
    setupEventListeners();
    renderProducts();
    updateResultsCount();
}

// ================= Load Products from URL =================
function loadProductsFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    const category = urlParams.get('category');
    
    if (category) {
        currentFilters.categories = [category];
        document.getElementById(`cat-${category}`).checked = true;
    }
}

// ================= Setup Event Listeners =================
function setupEventListeners() {
    // Search functionality
    const searchInput = document.getElementById('search-input');
    const searchBtn = document.getElementById('search-btn');
    
    if (searchInput) {
        searchInput.addEventListener('input', debounce(handleSearch, 300));
        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') handleSearch();
        });
    }
    
    if (searchBtn) {
        searchBtn.addEventListener('click', handleSearch);
    }
    
    // Category filters
    document.querySelectorAll('.filter-option input[type="checkbox"]').forEach(checkbox => {
        checkbox.addEventListener('change', handleCategoryFilter);
    });
    
    // Price range
    const minPriceInput = document.getElementById('min-price');
    const maxPriceInput = document.getElementById('max-price');
    const priceRange = document.getElementById('price-range');
    
    if (minPriceInput) {
        minPriceInput.addEventListener('input', handlePriceFilter);
    }
    if (maxPriceInput) {
        maxPriceInput.addEventListener('input', handlePriceFilter);
    }
    if (priceRange) {
        priceRange.addEventListener('input', handlePriceRange);
    }
    
    // Rating filters
    document.querySelectorAll('input[type="checkbox"][id^="rating-"]').forEach(checkbox => {
        checkbox.addEventListener('change', handleRatingFilter);
    });
    
    // Sort dropdown
    const sortSelect = document.getElementById('sort-select');
    if (sortSelect) {
        sortSelect.addEventListener('change', handleSort);
    }
    
    // View options
    const gridView = document.getElementById('grid-view');
    const listView = document.getElementById('list-view');
    
    if (gridView) {
        gridView.addEventListener('click', () => setView('grid'));
    }
    if (listView) {
        listView.addEventListener('click', () => setView('list'));
    }
    
    // Mobile filter toggle
    const mobileFilterToggle = document.getElementById('mobile-filter-toggle');
    const filterOverlay = document.getElementById('filter-overlay');
    const filtersSidebar = document.getElementById('filters-sidebar');
    
    if (mobileFilterToggle && filterOverlay && filtersSidebar) {
        mobileFilterToggle.addEventListener('click', () => {
            filtersSidebar.classList.add('active');
            filterOverlay.classList.add('active');
        });
        
        filterOverlay.addEventListener('click', () => {
            filtersSidebar.classList.remove('active');
            filterOverlay.classList.remove('active');
        });
    }
}

// ================= Search Handler =================
function handleSearch() {
    const searchInput = document.getElementById('search-input');
    currentFilters.search = searchInput.value.toLowerCase().trim();
    applyFilters();
}

// ================= Category Filter Handler =================
function handleCategoryFilter() {
    const checkedCategories = [];
    document.querySelectorAll('.filter-option input[type="checkbox"]:checked').forEach(checkbox => {
        if (checkbox.id.startsWith('cat-')) {
            checkedCategories.push(checkbox.value);
        }
    });
    currentFilters.categories = checkedCategories;
}

// ================= Price Filter Handlers =================
function handlePriceFilter() {
    const minPrice = document.getElementById('min-price');
    const maxPrice = document.getElementById('max-price');
    const priceRange = document.getElementById('price-range');
    
    currentFilters.minPrice = parseFloat(minPrice.value) || 0;
    currentFilters.maxPrice = parseFloat(maxPrice.value) || 200;
    
    if (priceRange) {
        priceRange.value = currentFilters.maxPrice;
    }
}

function handlePriceRange() {
    const priceRange = document.getElementById('price-range');
    const maxPrice = document.getElementById('max-price');
    
    currentFilters.maxPrice = parseFloat(priceRange.value);
    if (maxPrice) {
        maxPrice.value = currentFilters.maxPrice;
    }
}

// ================= Rating Filter Handler =================
function handleRatingFilter() {
    let minRating = 0;
    document.querySelectorAll('input[type="checkbox"][id^="rating-"]:checked').forEach(checkbox => {
        const rating = parseInt(checkbox.value);
        if (rating > minRating) {
            minRating = rating;
        }
    });
    currentFilters.minRating = minRating;
}

// ================= Sort Handler =================
function handleSort() {
    const sortSelect = document.getElementById('sort-select');
    currentFilters.sortBy = sortSelect.value;
    applyFilters();
}

// ================= View Switcher =================
function setView(view) {
    currentView = view;
    const gridView = document.getElementById('grid-view');
    const listView = document.getElementById('list-view');
    const productsGrid = document.getElementById('products-grid');
    
    if (view === 'grid') {
        gridView.classList.add('active');
        listView.classList.remove('active');
        productsGrid.classList.remove('list-view');
    } else {
        gridView.classList.remove('active');
        listView.classList.add('active');
        productsGrid.classList.add('list-view');
    }
}

// ================= Apply Filters =================
function applyFilters() {
    showLoading();
    
    setTimeout(() => {
        filteredProducts = allProducts.filter(product => {
            // Search filter
            if (currentFilters.search && !productMatchesSearch(product)) {
                return false;
            }
            
            // Category filter
            if (currentFilters.categories.length > 0 && !currentFilters.categories.includes(product.category)) {
                return false;
            }
            
            // Price filter
            if (product.price < currentFilters.minPrice || product.price > currentFilters.maxPrice) {
                return false;
            }
            
            // Rating filter
            if (product.rating < currentFilters.minRating) {
                return false;
            }
            
            return true;
        });
        
        sortProducts();
        renderProducts();
        updateResultsCount();
        hideLoading();
        
        // Close mobile filters if open
        const filtersSidebar = document.getElementById('filters-sidebar');
        const filterOverlay = document.getElementById('filter-overlay');
        if (filtersSidebar && filterOverlay) {
            filtersSidebar.classList.remove('active');
            filterOverlay.classList.remove('active');
        }
    }, 300);
}

// ================= Product Search Match =================
function productMatchesSearch(product) {
    const searchTerm = currentFilters.search;
    return (
        product.name.toLowerCase().includes(searchTerm) ||
        product.description.toLowerCase().includes(searchTerm) ||
        product.category.toLowerCase().includes(searchTerm)
    );
}

// ================= Sort Products =================
function sortProducts() {
    switch (currentFilters.sortBy) {
        case 'price-low':
            filteredProducts.sort((a, b) => a.price - b.price);
            break;
        case 'price-high':
            filteredProducts.sort((a, b) => b.price - a.price);
            break;
        case 'rating':
            filteredProducts.sort((a, b) => b.rating - a.rating);
            break;
        case 'name':
            filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
            break;
        case 'featured':
        default:
            filteredProducts.sort((a, b) => {
                if (a.featured && !b.featured) return -1;
                if (!a.featured && b.featured) return 1;
                return 0;
            });
            break;
    }
}

// ================= Render Products =================
function renderProducts() {
    const productsGrid = document.getElementById('products-grid');
    const noResults = document.getElementById('no-results');
    
    if (filteredProducts.length === 0) {
        productsGrid.style.display = 'none';
        noResults.style.display = 'block';
        return;
    }
    
    productsGrid.style.display = 'grid';
    noResults.style.display = 'none';
    
    productsGrid.innerHTML = filteredProducts.map((product, index) => `
        <div class="card" data-aos="fade-up" data-aos-delay="${index * 50}">
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
    
    // Re-attach event listeners to new products
    attachProductEventListeners();
}

// ================= Update Results Count =================
function updateResultsCount() {
    const resultsCount = document.getElementById('results-count');
    if (resultsCount) {
        resultsCount.textContent = filteredProducts.length;
    }
}

// ================= Clear Filters =================
function clearFilters() {
    // Reset search
    document.getElementById('search-input').value = '';
    currentFilters.search = '';
    
    // Reset categories
    document.querySelectorAll('.filter-option input[type="checkbox"]').forEach(checkbox => {
        checkbox.checked = false;
    });
    currentFilters.categories = [];
    
    // Reset price
    document.getElementById('min-price').value = '0';
    document.getElementById('max-price').value = '200';
    document.getElementById('price-range').value = '200';
    currentFilters.minPrice = 0;
    currentFilters.maxPrice = 200;
    
    // Reset rating
    document.querySelectorAll('input[type="checkbox"][id^="rating-"]').forEach(checkbox => {
        checkbox.checked = false;
    });
    currentFilters.minRating = 0;
    
    // Reset sort
    document.getElementById('sort-select').value = 'featured';
    currentFilters.sortBy = 'featured';
    
    applyFilters();
}

// ================= Loading States =================
function showLoading() {
    const loading = document.getElementById('loading');
    const productsGrid = document.getElementById('products-grid');
    const noResults = document.getElementById('no-results');
    
    if (loading) loading.style.display = 'block';
    if (productsGrid) productsGrid.style.display = 'none';
    if (noResults) noResults.style.display = 'none';
}

function hideLoading() {
    const loading = document.getElementById('loading');
    if (loading) loading.style.display = 'none';
}

// ================= Utility Functions =================
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// ================= Make functions globally accessible =================
window.applyFilters = applyFilters;
window.clearFilters = clearFilters;
window.setView = setView;
  