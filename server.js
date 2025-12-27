const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// In-memory storage (replace with database in production)
const donations = [];
const purchases = [];
const partnerships = [];

// Routes

// Get all donations
app.get('/api/donations', (req, res) => {
  res.json(donations);
});

// Submit a donation
app.post('/api/donations', (req, res) => {
  const donation = {
    id: Date.now().toString(),
    name: req.body.name,
    email: req.body.email,
    quantity: req.body.quantity,
    location: req.body.location,
    message: req.body.message,
    date: new Date().toISOString()
  };
  donations.push(donation);
  res.status(201).json({ success: true, donation });
});

// Get all purchases
app.get('/api/purchases', (req, res) => {
  res.json(purchases);
});

// Submit a purchase request
app.post('/api/purchases', (req, res) => {
  const purchase = {
    id: Date.now().toString(),
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    quantity: req.body.quantity,
    deliveryAddress: req.body.deliveryAddress,
    pricePerKg: 5, // Example price
    totalPrice: req.body.quantity * 5,
    date: new Date().toISOString(),
    status: 'pending'
  };
  purchases.push(purchase);
  res.status(201).json({ success: true, purchase });
});

// Get all partnerships
app.get('/api/partnerships', (req, res) => {
  res.json(partnerships);
});

// Submit a partnership request
app.post('/api/partnerships', (req, res) => {
  const partnership = {
    id: Date.now().toString(),
    organizationName: req.body.organizationName,
    contactPerson: req.body.contactPerson,
    email: req.body.email,
    phone: req.body.phone,
    partnershipType: req.body.partnershipType,
    description: req.body.description,
    website: req.body.website,
    date: new Date().toISOString(),
    status: 'pending'
  };
  partnerships.push(partnership);
  res.status(201).json({ success: true, partnership });
});

// Serve index.html for root route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Date Pits Platform server is running on port ${PORT}`);
  console.log(`Access the application at http://localhost:${PORT}`);
});
