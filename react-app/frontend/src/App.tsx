import "@/App.css";
import Layout from "@/components/Layout";
import Loading from "@/components/feedback/Loading";
import { AuthProvider } from "@/context/AuthContext";
import ErrorBoundary from "@/lib/ErrorBoundary";
import AppRoutes from "@/routes/AppRoutes";
import { Suspense } from "react";

export default function App() {
  return (
    <AuthProvider>
      <ErrorBoundary>
        <Suspense fallback={<Loading />}>
          <Layout>
            <AppRoutes />
          </Layout>
        </Suspense>
      </ErrorBoundary>
    </AuthProvider>
  );
}
