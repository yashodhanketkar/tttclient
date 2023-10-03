import { useAuth } from "@/hooks/auth";
import { LoginPage, RegisterPage } from "@/views/auth";
import { BoardIDPage, BoardPage } from "@/views/board";
import { HomePage } from "@/views/home";
import { StatsIDPage, StatsPage } from "@/views/stats";
import { Outlet, Route, Routes } from "react-router-dom";

export const MainRouter = () => {
  const { user } = useAuth();

  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        {!user.id || user.id === "" ? (
          <>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
          </>
        ) : (
          <>
            <Route path="/stats" element={<StatsPage />} />
            <Route path="/stats/:id" element={<StatsIDPage />} />
            <Route path="/board" element={<BoardPage />} />
            <Route path="/board/:id" element={<BoardIDPage />} />
          </>
        )}
        <Route path="*" element={<>404 | Page not found</>} />
      </Routes>
      <Outlet />
    </>
  );
};
