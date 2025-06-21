import { hash } from 'bcrypt-ts';

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
    {
      name: 'Silver',
      slug: 'silver',
      bgColor: '#C0C0C0',
      selectedColor: '#C0C0C0',
    },
    {
      name: 'Gold',
      slug: 'gold',
      bgColor: '#FFD700',
      selectedColor: '#FFD700',
    },
    {
      name: 'Brown',
      slug: 'brown',
      bgColor: '#8B4513',
      selectedColor: '#8B4513',
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
      password: await hash('Test@1234', 10),
      isActive: true,
      isAdmin: true,
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

  const mensGender = await prisma.gender.findUnique({
    where: { slug: 'men' },
  });

  const watchesCategory = await prisma.category.findUnique({
    where: { slug: 'watches' },
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
            { name: 'XXS' },
            { name: 'XS' },
            { name: 'S' },
            { name: 'M' },
            { name: 'L' },
            { name: 'XL' },
          ],
        },
      },
    });

    // Fetch created sizes and colors for the product
    const basicSetWithRelations = await prisma.product.findUnique({
      where: { id: basicSet.id },
      include: {
        sizes: true,
        colors: { include: { color: true } },
      },
    });

    // Example: Black has S-L, Heather Grey has all sizes
    const blackColor = basicSetWithRelations?.colors.find(
      (c) => c.color.name === 'Black'
    )?.color;
    const grayColor = basicSetWithRelations?.colors.find(
      (c) => c.color.name === 'Heather Grey'
    )?.color;
    const sizes = basicSetWithRelations?.sizes || [];
    const sizeMap = Object.fromEntries(sizes.map((s) => [s.name, s]));

    // Remove existing variants for this product
    await prisma.productVariant.deleteMany({
      where: { productId: basicSet.id },
    });
    // Black: S, M, L
    for (const sizeName of ['S', 'M', 'L']) {
      if (blackColor && sizeMap[sizeName]) {
        await prisma.productVariant.create({
          data: {
            productId: basicSet.id,
            colorId: blackColor.id,
            sizeId: sizeMap[sizeName].id,
            price:
              sizeName === 'M'
                ? 159.0
                : sizeName === 'L'
                ? 169.0
                : basicSet.price,
            inStock: true,
          },
        });
      }
    }
    // Heather Grey: all sizes
    if (grayColor) {
      for (const size of sizes) {
        await prisma.productVariant.create({
          data: {
            productId: basicSet.id,
            colorId: grayColor.id,
            sizeId: size.id,
            price:
              size.name === 'M'
                ? 159.0
                : size.name === 'L'
                ? 169.0
                : basicSet.price,
            inStock: size.name !== 'XL',
          },
        });
      }
    }

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
            { name: 'XXS' },
            { name: 'XS' },
            { name: 'S' },
            { name: 'M' },
            { name: 'L' },
            { name: 'XL' },
          ],
        },
      },
    });
    const penHolderWithRelations = await prisma.product.findUnique({
      where: { id: penHolder.id },
      include: {
        sizes: true,
        colors: { include: { color: true } },
      },
    });
    const penHolderBlack = penHolderWithRelations?.colors.find(
      (c) => c.color.name === 'Black'
    )?.color;
    const penHolderSizes = penHolderWithRelations?.sizes || [];

    // Remove existing variants for this product
    await prisma.productVariant.deleteMany({
      where: { productId: penHolder.id },
    });
    if (penHolderBlack) {
      for (const size of penHolderSizes) {
        await prisma.productVariant.create({
          data: {
            productId: penHolder.id,
            colorId: penHolderBlack.id,
            sizeId: size.id,
            price:
              size.name === 'M'
                ? 19.0
                : size.name === 'L'
                ? 21.0
                : penHolder.price,
            inStock: size.name !== 'XL',
          },
        });
      }
    }

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

  // Create Men's Watch
  if (mensGender && watchesCategory) {
    const mensWatch = await prisma.product.upsert({
      where: { slug: 'mens-classic-watch' },
      update: {},
      create: {
        name: "Men's Classic Watch",
        slug: 'mens-classic-watch',
        description:
          'A timeless classic watch with premium craftsmanship. Features a durable stainless steel case and genuine leather strap.',
        price: 299.0,
        genderId: mensGender.id,
        categoryId: watchesCategory.id,
        details: [
          'Stainless steel case',
          'Genuine leather strap',
          'Water resistant up to 50m',
          'Japanese quartz movement',
          'Scratch-resistant mineral crystal',
          'Date display function',
        ],
        images: {
          create: [
            {
              src: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
              alt: "Men's Classic Watch",
              primary: true,
            },
          ],
        },
        colors: {
          create: [
            { colorId: colors[0].id }, // Black
            { colorId: colors[2].id }, // Silver
            { colorId: colors[3].id }, // Gold
          ],
        },
        sizes: {
          create: [
            { name: '38mm' },
            { name: '40mm' },
            { name: '42mm' },
            { name: '44mm' },
          ],
        },
      },
    });

    const mensWatchWithRelations = await prisma.product.findUnique({
      where: { id: mensWatch.id },
      include: {
        sizes: true,
        colors: { include: { color: true } },
      },
    });

    const watchBlack = mensWatchWithRelations?.colors.find(
      (c) => c.color.name === 'Black'
    )?.color;
    const watchSilver = mensWatchWithRelations?.colors.find(
      (c) => c.color.name === 'Silver'
    )?.color;
    const watchGold = mensWatchWithRelations?.colors.find(
      (c) => c.color.name === 'Gold'
    )?.color;
    const watchSizes = mensWatchWithRelations?.sizes || [];

    // Remove existing variants for this product
    await prisma.productVariant.deleteMany({
      where: { productId: mensWatch.id },
    });

    // Create variants for the watch
    if (watchBlack) {
      for (const size of watchSizes) {
        await prisma.productVariant.create({
          data: {
            productId: mensWatch.id,
            colorId: watchBlack.id,
            sizeId: size.id,
            price: 299.0,
            inStock: size.name !== '44mm',
          },
        });
      }
    }

    if (watchSilver) {
      for (const size of watchSizes) {
        await prisma.productVariant.create({
          data: {
            productId: mensWatch.id,
            colorId: watchSilver.id,
            sizeId: size.id,
            price: 349.0, // Silver version is more expensive
            inStock: true,
          },
        });
      }
    }

    if (watchGold) {
      for (const size of watchSizes) {
        await prisma.productVariant.create({
          data: {
            productId: mensWatch.id,
            colorId: watchGold.id,
            sizeId: size.id,
            price: 399.0, // Gold version is most expensive
            inStock: size.name !== '38mm',
          },
        });
      }
    }

    // Add reviews for the men's watch
    await prisma.review.createMany({
      data: [
        {
          productId: mensWatch.id,
          userId: user.id,
          rating: 5,
          comment:
            'Absolutely love this watch! The quality is exceptional and it looks great with any outfit.',
        },
        {
          productId: mensWatch.id,
          userId: user.id,
          rating: 5,
          comment:
            'Perfect size and weight. The leather strap is comfortable and the movement is accurate.',
        },
        {
          productId: mensWatch.id,
          userId: user.id,
          rating: 4,
          comment:
            'Great watch for the price. The silver finish is elegant and professional.',
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
