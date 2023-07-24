import mongoose from "mongoose";

const postShcema = mongoose.Schema({
  title: String,
  subtile: String,
  content: String,
  tag: String,
  image: String,
  createAt: {
    type: Date,
    default: new Date(),
  },
});

const Post = mongoose.model("Post", postShcema);

export default Post;
