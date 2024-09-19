import jwt from 'jsonwebtoken'

export const generateNewToken = (user) => {
    return jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: '1h',
    })
}
export const verifyToken = (token) =>
    new Promise((resolve, reject) => {
        jwt.verify(token, process.env.JWT_SECRET, (err, payload) => {
            if (err) return reject(err)
            resolve(payload)
        })
    })
