# BuildAStore

A modern, full-stack ecommerce platform built with Next.js, Prisma, tRPC, and TypeScript. BuildAStore provides everything you need to create and manage your online store with a beautiful, responsive interface and powerful backend capabilities.

## Features

- 🛍️ **Modern Ecommerce Platform** - Complete shopping experience
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

## Admin Panel Features

### 🎛️ **Complete CRUD Operations**

- **Products**: Create, read, update, delete with variant management
- **Categories**: Hierarchical category management
- **Colors & Sizes**: Product attribute management
- **Variants**: Color/size combinations with individual pricing
- **Orders**: Order status management and tracking
- **Users**: User account management and status control

### 📈 **Dashboard Analytics**

- Total products, categories, orders, and users
- Recent orders with customer information
- Low stock product alerts
- Real-time statistics

### 🔍 **Advanced Features**

- Search and filtering across all entities
- Pagination for large datasets
- Bulk operations support
- Image management with primary image selection
- Product variant management with individual pricing
- Order status workflow management

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
JWT_SECRET="your-secret-key"
NEXTAUTH_SECRET="your-nextauth-secret"
NEXTAUTH_URL="http://localhost:3000"
```

4. **Set up the database**

```bash
npx prisma generate
npx prisma db push
# or for migrations
npx prisma migrate dev
```

5. **Start the development server**

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
│   │   ├── products/      # Product management
│   │   ├── categories/    # Category management
│   │   ├── variants/      # Product variant management
│   │   ├── orders/        # Order management
│   │   └── users/         # User management
│   ├── (application)/     # Main application pages
│   └── api/               # API routes
├── components/            # React components
│   ├── admin/            # Admin-specific components
│   ├── common/           # Shared components
│   └── ui/               # UI components
├── lib/                  # Utility libraries
│   ├── prisma.ts         # Database client
│   └── trpc.ts           # tRPC configuration
├── trpc/                 # tRPC routers and procedures
│   └── router/
│       ├── admin.ts      # Admin API procedures
│       ├── products.ts   # Product API procedures
│       └── categories.ts # Category API procedures
└── types/                # TypeScript type definitions
```

## Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS 4, Framer Motion
- **Backend**: tRPC, Prisma ORM
- **Database**: PostgreSQL (via Prisma)
- **Authentication**: JWT with Jose
- **State Management**: Zustand
- **Forms**: React Hook Form with Zod validation
- **UI Components**: Headless UI, Lucide React icons
- **Admin Panel**: Custom admin interface with role-based access

## Recent Updates

### ✅ **Decimal Serialization Fix**

- Fixed Prisma Decimal object serialization issues
- All price and total fields now properly convert to JavaScript numbers
- Resolved "Only plain objects can be passed to Client Components" error

### ✅ **Admin Panel Security**

- Implemented `adminProcedure` for role-based access control
- All admin routes now require admin privileges
- Enhanced security for sensitive operations

### ✅ **Product Variant Management**

- Complete CRUD operations for product variants
- Individual pricing for color/size combinations
- Stock management per variant
- Integrated with product creation workflow

### ✅ **Enhanced User Experience**

- Improved form validation and error handling
- Better loading states and feedback
- Responsive design for all admin pages
- Intuitive navigation and workflow

## API Documentation

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
```

### Key Features

- **Type Safety**: Full end-to-end TypeScript support
- **Validation**: Zod schema validation for all inputs
- **Error Handling**: Comprehensive error handling and user feedback
- **Performance**: Optimized queries with proper indexing

## Database Schema

The application uses a comprehensive database schema with:

- **Products**: Core product information with variants
- **Categories**: Hierarchical category structure
- **Variants**: Color/size combinations with pricing
- **Orders**: Complete order management
- **Users**: User accounts with role-based access
- **Payments**: Payment processing integration

## Deployment

### Vercel Deployment

The easiest way to deploy your BuildAStore app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme).

### Environment Variables

Make sure to configure all required environment variables in your deployment platform:

- `DATABASE_URL`: PostgreSQL connection string
- `JWT_SECRET`: JWT signing secret
- `NEXTAUTH_SECRET`: NextAuth.js secret
- `NEXTAUTH_URL`: Your application URL

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
