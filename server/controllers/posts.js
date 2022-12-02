import mongoose from "mongoose";
import PostMessage from "../models/postMessage.js";

export const getPostsBySearch = async (req, res) => {
  const { searchQuery, tags } = req.query;

  try {
    const title = new RegExp(searchQuery, "i");
    const posts = await PostMessage.find({
      $or: [{ title }, { tags: { $in: tags.split(",") } }],
    });
    res.json({ data: posts });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getPosts = async (req, res) => {
  console.log(req);
  const { page } = req.query;
  console.log(page);
  try {
    const LIMIT = 8;
    const startIndex = (Number(page) - 1) * LIMIT;
    const total = await PostMessage.countDocuments({});
    const posts = await PostMessage.find()
      .sort({ _id: -1 })
      .limit(LIMIT)
      .skip(startIndex);
    res.status(200).json({
      data: posts,
      currentPage: Number(page),
      numberOfPage: Math.ceil(total / LIMIT),
    });
    console.log("i got everything!");
  } catch (error) {
    res.json({ message: error.message });
  }
};

export const getPost = async (req, res) => {
  try {
    const { id } = req.params;
    const postMessage = await PostMessage.findById(id);
    res.status(200).json(postMessage);
    console.log("i caught something!");
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createPost = async (req, res) => {
  console.log(req.headers);
  const post = req.body;
  const newPost = new PostMessage({
    ...post,
    creator: req.userId,
    createdAt: new Date().toISOString(),
  });
  try {
    await newPost.save();
    res.status(201).json(newPost);
    console.log("I just made something!");
  } catch (error) {
    res.status(409).json({ message: error.message });
    console.log("I failed somehow!");
  }
};

export const updatePost = async (req, res) => {
  try {
    console.log(req.body);
    const { _id: id, ...post } = req.body;
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(404).end("No post with that id");
    const updatedPost = await PostMessage.findByIdAndUpdate(id, post, {
      new: true,
    });
    res.json(updatedPost);
    console.log("update complete");
  } catch (error) {
    console.log("damn it");
    res.status(404).json({ message: error.message });
  }
};

export const deletePost = async (req, res) => {
  try {
    const { _id: id } = req.body;
    console.log(id);
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(404).end("No post with that id");
    await PostMessage.findByIdAndRemove(id);
    res.json({ message: "Post deleted successfully" });
  } catch (error) {
    console.log("damn it");
    res.status(404).json({ error });
  }
};

export const likePost = async (req, res) => {
  try {
    const { id } = req.params;
    if (!req.userId) return res.json({ message: "Unauthenticated" });

    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(404).end("No post with that id");

    const post = await PostMessage.findById(id);

    const index = post.likes.findIndex((id) => id === String(req.userId));

    if (index === -1) {
      console.log("we have it");
      post.likes.push(req.userId);
    } else {
      console.log("we dont have it");
      post.likes = post.likes.filter((id) => id !== String(req.userId));
    }

    const updatedPost = await PostMessage.findByIdAndUpdate(id, post, {
      new: true,
    });
    res.json(updatedPost);
  } catch (error) {
    console.log("damn it");
    res.status(404).json({ error });
  }
};

export const commentPost = async (req, res) => {
  console.log(req.body);
  const { id } = req.params;
  const { finalComment, creatorId } = req.body;
  const post = await PostMessage.findById(id);
  post.comments.push({ id: creatorId, comment: finalComment });
  const updatedPost = await PostMessage.findByIdAndUpdate(id, post, {
    new: true,
  });
  res.json(updatedPost);
};

export const commentDelete = async (req, res) => {
  console.log(req.body);
  const { _id: id, index } = req.body;
  const post = await PostMessage.findById(id);
  post.comments.splice(index, 1);
  const updatedPost = await PostMessage.findByIdAndUpdate(id, post, {
    new: true,
  });
  res.json(updatedPost);
};
