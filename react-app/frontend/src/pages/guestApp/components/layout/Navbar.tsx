import { Link } from "react-router-dom";

export const Navbar = () => {
  return (
    <div className="container flex h-14 items-center justify-between w-screen z-10 bg-white">
      <Link to="/guest" className="font-bold text-xl">
        Guest App
      </Link>
    </div>
  );
};
