// import Contact from "@/pages/Contact";
// import Home from "@/pages/Home";
// import Projects from "@/pages/Projects";
// import Public from "@/pages/Public";

// type RouteConfig = {
//   path: string;
//   element: JSX.Element;
//   label: string;
//   protected?: boolean;
// };

// export const routes: RouteConfig[] = [
//   { path: "/", element: <Home />, label: "home", protected: false },
//   { path: "/projects", element: <Projects />, label: "projects", protected: false },
//   { path: "/contact", element: <Contact />, label: "contact", protected: true },
//   { path: "/public", element: <Public />, label: "public", protected: false },
// ];

// export const navItems = routes.map((route) => ({
//   path: route.path,
//   label: route.label,
// }));

import { guestRoutes, authRoutes } from "./routes";
import { useAuth } from "@/context/authContext";
// import GuestLayout from "@/pages/guestApp/components/GuestLayout";
import UserLayout from "@/pages/userApp/components/UserLayout";
import { Routes, Route, Navigate } from "react-router-dom";

function AppRoutes() {
  const { isAuthenticated } = useAuth();
  console.log(isAuthenticated);
  return (
    <UserLayout>
      {isAuthenticated ? (
        <Routes>
          {authRoutes.map(({ path, element }) => (
            <Route key={path} path={path} element={element} />
          ))}
          <Route path="*" element={<Navigate to="/auth" />} />
        </Routes>
      ) : (
        <Routes>
          {guestRoutes.map(({ path, element }) => (
            <Route key={path} path={path} element={element} />
          ))}
          <Route path="*" element={<Navigate to="/guest" />} />
        </Routes>
      )}
    </UserLayout>
  );
}

export default AppRoutes;

//   if (isAuthenticated) {
//     return (
//       <UserLayout>
//         <Routes>
//           <Route path="/auth" element={<UserApp />} />
//           <Route path="/Profile" element={<Profile />} />
//           <Route path="*" element={<Navigate to="/auth" />} />
//         </Routes>
//       </UserLayout>
//     );
//   }

//   return (
//     <GuestLayout>
//       <Routes>
//         <Route path="/guest" element={<GuestApp />} />
//         <Route path="*" element={<Navigate to="/guest" />} />
//       </Routes>
//     </GuestLayout>
//   );
// }
