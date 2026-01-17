// Hamburger toggle
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');
hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    hamburger.classList.toggle('toggle');
});

// Mobile dropdown toggle
const dropdowns = document.querySelectorAll('.dropdown');
dropdowns.forEach(dropdown => {
    dropdown.addEventListener('click', (e) => {
        e.preventDefault();
        dropdown.classList.toggle('active');
    });
});

// Close dropdown on outside click
document.addEventListener('click', (e) => {
    dropdowns.forEach(dropdown => {
        if (!dropdown.contains(e.target)) {
            dropdown.classList.remove('active');
        }
    });
});

// Sticky shadow on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if(window.scrollY > 50) {
        navbar.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
    } else {
        navbar.style.boxShadow = '0 2px 6px rgba(0,0,0,0.1)';
    }
});

// Hero CTA scroll
const shopBtn = document.getElementById('shop-now');
const productsSection = document.getElementById('products');
shopBtn.addEventListener('click', () => {
    productsSection.scrollIntoView({ behavior: 'smooth' });
});

// Add-to-cart animation
const addCartButtons = document.querySelectorAll('.add-to-cart');
const cartCount = document.getElementById('cart-count');
let count = 0;
addCartButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        count++;
        cartCount.textContent = count;
        btn.classList.add('animate');
        setTimeout(() => btn.classList.remove('animate'), 300);
    });
});
