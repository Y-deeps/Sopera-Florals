# Sopera Florals - Premium Indian Flowers & Pooja Items

A modern, responsive e-commerce website for traditional Indian flowers and household pooja items with complete admin management system.

## Features

### **Customer Features**
- **User Authentication** - Sign up, sign in with session management
- **Product Browsing** - Browse flowers by category (Marigold, Jasmine, Roses, Pooja Items, Household)
- **Shopping Cart** - Add/remove items, quantity management
- **Wishlist** - Save favorite items for later
- **User Profile** - Complete profile management with settings
- **Order History** - Track past orders and status
- **Responsive Design** - Works perfectly on all devices

### **Admin Features**
- **Admin Dashboard** - Complete management system
- **Product Management** - Add, edit, delete products with full details
- **Price Management** - Update product prices dynamically
- **Order Management** - View and manage customer orders
- **User Management** - View registered users
- **Content Management** - Edit About page content
- **Statistics** - Real-time dashboard metrics
- **Data Persistence** - All changes saved to localStorage

### **Security Features**
- **Admin Authentication** - Secure admin login system
- **Session Management** - Persistent login across pages
- **Role-Based Access** - Admin vs regular user permissions
- **Protected Routes** - Admin pages require authentication

## Quick Start

### **Prerequisites**
- Modern web browser (Chrome, Firefox, Safari, Edge)
- Local web server (optional, for development)

### **Installation**
1. **Clone or download** the project files
2. **Open** `index.html` in your web browser
3. **Start** using the website immediately!

### **Default Admin Credentials**
- **Email:** `322103210177.deepthi@gvpcew.ac.in`
- **Password:** `Admin@123`

## Project Structure

```
SoperaFlorals/
├── index.html                 # Main homepage
├── html/                      # HTML pages
│   ├── signin.html           # User sign-in page
│   ├── signup.html           # User registration page
│   ├── admin-login.html      # Admin login page
│   ├── admin.html            # Admin dashboard
│   ├── profile.html          # User profile page
│   ├── shop.html             # Shop page
│   ├── top_picks.html        # Top picks page
│   ├── about.html            # About page
│   ├── contact.html          # Contact page
│   ├── cart.html             # Shopping cart
│   ├── checkout.html         # Checkout page
│   └── product.html          # Product listing
├── css/                       # Stylesheets
│   └── style.css             # Main CSS file
├── javascript/                # JavaScript files
│   ├── main.js               # Main functionality
│   ├── cart.js               # Cart functionality
│   ├── checkout.js           # Checkout functionality
│   └── product.js            # Product functionality
├── images/                    # Image assets
└── README.md                  # This file
```

## User Guide

### **For Customers**

#### **Registration & Login**
1. Click **"Sign In"** in the navigation
2. Click **"Create Account"** to register
3. Fill in your details (name, email, phone, password)
4. **Sign in** with your credentials
5. Your profile will appear in the navigation

#### **Shopping**
1. Browse products by category
2. Click **"Add to Cart"** on items you like
3. View your cart by clicking the cart icon
4. Proceed to checkout when ready
5. Fill in delivery details and place order

#### **Profile Management**
1. Click your profile name in navigation
2. Select **"My Profile"**
3. Update personal information, view orders, manage wishlist
4. Adjust notification preferences
5. Change password if needed

### **For Administrators**

#### **Admin Access**
1. **Method 1:** Sign in with admin credentials, then click **"Admin Dashboard"** in profile
2. **Method 2:** Go directly to `/html/admin-login.html`
3. Login with admin credentials

#### **Product Management**
1. **View Products** - Dashboard shows all products with images
2. **Add Product** - Click **"Add New Product"** → Fill form → Save
3. **Edit Product** - Click **"Edit"** on any product → Modify → Save
4. **Delete Product** - Click **"Delete"** → Confirm removal
5. **All changes** are automatically saved and reflected on main website

#### **Content Management**
1. **About Page** - Go to **"Manage Website"** section
2. **Edit content** - Update title, subtitle, story, mission, values
3. **Save changes** - Updates appear immediately on main website

## 🔧 Technical Details

### **Technologies Used**
- **HTML5** - Semantic markup
- **CSS3** - Modern styling with animations
- **JavaScript ES6+** - Interactive functionality
- **Font Awesome** - Icon library
- **Google Fonts** - Typography
- **AOS Library** - Scroll animations

### **Data Storage**
- **localStorage** - Persistent data storage
  - `users` - User accounts
  - `sopera-products` - Product catalog
  - `sopera-products-main` - Main website products
  - `sopera-about-data` - About page content
  - `userOrders` - Customer orders
  - `userWishlist` - User wishlists
  - `userSettings` - User preferences

- **sessionStorage** - Session management
  - `isLoggedIn` - User login state
  - `userEmail` - Current user email
  - `isAdminLoggedIn` - Admin login state
  - `adminUsername` - Admin username

### **Authentication System**
- **User Authentication**
  - Email/password validation
  - Session persistence across pages
  - Profile management
  - Admin badge for admin users

- **Admin Authentication**
  - Separate admin login system
  - Protected admin routes
  - Session management
  - Automatic redirects

### **Responsive Design**
- **Mobile-first approach**
- **Flexible grid layouts**
- **Touch-friendly interfaces**
- **Optimized images**
- **Hamburger menu** for mobile navigation

## Design Features

### **Visual Elements**
- **Gradient backgrounds** - Modern color schemes
- **Card-based layouts** - Clean organization
- **Smooth animations** - AOS scroll animations
- **Hover effects** - Interactive elements
- **Loading states** - User feedback
- **Toast notifications** - Success/error messages

### **User Experience**
- **Intuitive navigation** - Clear menu structure
- **Search functionality** - Easy product discovery
- **Filter options** - Category-based browsing
- **Quick view** - Product preview modals
- **Wishlist management** - Save favorites
- **Order tracking** - Purchase history

## Security Considerations

### **Current Implementation**
- **Client-side authentication** (for demo purposes)
- **Session management** with timeout
- **Input validation** on forms
- **XSS prevention** with proper escaping

### **Production Recommendations**
- **Backend API** for authentication
- **Database integration** for data persistence
- **HTTPS** for secure communication
- **Server-side validation**
- **Rate limiting** for login attempts
- **CSRF protection**

## Deployment

### **Local Development**
1. **Start a local server** (optional but recommended)
   ```bash
   # Using Python
   python -m http.server 8000
   
   # Using Node.js
   npx serve .
   
   # Using PHP
   php -S localhost:8000
   ```
2. **Open** `http://localhost:8000` in browser

### **Production Deployment**
1. **Upload files** to web server
2. **Configure HTTPS** (recommended)
3. **Set up backend** for production use
4. **Configure database** for data persistence
5. **Test all functionality**

## Troubleshooting

### **Common Issues**

#### **Login Problems**
- **Clear browser cache** - Ctrl+F5 or Cmd+Shift+R
- **Check credentials** - Ensure correct email/password
- **JavaScript enabled** - Ensure JS is not disabled

#### **Admin Access Issues**
- **Verify admin credentials** - Use default admin account
- **Check session** - Ensure admin login session is active
- **Clear localStorage** - Remove corrupted data

#### **Product Management Issues**
- **Refresh page** - Ensure latest data is loaded
- **Check localStorage** - Verify data is being saved
- **Console errors** - Check browser developer tools

### **Debug Mode**
Open browser developer tools (F12) to:
- **Console** - View JavaScript errors
- **Network** - Monitor API calls
- **Application** - Inspect localStorage/sessionStorage
- **Elements** - Debug HTML/CSS issues

## Contributing

### **Development Guidelines**
1. **Follow existing code style**
2. **Test on multiple browsers**
3. **Ensure responsive design**
4. **Add comments for complex logic**
5. **Update documentation**

### **Feature Requests**
- **New product categories**
- **Payment integration**
- **Advanced search**
- **User reviews**
- **Email notifications**

## Support

### **Contact Information**
- **Email:** support@soperaflorals.com
- **Phone:** +91 9123456789
- **Website:** www.soperaflorals.com

### **Documentation**
- **User Guide** - This README file
- **Admin Guide** - Built into admin dashboard
- **API Documentation** - For backend integration

## License

This project is for demonstration purposes. Please obtain appropriate licenses for production use.

## Acknowledgments

- **Font Awesome** - Icon library
- **Google Fonts** - Typography
- **AOS** - Animation library
- **Unsplash** - Placeholder images

---

**Sopera Florals** - Your trusted partner for traditional Indian flowers and pooja items since 2025.

*Last updated: January 2026*
