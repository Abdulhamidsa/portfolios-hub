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
    },
    {
        timestamps: true,
    }
)

const Comment = mongoose.model('Comment', CommentSchema)
export { Comment }
