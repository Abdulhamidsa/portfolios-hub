import mongoose from 'mongoose'
const { Schema, model } = mongoose

import { userConfig } from '../../config/user.data.config.js'

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
        enum: userConfig.predefinedProfessions,
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
                enum: userConfig.predefinedLinks,
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
        // active status for online status
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

export const User = model('user', UserSchema)
