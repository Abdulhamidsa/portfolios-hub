import { Mongoose } from "mongoose";
// this should be bunch of tag that are related to the predefined professions ,  will have some 50 something, then users can also add thier owns
predefinedTags = ["HTML", "CSS", "JavaScript", "React", "Node.js", "MongoDB"];
const tagsSchema = new Mongoose.Schema({
  _id: Mongoose.Schema.Types.ObjectId,
  name: {
    type: String,
    required: true,
    enum: predefinedTags,
  },
});
export const Tag = Mongoose.model("Tag", tagsSchema);
