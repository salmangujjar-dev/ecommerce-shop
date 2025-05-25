"use client";

import { cloneElement, ReactElement, useCallback, useState } from "react";

import { X } from "lucide-react";

import Product from "@components/page/Product";

import { Dialog } from "@ui/dialog";
import Spinner from "@ui/Spinner";

import { trpc } from "~trpc/client";

interface ProductQuickViewProps {
  children: ReactElement;
  productId: string;
}

const ProductQuickView = ({ children, productId }: ProductQuickViewProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const { data: product, isLoading } = trpc.products.getById.useQuery(
    { id: productId },
    { enabled: isOpen }
  );

  const onClose = useCallback(() => {
    setIsOpen(false);
  }, [setIsOpen]);

  return (
    <>
      {cloneElement(children as ReactElement<{ onClick?: () => void }>, {
        onClick: () => setIsOpen(true),
      })}
      <Dialog open={isOpen} size="5xl" onClose={onClose}>
        <X
          className="ml-auto cursor-pointer text-primary-500"
          onClick={onClose}
        />
        {isLoading ? (
          <Spinner className="mx-auto" />
        ) : !product ? (
          <h1>Product not found</h1>
        ) : (
          <Product product={product} />
        )}
      </Dialog>
    </>
  );
};

export default ProductQuickView;
