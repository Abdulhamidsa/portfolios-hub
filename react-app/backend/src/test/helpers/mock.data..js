import { generateFriendlyId } from '../../../utils/herlper.js'
import mongoose from 'mongoose'
const createMongooseId = () => {
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
export const projectTest = {
    userId: createMongooseId(),
    title: 'Titeeele',
    description: 'some descasdfkajsldkajsldjk',
    projectUrl: 'https://google.com',
    projectImage: [
        { id: createMongooseId(), url: 'https://picsum.photos/200' },
        { id: createMongooseId(), url: 'https://picsum.photos/200' },
        { id: createMongooseId(), url: 'https://picsum.photos/200' },
    ],
    projectThumbnail: 'https://picsum.photos/200',
    tags: [createMongooseId(), createMongooseId()],
}
