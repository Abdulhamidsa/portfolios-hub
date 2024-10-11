import Navbar from "./Navbar";
import Loading from "@/components/feedback/Loading";
import { Toaster } from "@/components/ui/toaster";
import ErrorBoundary from "@/lib/ErrorBoundary";
import { Suspense } from "react";

type UserLayoutProps = {
  children: React.ReactNode;
};

const UserLayout: React.FC<UserLayoutProps> = ({ children }) => {
  return (
    <>
      <header>
        <Navbar />
      </header>
      <ErrorBoundary>
        <Suspense fallback={<Loading />}>
          <main>{children}</main>
          <Toaster />
        </Suspense>
      </ErrorBoundary>
      <footer></footer>
    </>
  );
};

export default UserLayout;
