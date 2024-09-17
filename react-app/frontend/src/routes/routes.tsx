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
];

export const navItems = routes.map((route) => ({
  path: route.path,
  label: route.label,
}));
