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
        projectImage: [
            {
                id: {
                    type: mongoose.Schema.Types.ObjectId,
                    required: true,
                },
                url: {
                    type: String,
                    required: true,
                },
            },
        ],
        projectThumbnail: {
            type: String,
        },
        tags: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Tag',
            },
        ],
    },
    { timestamps: true }
)

export const Project = model('project', projectSchema)
