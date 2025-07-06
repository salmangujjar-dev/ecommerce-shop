import type { Metadata } from 'next';

import Product from '@components/page/Product';
import Reviews from '@components/page/Product/Reviews';

import { api } from '~trpc/server';

import {
  generatePageMetadata,
  generateProductStructuredData,
} from '../../../../components/seo/page-seo';

interface ProductPageProps {
  params: Promise<{
    id: string;
  }>;
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { id } = await params;

  try {
    const product = await api.products.getById({ id });

    if (!product) {
      return generatePageMetadata({
        title: 'Product Not Found',
        description: 'The requested product could not be found.',
      });
    }

    const productUrl =
      (process.env.SITE_BASE_URL || 'https://buildastore.com') +
      `/product/${id}`;
    const productImage =
      product.images?.[0]?.src || '/default-product-image.jpg';

    // Check if any variants are in stock
    const hasStock =
      product.variants?.some((variant) => variant.inStock) || false;

    const structuredData = generateProductStructuredData({
      name: product.name,
      description: product.description || `Shop ${product.name} on BuildAStore`,
      price: product.price,
      currency: 'USD',
      image: productImage,
      url: productUrl,
      availability: hasStock ? 'InStock' : 'OutOfStock',
      category: product.category?.name,
      rating: product.rating,
      reviewCount: product.reviewCount,
    });

    return generatePageMetadata({
      title: product.name,
      description:
        product.description ||
        `Shop ${product.name} on BuildAStore. ${product.price} USD.`,
      keywords: [
        product.name,
        product.category?.name,
        product.gender?.name,
        'online shopping',
        'ecommerce',
      ].filter(Boolean),
      image: productImage,
      url: productUrl,
      type: 'website',
      structuredData,
    });
  } catch {
    return generatePageMetadata({
      title: 'Product',
      description: 'Product details on BuildAStore',
    });
  }
}

const ProductPage = async ({ params }: ProductPageProps) => {
  const { id } = await params;

  const product = await api.products.getById({ id });

  if (!product) {
    return <h1>Product not found</h1>;
  }

  return (
    <>
      <Product product={product} />
      <Reviews />
    </>
  );
};

export default ProductPage;
