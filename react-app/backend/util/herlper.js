import { customAlphabet } from 'nanoid'
import bcrypt from 'bcryptjs'
export const generateFriendlyId = (firstName) => {
    const shortId = customAlphabet('1234567890abcdefg', 10)()
    return `${firstName.toLowerCase().replace(/\s/g, '-')}-${shortId}`
}
export const hashPassword = async (password) => {
    return await bcrypt.hash(password, 10)
}
