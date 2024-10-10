import { Navbar } from "./layout/Navbar";

interface LayoutProps {
  children: React.ReactNode;
}
const GuestLayout: React.FC<LayoutProps> = ({ children }) => {
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
export default GuestLayout;
