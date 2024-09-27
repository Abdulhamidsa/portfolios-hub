import Auth from "@/pages/Auth";
import Contact from "@/pages/Contact";
import Home from "@/pages/Homepage";

// import ProtectedRoute from "@/routes/ProtectedRoutes";

// Ensure the correct import path

interface RouteConfig {
  path: string;
  element: JSX.Element;
  label: string;
  protected?: boolean;
}

export const routes: RouteConfig[] = [
  { path: "/", element: <Home />, label: "Home" },
  { path: "/contact", element: <Contact />, label: "Contact", protected: true },
  { path: "/auth", element: <Auth />, label: "Auth" },
];

export const navItems = routes.map((route) => ({
  path: route.path,
  label: route.label,
}));

// export const renderRoutes = routes.map((route) => ({
//   path: route.path,
//   element: route.protected ? <ProtectedRoute element={route.element} /> : route.element,
// }));
