# 🌴 Date Pits Platform

A comprehensive web platform for donating, buying, and partnering in date pits collection and distribution. This platform enables sustainable resource management by connecting donors, buyers, and partners in the date pits ecosystem.

## Features

### 1. 🎁 Donation System
- Easy-to-use donation form
- Track donation quantity and location
- Contact information collection
- Optional message field for special instructions

### 2. 🛒 Purchase System
- Buy date pits in bulk (minimum 10 kg)
- Automatic price calculation ($5 per kg)
- Delivery address collection
- Order tracking and confirmation

### 3. 🤝 Partnership Program
- Three partnership types:
  - Collection Partners
  - Processing Partners
  - Distribution Partners
- Organization profile submission
- Partnership request management
- Contact and collaboration tools

### 4. 📊 Live Statistics
- Real-time donation count
- Total purchases tracking
- Partnership numbers
- Engagement metrics

## Technology Stack

- **Frontend**: HTML5, CSS3, JavaScript (Vanilla)
- **Backend**: Node.js with Express.js
- **Styling**: Custom CSS with responsive design
- **Data Storage**: In-memory storage (can be upgraded to database)

## Installation

1. Install dependencies:
```bash
npm install
```

2. Start the server:
```bash
npm start
```

3. Access the application:
```
http://localhost:3000
```

## API Endpoints

### Donations
- `GET /api/donations` - Get all donations
- `POST /api/donations` - Submit a donation

### Purchases
- `GET /api/purchases` - Get all purchases
- `POST /api/purchases` - Submit a purchase order

### Partnerships
- `GET /api/partnerships` - Get all partnerships
- `POST /api/partnerships` - Submit a partnership request

## Project Structure

```
date-pits-platform/
├── server.js           # Express server and API routes
├── package.json        # Project dependencies
├── README.md          # Project documentation
└── public/
    ├── index.html     # Main HTML page
    ├── styles.css     # Stylesheet
    └── script.js      # Frontend JavaScript
```

## Usage

### For Donors
1. Navigate to the "Donate" section
2. Fill in your details and quantity
3. Submit the form
4. You'll receive confirmation and be contacted for pickup

### For Buyers
1. Go to the "Buy" section
2. Enter your information and desired quantity
3. View the calculated total price
4. Submit your order
5. Wait for payment and delivery confirmation

### For Partners
1. Visit the "Partner" section
2. Choose your partnership type
3. Provide organization details
4. Describe your partnership interest
5. Submit and await review

## Future Enhancements

- Database integration (MongoDB/PostgreSQL)
- User authentication and accounts
- Payment gateway integration
- Admin dashboard for managing requests
- Email notifications
- Order tracking system
- Mobile app version
- Multi-language support

## Contributing

Contributions are welcome! Please feel free to submit issues or pull requests.

## License

MIT License

## Contact

For questions or support, please contact through the partnership form on the platform.

---

**Building a sustainable future, one date pit at a time. 🌱**
