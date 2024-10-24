import { guestRoutes, authRoutes } from "./routes";
import { useAuth } from "@/context/AuthContext";
import { Routes, Route, Navigate } from "react-router-dom";

function AppRoutes() {
  const { isAuthenticated } = useAuth();
  return (
    <>
      {isAuthenticated ? (
        <Routes>
          {authRoutes.map(({ path, element }) => (
            <Route key={path} path={path} element={element} />
          ))}
          <Route path="*" element={<Navigate to="/PortfoliosHub" />} />
        </Routes>
      ) : (
        <Routes>
          {guestRoutes.map(({ path, element }) => (
            <Route key={path} path={path} element={element} />
          ))}
          <Route path="*" element={<Navigate to="/guest" />} />
        </Routes>
      )}
    </>
  );
}
export default AppRoutes;
