export const baseUrl = import.meta.env.VITE_API_BASE_URL;
export const endPoints = {
  frontpage: {
    projects: `${baseUrl}/projects/all`,
  },

  user: {
    auth: {
      signin: `${baseUrl}/auth/signin`,
      register: `${baseUrl}/auth/register`,
      logout: `${baseUrl}/auth/signout`,
      checkAuth: `${baseUrl}/auth/check-auth`,
      refreshToken: `${baseUrl}/auth/refresh-tokens`,
    },
    public: {
      projects: `${baseUrl}/user/projects/all`,
    },
    private: {
      profile: `${baseUrl}/user/profile`,
      updateProfile: `${baseUrl}/user/update-profile`,
      changePassword: `${baseUrl}/user/change-password`,
      UserProjects: `${baseUrl}/user/:friendlyId/projects/all`,
    },
  },
  project: {
    public: {
      get: `${baseUrl}/projects/all`,
    },
    private: {
      create: `${baseUrl}/project/create`,
      update: `${baseUrl}/project/update`,
      delete: `${baseUrl}/project/delete`,
      getById: `${baseUrl}/000000/projects/all`,
    },
  },
} as const;
// as const to tell typescript that this object is readonly and should not be modified
