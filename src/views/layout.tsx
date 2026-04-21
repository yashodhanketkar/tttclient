import { Footer, Header } from "@/components/interface";

type LayoutProps = {
  children: React.ReactNode;
};

export const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen w-screen flex flex-col justify-between">
      <Header />
      <div className="mt-4 mb-auto mx-auto container">{children}</div>
      <Footer />
    </div>
  );
};
