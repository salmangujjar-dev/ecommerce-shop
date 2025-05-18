import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@lib/trpc";

export const productRouter = createTRPCRouter({
  getById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input: { id } }) => {
      console.log({ id });
      const product = {
        name: "Basic Tee",
        price: "$35",
        rating: 3.9,
        reviewCount: 512,
        href: "/products/1",
        breadcrumbs: [
          { id: 1, name: "Men", href: "/men" },
          { id: 2, name: "Clothing", href: "/men-clothing" },
        ],
        images: [
          {
            id: 1,
            src: "https://tailwindcss.com/plus-assets/img/ecommerce-images/product-page-03-product-01.jpg",
            alt: "Back of women's Basic Tee in black.",
            primary: true,
          },
          {
            id: 2,
            src: "https://tailwindcss.com/plus-assets/img/ecommerce-images/product-page-01-product-shot-01.jpg",
            alt: "Side profile of women's Basic Tee in black.",
            primary: false,
          },
          {
            id: 3,
            src: "https://tailwindcss.com/plus-assets/img/ecommerce-images/product-page-01-product-shot-02.jpg",
            alt: "Front of women's Basic Tee in black.",
            primary: false,
          },
        ],
        colors: [
          {
            name: "Black",
            bgColor: "bg-gray-900",
            selectedColor: "ring-gray-900",
          },
          {
            name: "Heather Grey",
            bgColor: "bg-gray-400",
            selectedColor: "ring-gray-400",
          },
        ],
        sizes: [
          { name: "XXS", inStock: true },
          { name: "XS", inStock: true },
          { name: "S", inStock: true },
          { name: "M", inStock: true },
          { name: "L", inStock: true },
          { name: "XL", inStock: false },
        ],
        description: `
          <p>The Basic tee is an honest new take on a classic. The tee uses super soft, pre-shrunk cotton for true comfort and a dependable fit. They are hand cut and sewn locally, with a special dye technique that gives each tee it's own look.</p>
          <p>Looking to stock your closet? The Basic tee also comes in a 3-pack or 5-pack at a bundle discount.</p>
        `,
        details: [
          "Only the best materials",
          "Ethically and locally made",
          "Pre-washed and pre-shrunk",
          "Machine wash cold with similar colors",
        ],
      };

      return product;
    }),
  getByFilter: publicProcedure
    .input(
      z.object({
        gender: z.string({ message: "Gender is required" }),
        category: z.string().optional(),
        query: z.string().optional(),
      })
    )
    .query(async ({ input: { gender, category, query } }) => {
      console.log(gender, category, query);
      const PRODUCTS = [
        {
          id: 1,
          name: "Organize Basic Set (Walnut)",
          price: "$149",
          rating: 5,
          reviewCount: 38,
          imageSrc:
            "https://tailwindcss.com/plus-assets/img/ecommerce-images/category-page-05-image-card-01.jpg",
          imageAlt: "TODO",
          href: "/product/1",
        },
        {
          id: 2,
          name: "Organize Pen Holder",
          price: "$15",
          rating: 5,
          reviewCount: 18,
          imageSrc:
            "https://tailwindcss.com/plus-assets/img/ecommerce-images/category-page-05-image-card-02.jpg",
          imageAlt: "TODO",
          href: "#",
        },
        {
          id: 3,
          name: "Organize Sticky Note Holder",
          price: "$15",
          rating: 5,
          reviewCount: 14,
          imageSrc:
            "https://tailwindcss.com/plus-assets/img/ecommerce-images/category-page-05-image-card-03.jpg",
          imageAlt: "TODO",
          href: "#",
        },
        {
          id: 4,
          name: "Organize Phone Holder",
          price: "$15",
          rating: 4,
          reviewCount: 21,
          imageSrc:
            "https://tailwindcss.com/plus-assets/img/ecommerce-images/category-page-05-image-card-04.jpg",
          imageAlt: "TODO",
          href: "#",
        },
        {
          id: 5,
          name: "Organize Basic Set (Walnut)",
          price: "$149",
          rating: 5,
          reviewCount: 38,
          imageSrc:
            "https://tailwindcss.com/plus-assets/img/ecommerce-images/category-page-05-image-card-01.jpg",
          imageAlt: "TODO",
          href: "#",
        },
        {
          id: 6,
          name: "Organize Pen Holder",
          price: "$15",
          rating: 5,
          reviewCount: 18,
          imageSrc:
            "https://tailwindcss.com/plus-assets/img/ecommerce-images/category-page-05-image-card-02.jpg",
          imageAlt: "TODO",
          href: "#",
        },
        {
          id: 7,
          name: "Organize Sticky Note Holder",
          price: "$15",
          rating: 5,
          reviewCount: 14,
          imageSrc:
            "https://tailwindcss.com/plus-assets/img/ecommerce-images/category-page-05-image-card-03.jpg",
          imageAlt: "TODO",
          href: "#",
        },
        {
          id: 8,
          name: "Organize Phone Holder",
          price: "$15",
          rating: 4,
          reviewCount: 21,
          imageSrc:
            "https://tailwindcss.com/plus-assets/img/ecommerce-images/category-page-05-image-card-04.jpg",
          imageAlt: "TODO",
          href: "#",
        },
        {
          id: 9,
          name: "Organize Phone Holder",
          price: "$15",
          rating: 4,
          reviewCount: 21,
          imageSrc:
            "https://tailwindcss.com/plus-assets/img/ecommerce-images/category-page-05-image-card-04.jpg",
          imageAlt: "TODO",
          href: "#",
        },
      ];

      return PRODUCTS;
    }),
});
