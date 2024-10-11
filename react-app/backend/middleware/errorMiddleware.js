import { getErrorResponse } from '../util/api.response.js'
export default function expressErrorMiddleware(error, req, res, next) {
    // console.error('errror', error.stack)
    const statusCode = error.statusCode || 500
    const message = error.message || 'server error'
    res.status(statusCode).json(getErrorResponse(message))
}
