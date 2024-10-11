import "@/App.css";
import Loading from "@/components/feedback/Loading";
import { AuthProvider } from "@/context/authContext";
import AppRoutes from "@/routes/AppRoutes";
import { Suspense } from "react";

export default function App() {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  );
}

// import "@/App.css";
// import { useAuth } from "./api/AuthContext";
// import ProtectedApp from "./apps/ProtectedApp";
// import PublicApp from "./apps/PublicApp";
// import Loading from "@/components/feedback/Loading";
// import Layout from "@/components/layout/Layout";

// function App() {
//   const { isLoggedIn, isLoading } = useAuth();
//   if (isLoading) return <Loading />;

//   return isLoggedIn ? (
//     <Layout>
//       <ProtectedApp />
//     </Layout>
//   ) : (
//     <Layout>
//       <PublicApp />
//     </Layout>
//   );
// }

// export default App;
