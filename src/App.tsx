import { Toaster } from "./components/ui/sonner";
import { AuthWrapper } from "./context/auth";
import { MainRouter } from "./routes";
import { Layout } from "./routes/layout";

const App = () => {
  return (
    <AuthWrapper>
      <Layout>
        <MainRouter />
      </Layout>
      <Toaster position="bottom-center" />
    </AuthWrapper>
  );
};

export default App;
