import mongoose from 'mongoose'
const { Schema, model } = mongoose

const projectSchema = new Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user',
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
        tags: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'tags',
            },
        ],
    },
    { timestamps: true }
)

export const Project = model('project', projectSchema)
