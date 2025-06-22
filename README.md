# BuildAStore

> **Disclaimer:** BuildAStore is a personal side project inspired by the idea: _What if someone wants to create an online store completely free of cost?_ This project is not affiliated with any company and is intended as an open, no-cost solution for anyone interested in launching their own ecommerce platform.

A modern, full-stack ecommerce platform built with Next.js, Prisma, tRPC, and TypeScript. BuildAStore provides everything you need to create and manage your online store with a beautiful, responsive interface and powerful backend capabilities.

## Features

- 🛍️ **Complete Shopping Experience** - Product browsing, cart, checkout, and order management
- ⚡ **Next.js 15** - Latest React framework with App Router
- 🔐 **Authentication** - Secure user management with JWT
- 🗄️ **Prisma ORM** - Type-safe database operations
- 🔄 **tRPC** - End-to-end type safety
- 🎨 **Tailwind CSS** - Beautiful, responsive design
- 📱 **Mobile-First** - Optimized for all devices
- 🚀 **Performance** - Optimized for speed and SEO
- 👨‍💼 **Admin Panel** - Comprehensive management interface
- 🔒 **Role-Based Access** - Admin and user permissions
- 📊 **Dashboard Analytics** - Sales and inventory insights
- 🛒 **Shopping Cart** - Persistent cart with database sync
- 💳 **Order Management** - Complete order lifecycle
- 🔍 **Advanced Filtering** - Multi-criteria product search and filtering
- ⭐ **Product Reviews** - Customer ratings and reviews system
- 🔐 **User Authentication** - Login, registration, and session management

## Customer Features

### 🛍️ **Shopping Experience**

- **Product Catalog**: Browse products with advanced filtering
- **Product Details**: Detailed product pages with variants, images, and reviews
- **Shopping Cart**: Add/remove items, quantity management, persistent cart
- **Guest Checkout**: Complete checkout process for non-registered users
- **User Registration**: Account creation and management
- **Order History**: View past orders and track current orders
- **Product Reviews**: Rate and review products

### 🔍 **Advanced Product Filtering**

- **Search**: Full-text search across product names and descriptions
- **Category Filtering**: Filter by main categories and subcategories
- **Gender Filtering**: Filter by men, women, or unisex products
- **Price Range**: Filter by predefined price ranges
- **Color Filtering**: Multi-select color filtering
- **Size Filtering**: Multi-select size filtering
- **Sorting**: Sort by newest, popularity, price (asc/desc), rating
- **Filter Badges**: Visual display of active filters with easy removal
- **URL State**: All filters preserved in URL for sharing and bookmarking

### 🛒 **Shopping Cart System**

- **Persistent Cart**: Cart data saved to database for logged-in users
- **Cart Sync**: Automatic cart synchronization on login
- **Guest Cart**: Temporary cart for non-registered users
- **Quantity Management**: Add, remove, and update item quantities
- **Cart Summary**: Real-time total calculation
- **Cart Persistence**: Cart survives browser sessions

### 💳 **Checkout Process**

- **Guest Checkout**: Complete checkout without registration
- **User Checkout**: Streamlined checkout for registered users
- **Shipping Information**: Collect and validate shipping addresses
- **Payment Information**: Secure payment data collection
- **Order Confirmation**: Order success page with order details
- **Email Notifications**: Order confirmation emails (ready for integration)

### 📦 **Order Management**

- **Order Creation**: Complete order creation with all details
- **Order Status**: Track order status (pending, processing, shipped, delivered)
- **Order History**: View all past orders with details
- **Order Details**: Complete order information including items, shipping, payment
- **Order Tracking**: Real-time order status updates

### 🔐 **User Authentication**

- **User Registration**: Secure account creation with validation
- **User Login**: JWT-based authentication with remember me
- **Session Management**: Secure session handling with cookies
- **Password Security**: Bcrypt hashing for password protection
- **Account Management**: User profile and account settings
- **Protected Routes**: Middleware-based route protection

### ⭐ **Product Reviews & Ratings**

- **Star Ratings**: 1-5 star rating system
- **Review Comments**: Text-based product reviews
- **Review Management**: Create, update, and delete reviews
- **Average Ratings**: Automatic calculation of product ratings
- **Review Display**: Show reviews on product pages
- **Review Moderation**: Admin control over review content

## Admin Panel Features

### 🎛️ **Complete CRUD Operations**

- **Products**: Create, read, update, delete with variant management
- **Categories**: Hierarchical category management
- **Colors & Sizes**: Product attribute management
- **Variants**: Color/size combinations with individual pricing
- **Orders**: Order status management and tracking
- **Users**: User account management and status control
- **Reviews**: Review moderation and management

### 📈 **Dashboard Analytics**

- Total products, categories, orders, and users
- Recent orders with customer information
- Low stock product alerts
- Real-time statistics and metrics
- Sales performance insights
- Customer activity tracking
- Review analytics and ratings

### 🔍 **Advanced Features**

- Search and filtering across all entities
- Pagination for large datasets
- Bulk operations support
- Image management with primary image selection
- Product variant management with individual pricing
- Order status workflow management
- User activity monitoring
- Inventory management
- Review moderation tools

### 📊 **Admin Pages**

- **Dashboard**: Overview with key metrics and recent activity
- **Products**: Complete product management with variants
- **Categories**: Category hierarchy management
- **Variants**: Product variant management
- **Sizes**: Product size management
- **Colors**: Product color management
- **Orders**: Order management with status updates
- **Users**: User account management
- **Analytics**: Detailed analytics and reporting
- **Reviews**: Review management and moderation

## Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL database
- npm, yarn, pnpm, or bun

### Installation

1. **Clone the repository**

```bash
git clone <repository-url>
cd ecommerce-shop
```

2. **Install dependencies**

```bash
npm install
# or
yarn install
```

3. **Set up environment variables**

```bash
cp .env.example .env.local
```

Configure your `.env.local` with:

```env
DATABASE_URL="postgresql://username:password@localhost:5432/buildastore"
SESSION_SECRET="your-secret-key"
SITE_BASE_URL="http://localhost:3000"
```

4. **Set up the database**

```bash
npx prisma generate
npx prisma db push
# or for migrations
npx prisma migrate dev
```

5. **Seed the database (optional)**

```bash
npm run seed
```

6. **Start the development server**

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── admin/             # Admin panel pages
│   │   ├── dashboard/     # Admin dashboard
│   │   ├── products/      # Product management
│   │   ├── categories/    # Category management
│   │   ├── variants/      # Product variant management
│   │   ├── sizes/         # Size management
│   │   ├── colors/        # Color management
│   │   ├── orders/        # Order management
│   │   ├── users/         # User management
│   │   └── analytics/     # Analytics dashboard
│   ├── (application)/     # Main application pages
│   │   ├── shop/          # Shop pages with filtering
│   │   ├── product/       # Product detail pages
│   │   ├── cart/          # Shopping cart
│   │   ├── checkout/      # Checkout process
│   │   ├── order-success/ # Order confirmation
│   │   ├── dashboard/     # User dashboard
│   │   ├── (authentication)/ # Login/register pages
│   │   └── account/       # User account pages
│   └── api/               # API routes
├── components/            # React components
│   ├── admin/            # Admin-specific components
│   ├── common/           # Shared components
│   ├── shop/             # Shop-specific components
│   ├── page/             # Page-specific components
│   ├── seo/              # SEO components
│   └── ui/               # UI components
├── lib/                  # Utility libraries
│   ├── prisma.ts         # Database client
│   ├── trpc.ts           # tRPC configuration
│   ├── session/          # Session management
│   └── api/              # External API utilities
├── services/             # Business logic services
│   └── JWT/              # JWT service
├── trpc/                 # tRPC routers and procedures
│   └── router/
│       ├── admin.ts      # Admin API procedures
│       ├── products.ts   # Product API procedures
│       ├── categories.ts # Category API procedures
│       ├── cart.ts       # Cart API procedures
│       ├── orders.ts     # Order API procedures
│       ├── auth.ts       # Authentication procedures
│       ├── user.ts       # User procedures
│       ├── review.ts     # Review procedures
│       └── gender.ts     # Gender procedures
├── store/                # State management
│   └── cart.ts           # Cart store (Zustand)
├── types/                # TypeScript type definitions
└── utils/                # Utility functions
```

## Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS 4, Framer Motion
- **Backend**: tRPC, Prisma ORM
- **Database**: PostgreSQL (via Prisma)
- **Authentication**: JWT with Jose, bcrypt for password hashing
- **State Management**: Zustand for client state
- **Forms**: React Hook Form with Zod validation
- **UI Components**: Headless UI, Lucide React icons
- **Admin Panel**: Custom admin interface with role-based access
- **Cart Management**: Persistent cart with database sync
- **Order Processing**: Complete order lifecycle management
- **Session Management**: Secure cookie-based sessions
- **Middleware**: Route protection and authentication

## Recent Updates

### ✅ **Complete Shopping Experience**

- **Shop Page**: Full-featured shop with advanced filtering
- **Product Filtering**: Multi-criteria filtering with URL state
- **Search Functionality**: Full-text search across products
- **Filter Badges**: Visual filter management with easy removal
- **Pagination**: Server-side pagination with filter preservation

### ✅ **Shopping Cart System**

- **Persistent Cart**: Database-backed cart for logged-in users
- **Cart Sync**: Automatic cart synchronization on login
- **Guest Cart**: Temporary cart for non-registered users
- **Cart Management**: Add, remove, update quantities
- **Cart Persistence**: Cart survives browser sessions

### ✅ **Order Management**

- **Order Creation**: Complete order creation for both users and guests
- **Checkout Process**: Full checkout with shipping and payment info
- **Order Status**: Complete order status workflow
- **Order History**: User order history and tracking
- **Order Details**: Comprehensive order information display

### ✅ **User Authentication**

- **JWT Authentication**: Secure token-based authentication
- **Session Management**: Cookie-based session handling
- **Route Protection**: Middleware-based route security
- **Password Security**: Bcrypt hashing and validation
- **Remember Me**: Extended session functionality

### ✅ **Product Reviews**

- **Rating System**: 1-5 star rating with visual display
- **Review Management**: Create, update, delete reviews
- **Average Calculation**: Automatic product rating updates
- **Review Display**: Show reviews on product pages
- **Review Moderation**: Admin tools for review management

### ✅ **Admin Enhancements**

- **Complete CRUD**: All entities have full CRUD operations
- **Detail Pages**: Detailed view pages for all resources
- **Analytics Dashboard**: Comprehensive analytics and metrics
- **User Management**: Complete user account management
- **Order Management**: Advanced order status management

### ✅ **API Improvements**

- **Public Procedures**: Proper separation of public and admin APIs
- **Server-Side Filtering**: Efficient database-level filtering
- **Type Safety**: Enhanced type safety across all procedures
- **Performance**: Optimized queries and caching

### ✅ **User Experience**

- **Responsive Design**: Mobile-first responsive design
- **Loading States**: Proper loading states and feedback
- **Error Handling**: Comprehensive error handling
- **SEO Optimization**: SEO-friendly URLs and metadata
- **Accessibility**: Improved accessibility features

## API Documentation

### Public Procedures

```typescript
// Product filtering with all criteria
const products = await trpc.products.getByFilter.useQuery({
  search: 'search term',
  genderSlug: 'men',
  categorySlug: 'clothing',
  minPrice: 25,
  maxPrice: 100,
  colors: ['blue', 'red'],
  sizes: ['m', 'l'],
  sort: 'price_asc',
  page: 1,
  limit: 12,
});

// Cart operations
const cart = await trpc.cart.getCart.useQuery();
const addToCart = trpc.cart.addToCart.useMutation();
const removeFromCart = trpc.cart.removeFromCart.useMutation();

// Order creation
const createOrder = trpc.orders.createOrder.useMutation();
const createGuestOrder = trpc.orders.createGuestOrder.useMutation();

// Authentication
const login = trpc.auth.login.useMutation();
const register = trpc.auth.register.useMutation();

// Reviews
const reviews = trpc.reviews.getByProductId.useQuery({ productId: 'id' });
const createReview = trpc.reviews.create.useMutation();
```

### Admin Procedures

All admin procedures use `adminProcedure` for security:

```typescript
// Example: Get all products with pagination
const products = await trpc.admin.getAllProducts.useQuery({
  page: 1,
  limit: 10,
  search: 'search term',
  categoryId: 'category-id',
  genderId: 'gender-id',
});

// User management
const users = await trpc.admin.getAllUsers.useQuery();
const updateUser = trpc.admin.updateUser.useMutation();

// Order management
const orders = await trpc.admin.getAllOrders.useQuery();
const updateOrderStatus = trpc.admin.updateOrderStatus.useMutation();
```

### Key Features

- **Type Safety**: Full end-to-end TypeScript support
- **Validation**: Zod schema validation for all inputs
- **Error Handling**: Comprehensive error handling and user feedback
- **Performance**: Optimized queries with proper indexing
- **Security**: Role-based access control for admin operations
- **Authentication**: JWT-based secure authentication

## Database Schema

The application uses a comprehensive database schema with:

- **Users**: User accounts with role-based access and authentication
- **Products**: Core product information with variants and images
- **Categories**: Hierarchical category structure with subcategories
- **Variants**: Color/size combinations with individual pricing
- **Orders**: Complete order management with status tracking
- **Order Items**: Individual items within orders
- **Payments**: Payment processing integration
- **Reviews**: Product reviews and ratings system
- **Cart Items**: Shopping cart management
- **Genders**: Product gender categorization
- **Colors**: Product color options
- **Sizes**: Product size options
- **Product Images**: Product image management with primary selection

## Deployment

### Vercel Deployment

The easiest way to deploy your BuildAStore app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme).

### Environment Variables

Make sure to configure all required environment variables in your deployment platform:

- `DATABASE_URL`: PostgreSQL connection string
- `SESSION_SECRET`: JWT signing secret
- `SITE_BASE_URL`: Your application URL

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## Learn More

To learn more about the technologies used:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Prisma Documentation](https://www.prisma.io/docs) - database toolkit
- [tRPC Documentation](https://trpc.io/docs) - end-to-end typesafe APIs
- [Tailwind CSS Documentation](https://tailwindcss.com/docs) - utility-first CSS framework

## License

This project is licensed under the MIT License.
