const baseUrl = "http://localhost:4000";
const endPoints = {
  frontpage: {
    projects: baseUrl + "/api/projects",
    users: baseUrl + "/user",
  },
  auth: {
    login: baseUrl + "/auth/login",
    register: baseUrl + "/auth/register",
    password: baseUrl + "/password",
    changePassword: baseUrl + "/changePassword",
  },
} as const;
export { endPoints, baseUrl };
