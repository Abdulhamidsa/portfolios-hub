// import { useAuth } from "@/context/authContext";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  //   const { isAuthenticated } = useAuth();
  const isAuthenticated = false;

  return isAuthenticated ? <Outlet /> : <Navigate to="/guest" />;
};

export default ProtectedRoute;
