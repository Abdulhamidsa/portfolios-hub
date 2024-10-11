import { guestRoutes, authRoutes } from "./routes";
import { useAuth } from "@/context/authContext";
import GuestLayout from "@/pages/guestApp/components/GuestLayout";
import UserLayout from "@/pages/userApp/components/UserLayout";
import { Routes, Route, Navigate } from "react-router-dom";

function AppRoutes() {
  const { isAuthenticated } = useAuth();

  return (
    <>
      {isAuthenticated ? (
        <UserLayout>
          <Routes>
            {authRoutes.map(({ path, element }) => (
              <Route key={path} path={path} element={element} />
            ))}
            <Route path="*" element={<Navigate to="/auth" />} />
          </Routes>
        </UserLayout>
      ) : (
        <GuestLayout>
          <Routes>
            {guestRoutes.map(({ path, element }) => (
              <Route key={path} path={path} element={element} />
            ))}
            <Route path="*" element={<Navigate to="/guest" />} />
          </Routes>
        </GuestLayout>
      )}
    </>
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
