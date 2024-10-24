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
      projects: `${baseUrl}/user/all`,
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
      all: `${baseUrl}/projects/all`,
    },
    private: {
      create: `${baseUrl}/0000000/projects/upload`,
      update: `${baseUrl}/project/update`,
      delete: `${baseUrl}/00000000/projects`,
      getById: `${baseUrl}/000000/projects/all`,
      toggleLike: `${baseUrl}/0000000/projects/like`,
    },
  },
} as const;
