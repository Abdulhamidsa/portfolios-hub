import "@/App.css";
import Layout from "@/components/Layout";
import Loading from "@/components/feedback/Loading";
import { AuthProvider } from "@/context/AuthContext";
import AppRoutes from "@/routes/AppRoutes";
import { Suspense } from "react";

export default function App() {
  return (
    <AuthProvider>
      <Suspense fallback={<Loading />}>
        <Layout>
          <AppRoutes />
        </Layout>
      </Suspense>
    </AuthProvider>
  );
}
