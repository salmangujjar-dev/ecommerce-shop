import { ReactNode } from "react";

interface CategoryLayoutProps {
  params: Promise<{ "gender-category": string }>;
  children: ReactNode;
}

const CategoryLayout = async ({
  params,
  children,
}: Readonly<CategoryLayoutProps>) => {
  const { "gender-category": genderWithCategory } = await params;

  const [gender, category] = genderWithCategory?.split("-") || "";

  return (
    <main className="mx-auto max-w-7xl overflow-hidden sm:px-6 lg:px-8 pb-2 sm:pb-6 lg:pb-10">
      <div className="flex flex-col items-center my-10 gap-y-2 justify-center">
        <h1 className="text-5xl font-bold tracking-widest text-primary-900 uppercase">
          {gender}
        </h1>
        <h2 className="font-semibold text-3xl uppercase tracking-wide text-primary-700">
          {category ? category : ""}
        </h2>
      </div>
      {children}
    </main>
  );
};

export default CategoryLayout;
