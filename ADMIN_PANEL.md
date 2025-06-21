# BuildAStore Admin Panel Documentation

## Overview

The BuildAStore admin panel is a comprehensive management interface that provides full CRUD operations for all ecommerce entities. Built with Next.js, tRPC, and Prisma, it offers a secure, type-safe, and user-friendly experience for managing your online store.

## Security & Access Control

### Role-Based Access

- All admin routes are protected with `adminProcedure`
- Requires admin privileges to access any admin functionality
- JWT-based authentication with secure session management

### Protected Routes

- `/admin/*` - All admin pages require admin authentication
- API endpoints use `adminProcedure` for security validation

## Dashboard

### 📊 **Analytics Overview**

The admin dashboard provides real-time insights into your store's performance:

- **Total Products**: Count of all products in the catalog
- **Total Categories**: Number of product categories
- **Total Orders**: Complete order count
- **Total Users**: Registered user accounts
- **Recent Orders**: Latest 5 orders with customer details
- **Low Stock Alerts**: Products with out-of-stock variants

### 🎯 **Quick Actions**

- Navigate to product management
- View recent orders
- Check low stock items
- Access user management

## Product Management

### 📦 **Product CRUD Operations**

#### Create Product

- **Basic Information**: Name, slug, description, price
- **Categorization**: Category and gender selection
- **Product Details**: Customizable detail list
- **Image Management**: Multiple image upload with primary selection
- **Variant Creation**: Color/size combinations with individual pricing

#### Product List

- **Pagination**: Configurable page size (1-100 items)
- **Search**: Search by name or description
- **Filtering**: Filter by category and gender
- **Sorting**: Default sort by creation date (newest first)

#### Edit Product

- **Basic Updates**: Modify name, slug, description, price
- **Category/Gender**: Change product categorization
- **Details Management**: Add/remove product details
- **Image Management**: Upload new images, set primary image
- **Variant Note**: Direct link to variant management page

#### Delete Product

- **Confirmation**: Safe deletion with confirmation dialog
- **Cascade**: Removes associated variants and images

### 🎨 **Product Variants**

#### Variant Management

- **Individual Pricing**: Set specific prices for color/size combinations
- **Stock Control**: Manage inventory per variant
- **Bulk Operations**: Create multiple variants efficiently

#### Variant Features

- **Color Selection**: Choose from available colors
- **Size Selection**: Select from available sizes
- **Price Override**: Optional variant-specific pricing
- **Stock Status**: Track availability per variant

## Category Management

### 📂 **Hierarchical Categories**

#### Category Structure

- **Parent Categories**: Main category groups
- **Subcategories**: Nested category organization
- **Product Count**: Track products per category

#### Category Operations

- **Create**: Add new categories with optional parent
- **Edit**: Modify category details and hierarchy
- **Delete**: Remove categories (with product count validation)
- **Search**: Find categories by name or description

## Color & Size Management

### 🎨 **Color Management**

- **Color Creation**: Name, slug, background color, selected color
- **Visual Preview**: Color swatches for easy identification
- **Product Association**: Track products using each color

### 📏 **Size Management**

- **Size Creation**: Name, optional pricing, stock status
- **Product Association**: Link sizes to specific products
- **Pricing**: Optional size-specific pricing

## Order Management

### 📋 **Order Processing**

#### Order List

- **Status Filtering**: Filter by order status
- **Pagination**: Handle large order volumes
- **Customer Info**: Display customer details
- **Payment Status**: Show payment information

#### Order Status Workflow

1. **PENDING** - Order received, awaiting confirmation
2. **CONFIRMED** - Order confirmed, processing
3. **IN_PROCESS** - Order being prepared/shipped
4. **DELIVERED** - Order completed
5. **CANCELED** - Order cancelled

#### Order Details

- **Customer Information**: Name, email, contact details
- **Product Details**: Items ordered with images
- **Payment Information**: Payment method and status
- **Order Total**: Calculated order amount

## User Management

### 👥 **User Administration**

#### User List

- **Search**: Find users by name, email, or username
- **Status Management**: Activate/deactivate user accounts
- **Order History**: View user's order count
- **Review History**: Track user's review count

#### User Operations

- **Profile Updates**: Modify user information
- **Status Control**: Enable/disable user accounts
- **Activity Tracking**: Monitor user engagement

## Technical Implementation

### 🔧 **Architecture**

#### Frontend Components

```
src/components/admin/
├── Dashboard/
│   ├── Stats.tsx          # Dashboard statistics
│   ├── RecentOrders.tsx   # Recent orders widget
│   └── LowStockAlert.tsx  # Low stock notifications
├── Products/
│   ├── ProductList.tsx    # Product listing table
│   ├── ProductForm.tsx    # Product creation/editing
│   └── ImageUpload.tsx    # Image management
├── Variants/
│   ├── VariantList.tsx    # Variant listing
│   └── VariantForm.tsx    # Variant creation/editing
└── Common/
    ├── DataTable.tsx      # Reusable data table
    ├── SearchFilter.tsx   # Search and filter controls
    └── Pagination.tsx     # Pagination component
```

#### Backend Procedures

```typescript
// Example admin procedure structure
export const adminRouter = createTRPCRouter({
  // Dashboard
  getDashboardStats: adminProcedure.query(async () => {
    // Returns dashboard statistics
  }),

  // Products
  getAllProducts: adminProcedure
    .input(ProductQuerySchema)
    .query(async ({ input }) => {
      // Returns paginated products with search/filter
    }),

  createProduct: adminProcedure
    .input(CreateProductSchema)
    .mutation(async ({ input }) => {
      // Creates new product with variants
    }),

  // Variants
  getAllVariants: adminProcedure
    .input(VariantQuerySchema)
    .query(async ({ input }) => {
      // Returns paginated variants
    }),

  // ... additional procedures
});
```

### 🛡️ **Security Features**

#### Authentication

- JWT-based authentication
- Secure session management
- Role-based access control

#### Data Validation

- Zod schema validation for all inputs
- Type-safe API procedures
- Input sanitization and validation

#### Error Handling

- Comprehensive error messages
- User-friendly error display
- Graceful failure handling

### 📊 **Performance Optimizations**

#### Database Queries

- Optimized Prisma queries with proper includes
- Pagination for large datasets
- Efficient filtering and search

#### Frontend Performance

- React Query for data caching
- Optimistic updates for better UX
- Lazy loading for large lists

#### Decimal Handling

- Proper conversion of Prisma Decimal objects to JavaScript numbers
- Prevents serialization errors in React components

## API Reference

### Dashboard Endpoints

```typescript
// Get dashboard statistics
trpc.admin.getDashboardStats.useQuery();

// Returns: {
//   totalProducts: number
//   totalCategories: number
//   totalOrders: number
//   totalUsers: number
//   recentOrders: Order[]
//   lowStockProducts: Product[]
// }
```

### Product Endpoints

```typescript
// Get all products with pagination and filtering
trpc.admin.getAllProducts.useQuery({
  page: number,
  limit: number,
  search?: string,
  categoryId?: string,
  genderId?: string
})

// Create new product
trpc.admin.createProduct.useMutation({
  name: string,
  slug: string,
  description: string,
  price: number,
  categoryId: string,
  genderId: string,
  details?: string[],
  images?: ImageData[],
  variants?: VariantData[]
})

// Update product
trpc.admin.updateProduct.useMutation({
  id: string,
  name?: string,
  slug?: string,
  description?: string,
  price?: number,
  categoryId?: string,
  genderId?: string,
  details?: string[]
})

// Delete product
trpc.admin.deleteProduct.useMutation({
  id: string
})
```

### Variant Endpoints

```typescript
// Get all variants
trpc.admin.getAllVariants.useQuery({
  page: number,
  limit: number,
  productId: string,
  search: string,
});

// Create variant
trpc.admin.createVariant.useMutation({
  productId: string,
  colorId: string,
  sizeId: string,
  price: number,
  inStock: boolean,
});

// Update variant
trpc.admin.updateVariant.useMutation({
  id: string,
  colorId: string,
  sizeId: string,
  price: number,
  inStock: boolean,
});
```

### Order Endpoints

```typescript
// Get all orders
trpc.admin.getAllOrders.useQuery({
  page: number,
  limit: number,
  status: OrderStatus,
});

// Update order status
trpc.admin.updateOrderStatus.useMutation({
  id: string,
  status: OrderStatus,
});
```

### User Endpoints

```typescript
// Get all users
trpc.admin.getAllUsers.useQuery({
  page: number,
  limit: number,
  search: string,
});

// Update user
trpc.admin.updateUser.useMutation({
  id: string,
  name: string,
  username: string,
  email: string,
  isActive: boolean,
});

// Update user status
trpc.admin.updateUserStatus.useMutation({
  id: string,
  isActive: boolean,
});
```

## Best Practices

### 🎯 **Data Management**

- Always validate input data before processing
- Use proper error handling for all operations
- Implement optimistic updates for better UX
- Cache frequently accessed data

### 🔒 **Security**

- Never expose sensitive data in client-side code
- Validate all user inputs on both client and server
- Use proper authentication for all admin operations
- Implement rate limiting for API endpoints

### 📱 **User Experience**

- Provide clear feedback for all user actions
- Use loading states for async operations
- Implement proper form validation
- Design responsive interfaces for all devices

### 🚀 **Performance**

- Optimize database queries with proper indexing
- Use pagination for large datasets
- Implement efficient search and filtering
- Cache static data where appropriate

## Troubleshooting

### Common Issues

#### Decimal Serialization Errors

**Problem**: "Only plain objects can be passed to Client Components"
**Solution**: All Decimal objects are now properly converted to numbers in the admin router

#### Authentication Issues

**Problem**: Admin routes not accessible
**Solution**: Ensure user has admin privileges and valid JWT token

#### Image Upload Issues

**Problem**: Images not uploading properly
**Solution**: Check file size limits and supported formats

### Debug Mode

Enable debug logging by setting `DEBUG=true` in environment variables for detailed error information.

## Future Enhancements

### Planned Features

- **Bulk Operations**: Mass update/delete capabilities
- **Advanced Analytics**: Detailed sales and performance metrics
- **Export Functionality**: Data export in various formats
- **Audit Logging**: Track all admin actions
- **Multi-language Support**: Internationalization
- **Advanced Search**: Full-text search with filters
- **Real-time Updates**: WebSocket integration for live updates

### Performance Improvements

- **Virtual Scrolling**: For large data sets
- **Advanced Caching**: Redis integration
- **CDN Integration**: For image delivery
- **Database Optimization**: Query optimization and indexing

---

**Last Updated**: December 2024
**Version**: 1.0.0
