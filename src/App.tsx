import { Toaster } from "./components/ui/sonner";
import { KeyProvider } from "./providers/hotkeys.tsx";
import { QueryProvider } from "./providers/query.tsx";
import { MainRouter } from "./routes";
import { Layout } from "./routes/layout";

const App = () => {
  return (
    <QueryProvider>
      <Layout>
        <KeyProvider>
          <MainRouter />
        </KeyProvider>
      </Layout>
      <Toaster position="bottom-center" />
    </QueryProvider>
  );
};

export default App;
