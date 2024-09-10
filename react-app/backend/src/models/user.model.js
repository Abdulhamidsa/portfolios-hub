import mongoose from 'mongoose'
const { Schema, SchemaTypes, model } = mongoose
// predefinedData
const predefinedLinks = ['cv', 'social media', 'pdf cv']
const predefinedProfessions = [
    'web development',
    'frontend development',
    'backend development',
    'full stack development',
    'UI/UX designer',
    'graphic designer',
    'web designer',
    'product designer',
    'motion graphics',
    'visual designer',
    'creative director',
    'digital marketer',
]
const userCredentialSchema = new Schema({
    _id: 0,
    firstName: {
        type: String,
        required: true,
        trim: true,
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
    },
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: String,
    mobile: {
        type: String,
        unique: true,
    },
    dateOfBirth: {
        type: Date,
        required: true,
    },
    password: {
        type: String,
        trim: true, // removes whitespaces from beginning and end
    },
})
const userPeronalInfoSchema = new Schema({
    _id: 0,
    profilePicture: {
        type: String,
        default: `https://avatars.dicebear.com/api/bottts/tazim.svg`,
    },
    bio: {
        type: String,
    },
    profession: {
        type: String,
        required: true,
        enum: predefinedProfessions,
    },
    country: {
        type: String,
        required: true,
    },
    links: [
        {
            name: {
                type: String,
                required: true,
                trim: true,
                enum: predefinedLinks,
            },
            url: {
                type: String,
                required: true,
                trim: true,
            },
        },
    ],
})
const UserSchema = new Schema(
    {
        _id: SchemaTypes.ObjectId,
        friendlyId: {
            type: String,
            unique: true,
        },
        credentials: userCredentialSchema,
        personalInfo: userPeronalInfoSchema,
        userType: {
            type: String,
            default: 'user',
        },
        // if user is blocked or not
        approved: {
            type: Boolean,
            default: true,
        },
        // active status for last seen and online status
        active: {
            type: Boolean,
            default: true,
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
        updatedAt: {
            type: Date,
            default: Date.now,
        },
        deletedAt: {
            type: Date,
        },
    },
    { timestamps: true }
)

const User = model('users', UserSchema)
export { User }
