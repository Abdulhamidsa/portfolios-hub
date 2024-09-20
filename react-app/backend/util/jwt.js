import jwt from 'jsonwebtoken'
export const generateNewToken = (user) => {
    return jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: '5m',
    })
}
export const verifyToken = (token) =>
    new Promise((resolve, reject) => {
        jwt.verify(token, process.env.JWT_SECRET, (err, payload) => {
            if (err) {
                console.error('Token verification error:', err.message)
                return reject(err)
            }
            resolve(payload)
        })
    })
export const generateRefreshToken = (user) => {
    return jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: '7d',
    })
}
export const refreshAccessToken = async (req, res) => {
    const refreshToken = req.cookies.refreshToken
    if (!refreshToken) {
        return getErrorResponse('Refresh token not found', 404)(res)
    }
    try {
        const payload = await verifyToken(refreshToken)
        const newAccessToken = generateNewToken({ _id: payload.id })
        res.cookie('accessToken', newAccessToken, { httpOnly: true, secure: true, path: '/' })
        return getSuccessResponse({ accesstoken: newAccessToken }, 200)(res)
    } catch (error) {
        console.error('Error refreshing access token:', error)
        return getErrorResponse('Invalid or expired refresh token', 403)(res)
    }
}
