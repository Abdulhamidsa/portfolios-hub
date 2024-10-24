import { Toaster } from "./ui/toaster";
import Navbar from "@/components/layout/Navbar";
import { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="">
      <header>{<Navbar />}</header>
      <main>{children}</main>
      <Toaster />

      <footer></footer>
    </div>
  );
};

export default Layout;
