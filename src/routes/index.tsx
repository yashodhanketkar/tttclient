import { Outlet, Route, Routes } from "react-router-dom";

import { HelperDialog } from "@/components/helper/index";
import { Login } from "@/pages/auth/login";
import { Register } from "@/pages/auth/register";
import { Boards } from "@/pages/board/list";
import { Board } from "@/pages/board/unit";
import { Home } from "@/pages/home";
import { Stats } from "@/pages/stats/list";
import { Stat } from "@/pages/stats/unit";
import { useAuth } from "@/store/query/auth";

export const MainRouter = () => {
  const { useMeQuery } = useAuth();
  const { data: user } = useMeQuery;

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        {!user ? (
          <>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </>
        ) : (
          <>
            <Route path="/stats" element={<Stats />} />
            <Route path="/stats/:id" element={<Stat />} />
            <Route path="/board" element={<Boards />} />
            <Route path="/board/:id" element={<Board />} />
          </>
        )}
        <Route path="*" element={<>404 | Page not found</>} />
      </Routes>
      <HelperDialog />
      <Outlet />
    </>
  );
};
