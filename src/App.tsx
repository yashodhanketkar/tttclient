import { CssBaseline, ThemeProvider } from "@mui/material";
import { theme } from "./config/theme";
import { AuthWrapper } from "./context/auth";
import { MainRouter } from "./routes";
import { Layout } from "./views/layout";

const App = () => {
  return (
    <AuthWrapper>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Layout>
          <MainRouter />
        </Layout>
      </ThemeProvider>
    </AuthWrapper>
  );
};

export default App;
