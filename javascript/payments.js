document.getElementById('payment-form').addEventListener('submit', function (e) {
    e.preventDefault();
  
    const name = document.getElementById('fullname').value.trim();
    const email = document.getElementById('email').value.trim();
    const address = document.getElementById('address').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const method = document.getElementById('payment-method').value;
  
    if (!name || !email || !address || !phone || !method) {
      alert("Please fill out all fields.");
      return;
    }
  
    // Simulate success
    alert("Payment successful! Thank you for your order 💐");
    localStorage.removeItem("cart");
    window.location.href = "thankyou.html"; // Optional: create this page
  });
  