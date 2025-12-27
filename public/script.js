// API Base URL
const API_URL = window.location.origin;

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
document.getElementById('donation-form').addEventListener('submit', async (e) => {
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
            document.getElementById('donation-form').reset();
            document.getElementById('donation-success').style.display = 'block';
            setTimeout(() => {
                document.getElementById('donation-success').style.display = 'none';
            }, 5000);
            updateStats();
        } else {
            alert('Error submitting donation. Please try again.');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Error submitting donation. Please try again.');
    }
});

// Purchase Form Handler
document.getElementById('purchase-form').addEventListener('submit', async (e) => {
    e.preventDefault();

    const quantity = parseInt(document.getElementById('buy-quantity').value);
    
    if (quantity < 10) {
        alert('Minimum order is 10 kg');
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
            document.getElementById('purchase-form').reset();
            document.getElementById('total-price').textContent = '0';
            document.getElementById('purchase-success').style.display = 'block';
            setTimeout(() => {
                document.getElementById('purchase-success').style.display = 'none';
            }, 5000);
            updateStats();
        } else {
            alert('Error submitting purchase. Please try again.');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Error submitting purchase. Please try again.');
    }
});

// Partnership Form Handler
document.getElementById('partnership-form').addEventListener('submit', async (e) => {
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
            document.getElementById('partnership-form').reset();
            document.getElementById('partnership-success').style.display = 'block';
            setTimeout(() => {
                document.getElementById('partnership-success').style.display = 'none';
            }, 5000);
            updateStats();
        } else {
            alert('Error submitting partnership request. Please try again.');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Error submitting partnership request. Please try again.');
    }
});

// Update total price for purchases
document.getElementById('buy-quantity').addEventListener('input', (e) => {
    const quantity = parseInt(e.target.value) || 0;
    const pricePerKg = 5;
    const totalPrice = quantity * pricePerKg;
    document.getElementById('total-price').textContent = totalPrice;
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Initialize stats on page load
updateStats();
