const path = {
    auth: '/auth',
    user: '/user',
    project: '/project',
}

export const endPoints = {
    user: {
        auth: {
            signin: `/${path.auth}/signin`,
            register: `/${path.auth}/register`,
            signout: `/${path.auth}/signout`,
            checkAuth: `/${path.auth}/check-auth`,
            refreshTokens: `/${path.auth}/refresh-tokens`,
        },
    },
}
