import Image from "next/image";

import { StarIcon } from "lucide-react";

import { Link } from "@ui/link";

import Filters from "@common/Filters";

import { api } from "~trpc/server";

import { cn } from "@utils/cn";

import { FILTERS, SORT_OPTIONS } from "./constant";

interface CategoryPageProps {
  params: Promise<{ "gender-category": string }>;
  searchParams: Promise<{ q?: string }>;
}

const ProductsPage = async ({ params, searchParams }: CategoryPageProps) => {
  const { "gender-category": genderWithCategory } = await params;
  const [gender, category] = genderWithCategory?.split("-") || "";

  const query = (await searchParams)?.q;

  const products = await api.products.getByFilter({
    gender,
    category,
    query,
  });

  return (
    <>
      {/* Filters */}
      <Filters filters={FILTERS} sortOptions={SORT_OPTIONS} />

      {/* Product grid */}
      <section
        aria-labelledby="products-heading"
        className="mx-auto max-w-7xl overflow-hidden sm:px-6 lg:px-8"
      >
        <h2 id="products-heading" className="sr-only">
          Products
        </h2>

        <div className="-mx-px grid grid-cols-2 border-l border-gray-200 sm:mx-0 md:grid-cols-3 lg:grid-cols-4">
          {products.map((product) => (
            <div
              key={product.id}
              className="group relative border-r border-b border-gray-200 p-4 sm:p-6"
            >
              <Image
                width={0}
                height={0}
                sizes="100vw"
                alt={product.imageAlt}
                src={product.imageSrc}
                className="aspect-square w-full rounded-lg bg-gray-200 object-cover group-hover:opacity-75"
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
                          "size-5 shrink-0 cursor-pointer z-1"
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
      </section>

      {/* Pagination */}
      <div
        aria-label="Pagination"
        className="mx-auto mt-6 flex max-w-7xl justify-between px-4 text-sm font-medium text-gray-700 sm:px-6 lg:px-8"
      >
        <div className="min-w-0 flex-1">
          <Link
            href="#"
            className="inline-flex h-10 items-center rounded-md border border-gray-300 bg-white px-4 hover:bg-gray-100 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-600/25 focus:ring-offset-1 focus:ring-offset-indigo-600 focus:outline-hidden"
          >
            Previous
          </Link>
        </div>
        <div className="hidden space-x-2 sm:flex">
          {/* Current: "border-indigo-600 ring-1 ring-indigo-600", Default: "border-gray-300" */}
          <Link
            href="#"
            className="inline-flex h-10 items-center rounded-md border border-gray-300 bg-white px-4 hover:bg-gray-100 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-600/25 focus:ring-offset-1 focus:ring-offset-indigo-600 focus:outline-hidden"
          >
            1
          </Link>
          <Link
            href="#"
            className="inline-flex h-10 items-center rounded-md border border-gray-300 bg-white px-4 hover:bg-gray-100 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-600/25 focus:ring-offset-1 focus:ring-offset-indigo-600 focus:outline-hidden"
          >
            2
          </Link>
          <Link
            href="#"
            className="inline-flex h-10 items-center rounded-md border border-indigo-600 bg-white px-4 ring-1 ring-indigo-600 hover:bg-gray-100 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-600/25 focus:ring-offset-1 focus:ring-offset-indigo-600 focus:outline-hidden"
          >
            3
          </Link>
          <span className="inline-flex h-10 items-center px-1.5 text-gray-500">
            ...
          </span>
          <Link
            href="#"
            className="inline-flex h-10 items-center rounded-md border border-gray-300 bg-white px-4 hover:bg-gray-100 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-600/25 focus:ring-offset-1 focus:ring-offset-indigo-600 focus:outline-hidden"
          >
            8
          </Link>
          <Link
            href="#"
            className="inline-flex h-10 items-center rounded-md border border-gray-300 bg-white px-4 hover:bg-gray-100 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-600/25 focus:ring-offset-1 focus:ring-offset-indigo-600 focus:outline-hidden"
          >
            9
          </Link>
          <Link
            href="#"
            className="inline-flex h-10 items-center rounded-md border border-gray-300 bg-white px-4 hover:bg-gray-100 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-600/25 focus:ring-offset-1 focus:ring-offset-indigo-600 focus:outline-hidden"
          >
            10
          </Link>
        </div>
        <div className="flex min-w-0 flex-1 justify-end">
          <Link
            href="#"
            className="inline-flex h-10 items-center rounded-md border border-gray-300 bg-white px-4 hover:bg-gray-100 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-600/25 focus:ring-offset-1 focus:ring-offset-indigo-600 focus:outline-hidden"
          >
            Next
          </Link>
        </div>
      </div>
    </>
  );
};

export default ProductsPage;
