const CategoryLayout = async ({
  params,
  children,
}: Readonly<{
  params: Promise<{ category: string }>;
  children: React.ReactNode;
}>) => {
  const { category } = await params;

  return (
    <main className="mx-auto max-w-7xl overflow-hidden sm:px-6 lg:px-8 pb-2 sm:pb-6 lg:pb-10">
      <h1 className="text-5xl font-bold my-10 tracking-widest text-primary-800 text-center uppercase">
        {category}
      </h1>
      {children}
    </main>
  );
};

export default CategoryLayout;
