import Image from "next/image";

import { FC } from "react";

import { Link } from "@ui/link";

import { cn } from "@utils/cn";

import { FEATURED_ITEMS } from "./constant";

interface FeatureProps {
  index: number;
  className?: string;
}

const Featured: FC<FeatureProps> = ({ index, className }) => {
  return (
    <section
      aria-labelledby={`${FEATURED_ITEMS[index].id}-heading`}
      className={cn(
        "mx-auto max-w-7xl px-4 pt-24 sm:px-6 sm:pt-32 lg:px-8",
        className
      )}
    >
      <div className="relative overflow-hidden rounded-lg">
        <div className="absolute inset-0">
          <Image
            alt=""
            width={0}
            height={0}
            sizes="100vw"
            src={FEATURED_ITEMS[index].coverImg}
            className="size-full object-cover"
          />
        </div>
        <div className="relative bg-gray-900/75 px-6 py-32 sm:px-12 sm:py-40 lg:px-16">
          <div className="relative mx-auto flex max-w-3xl flex-col items-center text-center">
            <h2
              id={`${FEATURED_ITEMS[index].id}-heading`}
              className="text-3xl font-bold tracking-tight text-white sm:text-4xl"
            >
              <span className="block sm:inline">
                {FEATURED_ITEMS[index].heading}
              </span>
            </h2>
            <p className="mt-3 text-xl text-white">
              {FEATURED_ITEMS[index].description}
            </p>
            <Link
              href={FEATURED_ITEMS[index].link.to}
              className="mt-8 block w-full rounded-md border border-transparent bg-white px-8 py-3 text-base font-medium text-gray-900 hover:bg-gray-100 sm:w-auto"
            >
              {FEATURED_ITEMS[index].link.text}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Featured;
