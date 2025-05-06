import Image from "next/image";

import { FC } from "react";

import { COLLECTIONS } from "./constant";

const Collection: FC = () => {
  return (
    <section
      aria-labelledby="collection-heading"
      className="mx-auto max-w-xl px-4 pt-24 sm:px-6 sm:pt-32 lg:max-w-7xl lg:px-8"
    >
      <h2
        id="collection-heading"
        className="text-2xl font-bold tracking-tight text-gray-900"
      >
        Shop by Collection
      </h2>
      <p className="mt-4 text-base text-gray-500">
        Each season, we collaborate with world-class designers to create a
        collection inspired by the natural world.
      </p>

      <div className="mt-10 space-y-12 lg:grid lg:grid-cols-3 lg:space-y-0 lg:gap-x-8">
        {COLLECTIONS.map((collection) => (
          <a
            key={collection.name}
            href={collection.href}
            className="group block"
          >
            <Image
              width={0}
              height={0}
              sizes="100vw"
              alt={collection.imageAlt}
              src={collection.imageSrc}
              className="aspect-3/2 w-full rounded-lg object-cover group-hover:opacity-75 lg:aspect-5/6"
            />
            <h3 className="mt-4 text-base font-semibold text-gray-900">
              {collection.name}
            </h3>
            <p className="mt-2 text-sm text-gray-500">
              {collection.description}
            </p>
          </a>
        ))}
      </div>
    </section>
  );
};

export default Collection;
