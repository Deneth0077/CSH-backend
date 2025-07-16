# MERN Admin Dashboard Backend

A comprehensive backend API for the MERN stack admin dashboard with full CRUD operations for products, orders, and categories.

## Features

- **Product Management**: Complete CRUD operations with category association
- **Order Management**: Order creation, status updates, and tracking
- **Category Management**: Hierarchical category system
- **Dashboard Analytics**: Real-time statistics and insights
- **MongoDB Integration**: Robust data modeling with Mongoose
- **RESTful API**: Clean and consistent API endpoints
- **Error Handling**: Comprehensive error handling and validation
- **Security**: CORS, rate limiting, and security headers

## Tech Stack

- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **CORS** - Cross-origin resource sharing
- **Helmet** - Security middleware
- **Morgan** - HTTP request logger
- **Compression** - Response compression

## Installation

1. **Clone and navigate to server directory**
   ```bash
   cd server
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   Create a `.env` file in the server directory:
   ```env
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/mern-admin
   NODE_ENV=development
   JWT_SECRET=your-secret-key
   CLIENT_URL=http://localhost:5173
   ```

4. **Start the server**
   ```bash
   # Development mode
   npm run dev
   
   # Production mode
   npm start
   ```

## API Endpoints

### Products
- `GET /api/products` - Get all products (with pagination, search, filters)
- `GET /api/products/:id` - Get single product
- `POST /api/products` - Create new product
- `PUT /api/products/:id` - Update product
- `DELETE /api/products/:id` - Delete product
- `PATCH /api/products/:id/stock` - Update product stock

### Orders
- `GET /api/orders` - Get all orders (with pagination, search, filters)
- `GET /api/orders/:id` - Get single order
- `POST /api/orders` - Create new order
- `PUT /api/orders/:id` - Update order
- `DELETE /api/orders/:id` - Delete order
- `PATCH /api/orders/:id/status` - Update order status
- `GET /api/orders/stats` - Get order statistics

### Categories
- `GET /api/categories` - Get all categories
- `GET /api/categories/:id` - Get single category
- `POST /api/categories` - Create new category
- `PUT /api/categories/:id` - Update category
- `DELETE /api/categories/:id` - Delete category
- `GET /api/categories/tree` - Get category tree structure
- `PATCH /api/categories/:id/toggle` - Toggle category status

### Dashboard
- `GET /api/dashboard/stats` - Get dashboard statistics
- `GET /api/dashboard/recent-orders` - Get recent orders
- `GET /api/dashboard/analytics` - Get sales analytics

## Data Models

### Product Schema
```javascript
{
  name: String (required),
  description: String (required),
  price: Number (required),
  category: ObjectId (ref: Category),
  image: String (required, URL),
  stock: Number (required),
  status: String (enum: active, low_stock, out_of_stock),
  sku: String (unique),
  tags: [String],
  ratings: { average: Number, count: Number }
}
```

### Order Schema
```javascript
{
  orderNumber: String (unique),
  customer: {
    name: String,
    email: String,
    phone: String
  },
  items: [OrderItem],
  subtotal: Number,
  tax: Number,
  shipping: Number,
  total: Number,
  status: String (enum),
  shippingAddress: Address,
  paymentMethod: String,
  statusHistory: [StatusHistory]
}
```

### Category Schema
```javascript
{
  name: String (required, unique),
  description: String,
  slug: String (unique),
  image: String (URL),
  parent: ObjectId (ref: Category),
  isActive: Boolean,
  sortOrder: Number
}
```

## Sample Data

Run the seeder to populate your database with sample data:

```bash
# Import sample data
node utils/seeder.js

# Destroy all data
node utils/seeder.js -d
```

## Deployment

### Vercel Deployment

1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Deploy**
   ```bash
   vercel
   ```

3. **Environment Variables**
   Set the following environment variables in Vercel dashboard:
   - `MONGODB_URI`
   - `JWT_SECRET`
   - `NODE_ENV=production`

### Environment Variables for Production

```env
MONGODB_URI=your-production-mongodb-uri
JWT_SECRET=your-production-jwt-secret
NODE_ENV=production
CLIENT_URL=https://your-frontend-domain.vercel.app
```

## Error Handling

The API includes comprehensive error handling:

- **Validation Errors**: Mongoose validation with custom messages
- **404 Errors**: Resource not found responses
- **500 Errors**: Server error handling
- **Rate Limiting**: Protection against abuse
- **CORS**: Proper cross-origin handling

## Security Features

- **Helmet**: Security headers
- **CORS**: Configurable cross-origin requests
- **Rate Limiting**: Request throttling
- **Input Validation**: Mongoose schema validation
- **Error Sanitization**: Production error handling

## Performance Optimizations

- **Database Indexing**: Optimized queries
- **Pagination**: Efficient data loading
- **Compression**: Response compression
- **Caching Headers**: Browser caching
- **Aggregation Pipelines**: Complex queries optimization

## Development

```bash
# Start development server with auto-reload
npm run dev

# Check API health
curl http://localhost:5000/api/health
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

MIT License - see LICENSE file for details