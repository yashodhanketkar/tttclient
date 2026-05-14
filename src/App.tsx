import { Toaster } from "./components/ui/sonner";
import { AuthWrapper } from "./context/auth";
import { KeyProvider } from "./providers/hotkeys.tsx";
import { MainRouter } from "./routes";
import { Layout } from "./routes/layout";

const App = () => {
  return (
    <AuthWrapper>
      <Layout>
        <KeyProvider>
          <MainRouter />
        </KeyProvider>
      </Layout>
      <Toaster position="bottom-center" />
    </AuthWrapper>
  );
};

export default App;
