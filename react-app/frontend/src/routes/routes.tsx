import Auth from "@/pages/auth";
import Contact from "@/pages/contact";
import Home from "@/pages/home";

interface RouteConfig {
  path: string;
  element: JSX.Element;
  label: string;
}

export const routes: RouteConfig[] = [
  { path: "/", element: <Home />, label: "Home" },
  { path: "/contact", element: <Contact />, label: "Contact" },
  { path: "/auth", element: <Auth />, label: "Auth" },
];

export const navItems = routes.map((route) => ({
  path: route.path,
  label: route.label,
}));
