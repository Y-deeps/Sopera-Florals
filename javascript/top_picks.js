// ---------------- Navbar ---------------- //
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    hamburger.classList.toggle('toggle');
});

// Mobile dropdown
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

// ---------------- Add to Cart ---------------- //
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

// ---------------- Quick View Modal ---------------- //
const modal = document.getElementById('quick-view-modal');
const modalImg = document.getElementById('modal-img');
const modalTitle = document.getElementById('modal-title');
const closeModal = document.querySelector('.modal .close');
const modalAddCart = document.getElementById('modal-add-cart');

document.querySelectorAll('.card img').forEach(img => {
    img.addEventListener('click', () => {
        modal.style.display = 'block';
        modalImg.src = img.src;
        modalTitle.textContent = img.alt;
    });
});

closeModal.addEventListener('click', () => modal.style.display = 'none');
window.addEventListener('click', (e) => {
    if(e.target == modal) modal.style.display = 'none';
});

// Add to cart inside modal
modalAddCart.addEventListener('click', () => {
    count++;
    cartCount.textContent = count;
    modalAddCart.classList.add('animate');
    setTimeout(() => modalAddCart.classList.remove('animate'), 300);
});

// ---------------- Carousel ---------------- //
const carousel = document.getElementById('carousel-container');
const leftBtn = document.getElementById('carousel-left');
const rightBtn = document.getElementById('carousel-right');

leftBtn.addEventListener('click', () => {
    carousel.scrollBy({ left: -320, behavior: 'smooth' });
});
rightBtn.addEventListener('click', () => {
    carousel.scrollBy({ left: 320, behavior: 'smooth' });
});
