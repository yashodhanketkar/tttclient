import { AuthWrapper } from "./context/auth";
import { MainRouter } from "./routes";
import { Layout } from "./routes/layout";

const App = () => {
  return (
    <AuthWrapper>
      <Layout>
        <MainRouter />
      </Layout>
    </AuthWrapper>
  );
};

export default App;
