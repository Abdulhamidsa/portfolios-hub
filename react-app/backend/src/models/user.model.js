import mongoose from 'mongoose'
import { preDefinedProfessions, preDefinedLinks } from '../../config/user.data.config.js'
const { Schema, model } = mongoose
const userPeronalInfoSchema = new Schema({
    _id: 0,
    username: {
        type: String,
        unique: true,
    },
    profilePicture: {
        type: String,
    },
    bio: {
        type: String,
    },
    profession: {
        type: String,
        enum: preDefinedProfessions,
    },
    country: {
        type: String,
    },
    links: [
        {
            name: {
                type: String,
                trim: true,
                enum: preDefinedLinks,
            },
            url: {
                type: String,
                trim: true,
            },
        },
    ],
})
const UserSchema = new Schema(
    {
        _id: { type: Schema.Types.ObjectId },
        friendlyId: {
            type: String,
            unique: true,
        },
        personalInfo: userPeronalInfoSchema,
        userRole: {
            type: String,
            default: 'user',
        },
        // if user is blocked or not
        approved: {
            type: Boolean,
            default: true,
        },
        // active status for online status
        active: {
            type: Boolean,
            default: true,
        },
        profilePicture: {
            type: String,
        },

        deletedAt: {
            type: Date,
        },
    },
    { timestamps: true }
)
export const User = model('user', UserSchema)
