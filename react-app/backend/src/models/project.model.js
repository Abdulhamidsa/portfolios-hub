import mongoose from 'mongoose'
const { Schema, model } = mongoose

const projectSchema = new Schema(
    {
        _id: mongoose.Schema.Types.ObjectId,
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
                _id: mongoose.Schema.Types.ObjectId,
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
