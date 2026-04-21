import { Header } from "@/components/interface/header";
import { Footer } from "@/components/interface/footer";

export const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen w-screen flex flex-col justify-between">
      <Header />
      <div className="mt-4 mb-auto mx-auto container">{children}</div>
      <Footer />
    </div>
  );
};
