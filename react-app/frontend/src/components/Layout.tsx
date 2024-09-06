import { ReactNode } from "react";
import Navbar from "./Navbar";
interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div>
      <header>
        <Navbar />
      </header>

      <main>{children}</main>
      <footer></footer>
    </div>
  );
};

export default Layout;
