import { Footer, Header } from "@/components/interface";
import { SxProps } from "@mui/material";
import Container from "@mui/material/Container";

type LayoutProps = {
  children: React.ReactNode;
};

export const Layout = ({ children }: LayoutProps) => {
  return (
    <Container maxWidth={false} sx={LayoutStyle} disableGutters>
      <Header />
      <div className="py-4 mb-auto">{children}</div>
      <Footer />
    </Container>
  );
};

const LayoutStyle: SxProps = {
  minHeight: "100vh",
  display: " flex",
  flexDirection: "column",
  justifyContent: "space-between",
};
