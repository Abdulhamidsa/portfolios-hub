import { generateFriendlyId } from '../../../utils/herlper.js'
import mongoose from 'mongoose'
export const createMongooseId = () => {
    return new mongoose.Types.ObjectId()
}
export const userTest = {
    username: 'someusername',
    friendlyId: generateFriendlyId('username'),
    profilePicture: 'https://thispersondoesnotexist.com/',
    bio: 'somebio',
    profession: 'Web Developer',
    country: 'Syria',
    links: [{ name: 'CV', url: 'https://thispersondoesnotexist.com/' }],
    email: 'a@ssa.com',
    password: '123456',
    firstName: 'somefirstname',
    lastName: 'somelastname',
    userRole: 'user',
    dateOfBirth: new Date(),
}

export const getProjectTest = () => {
    return projectTest
}

const projectTest = {
    _id: createMongooseId(),
    userId: createMongooseId(),
    title: 'This is a title',
    description: 'This is a description',
    projectUrl: 'https://google.com',
    projectImage: [
        { url: 'https://picsum.photos/200' },
        { url: 'https://picsum.photos/200' },
        { url: 'https://picsum.photos/200' },
    ],
    projectThumbnail: 'https://picsum.photos/200',
    tags: [createMongooseId(), createMongooseId()],
}
