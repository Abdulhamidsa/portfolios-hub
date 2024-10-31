import GuestApp from "@/pages/guestApp";
import UserApp from "@/pages/userApp";
import Profile from "@/pages/userApp/Profile";
import Projects from "@/pages/userApp/Projects";
import Settings from "@/pages/userApp/Settings";

interface RouteConfig {
  path: string;
  element: JSX.Element;
  label?: string;
  url?: string;
}
const friendlyId = ":friendlyId";
export const authRoutes: RouteConfig[] = [
  { path: "/PortfolioHub", element: <UserApp />, label: "Home" },
  { path: `/Profile/${friendlyId}`, element: <Profile />, label: "Profile" },
  { path: "/Projects", element: <Projects />, label: "Projects" },
  { path: "/Settings", element: <Settings /> },
];
export const guestRoutes: RouteConfig[] = [{ path: "/guest", element: <GuestApp />, label: "Home" }];
