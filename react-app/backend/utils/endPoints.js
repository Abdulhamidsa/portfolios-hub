const path = {
    auth: '/auth',
    user: '/user',
    project: '/projects',
}

export const endPoints = {
    user: {
        auth: {
            signin: `${path.auth}/signin`,
            register: `${path.auth}/register`,
            signout: `${path.auth}/signout`,
            checkAuth: `${path.auth}/check-auth`,
            refreshTokens: `${path.auth}/refresh-tokens`,
        },
    },
    project: {
        all: `${path.project}/all`,
        upload: `/:friendlyId${path.project}/upload`,
        like: (projectId) => `${path.project}/like/${projectId}`,
        edit: (friendlyId, projectId) => `${path.project}/${friendlyId}/${projectId}`,
        delete: (projectId) => `${path.project}/${projectId}`,
    },
}
