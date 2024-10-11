/**
 * Created by @author @ddennis - ddennis.dk aka fantastisk.dk/works aka meresukker.dk on 03/09/2024.
 */

import { ZodError } from 'zod'
import AppError from '../util/error.handler.js'

/**
 *
 * The main validation function - which integrateds with ZOD
 *
 * @param schema a zod schema
 * @param property : 'body' | 'params' | 'query' | 'user' | 'locals'
 *
 * @usage z.object({  id: z.string({required_error: 'id is required'}) })
 *
 *
 */

export const validZod = (schema, property) => {
    return async (req, res, next) => {
        try {
            await schema.parseAsync(req[property])
            return next()
        } catch (error) {
            if (error instanceof ZodError) {
                const message = error.errors.map((err) => err.message).join(', ')
                return next(new AppError(message, 400))
            }
            return next(error)
        }
    }
}
