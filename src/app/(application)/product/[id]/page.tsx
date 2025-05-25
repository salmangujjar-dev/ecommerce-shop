import Product from "@components/page/Product";
import Reviews from "@components/page/Product/Reviews";

import { api } from "~trpc/server";

interface ProductPageProps {
  params: {
    id: string;
  };
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
