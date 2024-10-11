import GuestApp from "@/pages/guestApp";
import UserApp from "@/pages/userApp";
import Profile from "@/pages/userApp/Profile";
import Projects from "@/pages/userApp/Projects";

interface RouteConfig {
  path: string;
  element: JSX.Element;
  label: string;
}

export const authRoutes: RouteConfig[] = [
  { path: "/Profile", element: <Profile />, label: "Profile" },
  { path: "/Projects", element: <Projects />, label: "Projects" },
  { path: "/auth", element: <UserApp />, label: "" },
];

export const guestRoutes: RouteConfig[] = [{ path: "/guest", element: <GuestApp />, label: "Guest" }];
