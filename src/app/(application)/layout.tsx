import Header from "@common/Header";

const AppLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <>
      {/* Header */}
      <Header />
      {children}
    </>
  );
};

export default AppLayout;
