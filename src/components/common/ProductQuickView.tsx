"use client";

import { cloneElement, ReactElement, useCallback, useState } from "react";

import { X } from "lucide-react";

import Product from "@components/page/Product";

import { Dialog } from "@ui/dialog";
import Spinner from "@ui/Spinner";

import { trpc } from "~trpc/client";

interface ProductQuickViewProps {
  children: ReactElement;
  productId: number;
}

const ProductQuickView = ({ children, productId }: ProductQuickViewProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const { data: product } = trpc.products.getById.useQuery(
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
        {product ? (
          <Product product={product} />
        ) : (
          <Spinner className="mx-auto" />
        )}
      </Dialog>
    </>
  );
};

export default ProductQuickView;
