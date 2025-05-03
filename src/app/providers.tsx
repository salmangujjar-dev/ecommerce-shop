import { TRPCReactProvider } from "~trpc/client";

const Providers = ({ children }: { children: React.ReactNode }) => {
  return <TRPCReactProvider>{children}</TRPCReactProvider>;
};

export default Providers;
