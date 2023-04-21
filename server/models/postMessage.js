import mongoose from "mongoose";

const postSchema = mongoose.Schema({
  title: { type: String, required: true },
  message: { type: String, required: true },
  name: { type: String, required: true },
  creator: { type: String, required: true },
  tags: { type: String, required: true },
  selectedFile: String,
  likes: {
    type: [String],
    default: [],
  },
  comments: { type: [Object], default: [] },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

const PostMessage = mongoose.model("PostMessage", postSchema);

export default PostMessage;
