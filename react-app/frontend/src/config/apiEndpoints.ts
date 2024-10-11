export const baseUrl = import.meta.env.VITE_API_BASE_URL;
const endPoints = {
  frontpage: {
    projects: baseUrl + "/projects/all",
  },
  auth: {
    signin: baseUrl + "/auth/signin",
    register: baseUrl + "/auth/register",
    logout: baseUrl + "/auth/signout",
    checkAuth: baseUrl + "/auth/check-auth",
    refreshToken: baseUrl + "/auth/refresh-access-token",
  },
  user: {
    profile: baseUrl + "/user/profile",
    updateProfile: baseUrl + "/user/update-profile",
    changePassword: baseUrl + "/user/change-password",
    UserProjects: baseUrl + "/projects/all",
  },
  project: {
    create: baseUrl + "/project/create",
    update: baseUrl + "/project/update",
    delete: baseUrl + "/project/delete",
    getById: baseUrl + "/project/get",
  },
};
export default endPoints;
// as const to tell typescript that this object is readonly and should not be modified
