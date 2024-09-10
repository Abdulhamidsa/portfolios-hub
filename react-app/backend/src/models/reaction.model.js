import mongoose from 'mongoose'
const { Schema, model } = mongoose

const ReactionSchema = new Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'users',
            required: true,
        },
        reaction: {
            type: Boolean,
            default: null,
            required: true,
        },
        targetId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
        },
        targetType: {
            type: String,
            enum: ['Porject', 'Comment'],
            required: true,
        },
    },
    {
        timestamps: true,
    }
)
const Reaction = model('Reaction', ReactionSchema)
export { Reaction }
