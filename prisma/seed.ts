import { PrismaClient } from '../prisma/generated';

const prisma = new PrismaClient();

async function seedGender() {
  const genders = [
    {
      name: 'Men',
      slug: 'men',
    },
    {
      name: 'Women',
      slug: 'women',
    },
    {
      name: 'Unisex',
      slug: 'unisex',
    },
  ];
  return await Promise.all(
    genders.map((gender) =>
      prisma.gender.upsert({
        where: { slug: gender.slug },
        update: gender,
        create: gender,
      })
    )
  ).then((res) => {
    console.log('✅ Genders created');
    return res;
  });
}

async function seedCategories() {
  const mainCategories = [
    {
      name: 'Clothing',
      slug: 'clothing',
      description: 'All types of clothing',
      subcategories: [
        {
          name: 'T-Shirts',
          slug: 'tshirts',
          description: 'Classic and modern t-shirts',
        },
        {
          name: 'Jeans',
          slug: 'jeans',
          description: 'Premium denim jeans',
        },
        {
          name: 'Jackets',
          slug: 'jackets',
          description: 'Stylish jackets and outerwear',
        },
      ],
    },
    {
      name: 'Shoes',
      slug: 'shoes',
      description: 'All types of shoes',
      subcategories: [
        {
          name: 'Sneakers',
          slug: 'sneakers',
          description: 'Casual and athletic sneakers',
        },
        {
          name: 'Boots',
          slug: 'boots',
          description: 'Stylish and durable boots',
        },
        {
          name: 'Sandals',
          slug: 'sandals',
          description: 'Comfortable sandals for summer',
        },
      ],
    },
    {
      name: 'Accessories',
      slug: 'accessories',
      description: 'All types of accessories',
      subcategories: [
        {
          name: 'Watches',
          slug: 'watches',
          description: 'Luxury and casual watches',
        },
        {
          name: 'Bags',
          slug: 'bags',
          description: 'Stylish bags and backpacks',
        },
        {
          name: 'Jewelry',
          slug: 'jewelry',
          description: 'Elegant jewelry pieces',
        },
      ],
    },
  ];

  return await Promise.all(
    mainCategories.map(async (category) => {
      const { subcategories, ...mainCategoryData } = category;

      const createdCategory = await prisma.category.upsert({
        where: { slug: category.slug },
        update: mainCategoryData,
        create: mainCategoryData,
      });

      await Promise.all(
        subcategories.map((subcategory) =>
          prisma.category.upsert({
            where: { slug: subcategory.slug },
            update: {
              ...subcategory,
              parentId: createdCategory.id,
            },
            create: {
              ...subcategory,
              parentId: createdCategory.id,
            },
          })
        )
      );
    })
  ).then((res) => {
    console.log('✅ Categories and subcategories created');
    return res;
  });
}

async function seedColors() {
  const colors = [
    {
      name: 'Black',
      slug: 'black',
      bgColor: '#000000',
      selectedColor: '#000000',
    },
    {
      name: 'Heather Grey',
      slug: 'heather-gray',
      bgColor: '#9CA3AF',
      selectedColor: '#9CA3AF',
    },
  ];

  return await Promise.all(
    colors.map((color) =>
      prisma.color.upsert({
        where: { name: color.name },
        update: color,
        create: color,
      })
    )
  ).then((res) => {
    console.log('✅ Colors created');
    return res;
  });
}

async function seedUser() {
  const user = await prisma.user.upsert({
    where: { email: 'john.doe@example.com' },
    update: {},
    create: {
      name: 'John Doe',
      email: 'john.doe@example.com',
      username: 'johndoe',
      password: 'test',
      isActive: true,
    },
  });

  console.log('✅ User created');
  return user;
}

async function main() {
  const [_genders, _categories, colors, user] = await Promise.all([
    seedGender(),
    seedCategories(),
    seedColors(),
    seedUser(),
  ]);

  const unisexGender = await prisma.gender.findUnique({
    where: { slug: 'unisex' },
  });

  const accessoriesCategory = await prisma.category.findUnique({
    where: { slug: 'accessories' },
  });

  if (unisexGender && accessoriesCategory) {
    const basicSet = await prisma.product.upsert({
      where: { slug: 'organize-basic-set-walnut' },
      update: {},
      create: {
        name: 'Organize Basic Set (Walnut)',
        slug: 'organize-basic-set-walnut',
        description:
          'A beautiful walnut organizer set for your desk. Perfect for keeping your workspace tidy and stylish.',
        price: 149.0,
        genderId: unisexGender.id,
        categoryId: accessoriesCategory.id,
        details: [
          'Made from premium walnut wood',
          'Includes multiple compartments',
          'Perfect for desk organization',
          'Handcrafted with care',
        ],
        images: {
          create: [
            {
              src: 'https://tailwindcss.com/plus-assets/img/ecommerce-images/category-page-05-image-card-01.jpg',
              alt: 'Organize Basic Set (Walnut)',
              primary: true,
            },
          ],
        },
        colors: {
          create: [{ colorId: colors[0].id }, { colorId: colors[1].id }],
        },
        sizes: {
          create: [
            { name: 'XXS', inStock: true },
            { name: 'XS', inStock: true },
            { name: 'S', inStock: true },
            { name: 'M', inStock: true },
            { name: 'L', inStock: true },
            { name: 'XL', inStock: false },
          ],
        },
      },
    });

    // Add reviews for the basic set
    await prisma.review.createMany({
      data: [
        {
          productId: basicSet.id,
          userId: user.id,
          rating: 5,
          comment:
            'Excellent quality and craftsmanship. The walnut finish is beautiful!',
        },
        {
          productId: basicSet.id,
          userId: user.id,
          rating: 4,
          comment:
            'Great organizer, but a bit pricey. Still worth it for the quality.',
        },
      ],
    });

    // Create Organize Pen Holder
    const penHolder = await prisma.product.upsert({
      where: { slug: 'organize-pen-holder' },
      update: {},
      create: {
        name: 'Organize Pen Holder',
        slug: 'organize-pen-holder',
        description:
          'A sleek and functional pen holder to keep your desk organized. Made from high-quality materials.',
        price: 15.0,
        genderId: unisexGender.id,
        categoryId: accessoriesCategory.id,
        details: [
          'Durable construction',
          'Multiple pen slots',
          'Stable base',
          'Modern design',
        ],
        images: {
          create: [
            {
              src: 'https://tailwindcss.com/plus-assets/img/ecommerce-images/category-page-05-image-card-02.jpg',
              alt: 'Organize Pen Holder',
              primary: true,
            },
          ],
        },
        colors: {
          create: [{ colorId: colors[0].id }],
        },
        sizes: {
          create: [
            { name: 'XXS', inStock: true },
            { name: 'XS', inStock: true },
            { name: 'S', inStock: true },
            { name: 'M', inStock: true },
            { name: 'L', inStock: true },
            { name: 'XL', inStock: false },
          ],
        },
      },
    });

    // Add reviews for the pen holder
    await prisma.review.createMany({
      data: [
        {
          productId: penHolder.id,
          userId: user.id,
          rating: 5,
          comment:
            'Perfect size and very sturdy. Holds all my pens and pencils!',
        },
        {
          productId: penHolder.id,
          userId: user.id,
          rating: 4,
          comment: 'Good quality for the price. Would recommend.',
        },
      ],
    });
  }

  console.log('✅ Example products created');
  console.log('✅ Reviews created');
  console.log('🌱 Seed completed successfully');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
