import mongoose from 'mongoose'
const { Schema, model } = mongoose
const projectSchema = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    projectUrl: {
        type: String,
        required: true,
    },
    projectImage: {
        type: [String],
        required: true,
    },
    projectThumbnail: {
        type: String,
    },
    likes: {
        type: [String],
        default: 0,
    },
    tags: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'tags',
        },
    ],
})
export const Project = model('project', projectSchema)
