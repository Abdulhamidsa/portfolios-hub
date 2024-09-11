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
    'graphic design',
    'web designer',
    'product designer',
    'motion graphics',
    'visual designer',
    'creative director',
    'digital marketing',
]

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

        deletedAt: {
            type: Date,
        },
    },
    { timestamps: true }
)

const User = model('user', UserSchema)
export { User }
