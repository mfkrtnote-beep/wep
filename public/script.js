// API Base URL
const API_URL = window.location.origin;

// Mobile menu toggle
const menuToggle = document.querySelector('.menu-toggle');
const navMenu = document.querySelector('.nav-menu');

if (menuToggle) {
    menuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });
}

// Update statistics on page load
async function updateStats() {
    try {
        const [donations, purchases, partnerships] = await Promise.all([
            fetch(`${API_URL}/api/donations`).then(r => r.json()),
            fetch(`${API_URL}/api/purchases`).then(r => r.json()),
            fetch(`${API_URL}/api/partnerships`).then(r => r.json())
        ]);

        document.getElementById('total-donations').textContent = donations.length;
        document.getElementById('total-purchases').textContent = purchases.length;
        document.getElementById('total-partnerships').textContent = partnerships.length;
    } catch (error) {
        console.error('Error fetching stats:', error);
    }
}

// Donation Form Handler
const donationForm = document.getElementById('donation-form');
if (donationForm) {
    donationForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const formData = {
            name: document.getElementById('donate-name').value,
            email: document.getElementById('donate-email').value,
            quantity: parseInt(document.getElementById('donate-quantity').value),
            location: document.getElementById('donate-location').value,
            message: document.getElementById('donate-message').value
        };

        try {
            const response = await fetch(`${API_URL}/api/donations`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                donationForm.reset();
                document.getElementById('donation-success').style.display = 'block';
                setTimeout(() => {
                    document.getElementById('donation-success').style.display = 'none';
                }, 5000);
                updateStats();
            } else {
                alert('خطأ في إرسال التبرع. يرجى المحاولة مرة أخرى.');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('خطأ في إرسال التبرع. يرجى المحاولة مرة أخرى.');
        }
    });
}

// Purchase Form Handler
const purchaseForm = document.getElementById('purchase-form');
if (purchaseForm) {
    purchaseForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const quantity = parseInt(document.getElementById('buy-quantity').value);
        
        if (quantity < 10) {
            alert('الحد الأدنى للطلب هو 10 كجم');
            return;
        }

        const formData = {
            name: document.getElementById('buy-name').value,
            email: document.getElementById('buy-email').value,
            phone: document.getElementById('buy-phone').value,
            quantity: quantity,
            deliveryAddress: document.getElementById('buy-address').value
        };

        try {
            const response = await fetch(`${API_URL}/api/purchases`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                purchaseForm.reset();
                document.getElementById('total-price').textContent = '0';
                document.getElementById('purchase-success').style.display = 'block';
                setTimeout(() => {
                    document.getElementById('purchase-success').style.display = 'none';
                }, 5000);
                updateStats();
            } else {
                alert('خطأ في إرسال الطلب. يرجى المحاولة مرة أخرى.');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('خطأ في إرسال الطلب. يرجى المحاولة مرة أخرى.');
        }
    });
}

// Partnership Form Handler
const partnershipForm = document.getElementById('partnership-form');
if (partnershipForm) {
    partnershipForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const formData = {
            organizationName: document.getElementById('partner-org').value,
            contactPerson: document.getElementById('partner-contact').value,
            email: document.getElementById('partner-email').value,
            phone: document.getElementById('partner-phone').value,
            partnershipType: document.getElementById('partner-type').value,
            website: document.getElementById('partner-website').value,
            description: document.getElementById('partner-description').value
        };

        try {
            const response = await fetch(`${API_URL}/api/partnerships`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                partnershipForm.reset();
                document.getElementById('partnership-success').style.display = 'block';
                setTimeout(() => {
                    document.getElementById('partnership-success').style.display = 'none';
                }, 5000);
                updateStats();
            } else {
                alert('خطأ في إرسال طلب الشراكة. يرجى المحاولة مرة أخرى.');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('خطأ في إرسال طلب الشراكة. يرجى المحاولة مرة أخرى.');
        }
    });
}

// Update total price for purchases
const buyQuantityInput = document.getElementById('buy-quantity');
if (buyQuantityInput) {
    buyQuantityInput.addEventListener('input', (e) => {
        const quantity = parseInt(e.target.value) || 0;
        const pricePerKg = 5;
        const totalPrice = quantity * pricePerKg;
        document.getElementById('total-price').textContent = totalPrice;
    });
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            // Close mobile menu if open
            if (navMenu && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
            }
            
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar scroll effect
let lastScroll = 0;
const header = document.querySelector('.header');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        header.style.boxShadow = '0 4px 20px rgba(0,0,0,0.15)';
    } else {
        header.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
    }
    
    lastScroll = currentScroll;
});

// Initialize stats on page load
updateStats();

// Animate elements on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all sections
document.querySelectorAll('.section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(20px)';
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(section);
});
