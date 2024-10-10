import "@/App.css";
import Loading from "@/components/loaders/Loading";
import { AuthProvider } from "@/context/authContext";
import AppRoutes from "@/routes/AppRoutes";
import { Suspense } from "react";

export default function App() {
  return (
    <AuthProvider>
      <Suspense fallback={<Loading />}>
        <AppRoutes />
      </Suspense>
    </AuthProvider>
  );
}
