import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_ACCESSTOKEN

export const generateNewToken = (user) => {
    const payload = { id: user._id }
    return jwt.sign(payload, JWT_SECRET, {
        expiresIn: process.env.JWT_ACCESS_EXPIRATION || '1d', // 1 day for testing
    })
}

export const verifyToken = async (token) => {
    if (!token) {
        throw { message: 'Token is required', status: 401 }
    }

    try {
        return await jwt.verify(token, JWT_SECRET)
    } catch (err) {
        const errorMessages = {
            JsonWebTokenError: 'Invalid token',
            TokenExpiredError: 'Token has expired',
        }

        const message = errorMessages[err.name] || 'Token verification failed'
        throw { message, status: 401 }
    }
}

export const generateRefreshToken = (user) => {
    const payload = { id: user._id }
    return jwt.sign(payload, JWT_SECRET, {
        expiresIn: process.env.JWT_REFRESH_EXPIRATION || '1d',
    })
}
