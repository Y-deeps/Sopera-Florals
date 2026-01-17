document.addEventListener("DOMContentLoaded", () => {
    const container = document.getElementById("dynamic-testimonials");
    const testimonials = JSON.parse(localStorage.getItem("petalbloom_reviews")) || [];
  
    testimonials.forEach(({ name, review, emoji }) => {
      const testimonialDiv = document.createElement("div");
      testimonialDiv.className = "testimonial";
      testimonialDiv.setAttribute("role", "article");
  
      testimonialDiv.innerHTML = `
        <p class="testimonial-text">"${review}"</p>
        <div class="rating">${emoji}</div>
        <div class="name">
          <span class="avatar" style="background-image: url('https://i.pravatar.cc/30?u=${name}')"></span>
          <span>- ${name}</span>
        </div>
      `;
  
      container.appendChild(testimonialDiv);
    });
  });
// Auto-scroll carousel
const carousel = document.getElementById('testimonial-carousel');
let scrollAmount = 0;

setInterval(() => {
    scrollAmount += 320; // width + gap
    if(scrollAmount >= carousel.scrollWidth) scrollAmount = 0;
    carousel.scrollTo({ left: scrollAmount, behavior: 'smooth' });
}, 3000);
