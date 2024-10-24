import { customAlphabet } from 'nanoid'
export const generateFriendlyId = (firstName) => {
    const shortId = customAlphabet('1234567890abcdefg', 10)()
    return `${firstName.toLowerCase().replace(/\s/g, '-')}-${shortId}`
}
