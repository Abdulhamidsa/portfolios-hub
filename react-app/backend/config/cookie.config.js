export const setCookie = (res, name, value, maxAge) => {
    res.cookie(name, value, {
        httpOnly: false,
        secure: false,
        maxAge: maxAge,
        path: '/',
        sameSite: 'Strict',
    })
}
