import jwt from 'jsonwebtoken'
export const generateAccessToken = (user) => {
    const payload = {
        id: user.id,
        friendlyId: user.friendlyId,
        userRole: user.userRole,
    }
    // console.log('Paylodasdad:', payload)
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: process.env.ACCESSTOKEN_EXPIRATION || '10m',
    })
    return token
}
export const generateRefreshToken = (user) => {
    const payload = { id: user.id }
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: process.env.REFRESHTOKEN_EXPIRATION || '1d',
    })
    // console.log('Refresh token:', payload)
    return token
}
export const verifyToken = async (token, tokenType) => {
    if (!token) {
        throw { message: 'Token is required', status: 401 }
    }
    try {
        return await jwt.verify(token, process.env.JWT_SECRET)
    } catch (error) {
        const errorMessages = {
            JsonWebTokenError: tokenType === 'access' ? 'Access token is invalid' : 'Refresh token is invalid',
            TokenExpiredError: tokenType === 'access' ? 'Access token has expired' : 'Refresh token has expired',
        }
        const message = errorMessages[error.name] || 'Token verification failed'
        const status = error.name === 'TokenExpiredError' ? 401 : 403
        throw { message, status }
    }
}
