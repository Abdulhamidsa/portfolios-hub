import mongoose from 'mongoose'
const { Schema, model } = mongoose

// this should be bunch of tag that are related to the predefined professions ,  will have some 50 something, then users can also add thier owns
// predefinedTags = ['HTML', 'CSS', 'JavaScript', 'React', 'Node.js', 'MongoDB']
const tagsSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
})
export const Tag = model('Tags', tagsSchema)
