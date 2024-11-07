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
        all: `/:friendlyId${path.project}`,
        upload: `/:friendlyId${path.project}`,
        edit: `/:friendlyId${path.project}`,
        delete: `/:friendlyId${path.project}`,
    },
}
