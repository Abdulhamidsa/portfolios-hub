import GuestApp from "@/pages/guestApp";
import UserApp from "@/pages/userApp";
import Profile from "@/pages/userApp/Profile";

interface RouteConfig {
  path: string;
  element: JSX.Element;
  label: string;
}

export const authRoutes: RouteConfig[] = [
  { path: "/auth", element: <UserApp />, label: "User Dashboard" }, // Authenticated route
  { path: "/profile", element: <Profile />, label: "Profile" }, // Authenticated route
];

// Define the route configuration for guest users
export const guestRoutes: RouteConfig[] = [
  { path: "/guest", element: <GuestApp />, label: "Guest Home" }, // Guest route
];

// Optionally map the nav items
export const navItems = [...authRoutes, ...guestRoutes].map((route) => ({
  path: route.path,
  label: route.label,
}));
