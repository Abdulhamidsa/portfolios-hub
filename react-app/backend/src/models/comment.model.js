import mongoose from 'mongoose'
const { Schema, model } = mongoose

const CommentSchema = new Schema(
    {
        ProjectId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'projects',
            required: true,
        },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'users',
            required: true,
        },
        content: {
            type: String,
            required: true,
        },

        createdAt: {
            type: Date,
            default: Date.now,
        },
        updatedAt: {
            type: Date,
            default: Date.now,
        },
    },
    {
        timestamps: true,
    }
)

const Comment = mongoose.model('Comment', CommentSchema)
export { Comment }
