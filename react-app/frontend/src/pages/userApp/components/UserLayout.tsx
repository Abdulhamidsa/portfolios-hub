import Navbar from "./Navbar";

type UserLayoutProps = {
  children: React.ReactNode;
};

const UserLayout: React.FC<UserLayoutProps> = ({ children }) => {
  return (
    <div>
      <header>
        <Navbar />
      </header>
      <main>{children}</main>
      <footer>
        <p>User Footer</p>
      </footer>
    </div>
  );
};

export default UserLayout;
