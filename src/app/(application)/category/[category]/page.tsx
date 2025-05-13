import Image from "next/image";

import { StarIcon } from "lucide-react";

import { Link } from "@ui/link";

import { cn } from "@utils/cn";

import { PRODUCTS } from "./constant";

const CategoryPage = () => {
  return (
    <div className="-mx-px grid grid-cols-2 border-l border-t border-gray-200 sm:mx-0 md:grid-cols-3 lg:grid-cols-4">
      {PRODUCTS.map((product) => (
        <div
          key={product.id}
          className={cn(
            "group relative border-r border-b border-gray-200 p-4 sm:p-6"
          )}
        >
          <Image
            width={275}
            height={400}
            loading="lazy"
            alt={product.imageAlt}
            src={product.imageSrc}
            className="aspect-square rounded-lg bg-gray-200 object-cover group-hover:opacity-75"
          />
          <div className="pt-10 pb-4 text-center">
            <h3 className="text-sm font-medium text-gray-900">
              <Link href={product.href}>
                <span aria-hidden="true" className="absolute inset-0" />
                {product.name}
              </Link>
            </h3>
            <div className="mt-3 flex flex-col items-center">
              <p className="sr-only">{product.rating} out of 5 stars</p>
              <div className="flex items-center">
                {[0, 1, 2, 3, 4].map((rating) => (
                  <StarIcon
                    key={rating}
                    aria-hidden="true"
                    className={cn(
                      product.rating > rating
                        ? "text-yellow-400 fill-yellow-400"
                        : "text-gray-200 hover:fill-yellow-400 hover:text-yellow-400",
                      "size-5 shrink-0 z-1 cursor-pointer"
                    )}
                  />
                ))}
              </div>
              <p className="mt-1 text-sm text-gray-500">
                {product.reviewCount} reviews
              </p>
            </div>
            <p className="mt-4 text-base font-medium text-gray-900">
              {product.price}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CategoryPage;
