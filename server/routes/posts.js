import express from "express";
import isLoggedIn from "../middleware/isLoggedIn.js";

import {
  getPostsBySearch,
  getPosts,
  getPost,
  getCreatorPosts,
  createPost,
  updatePost,
  deletePost,
  likePost,
  commentPost,
  commentDelete,
} from "../controllers/posts.js";

import auth from "../middleware/auth.js";

const router = express.Router();

router.get("/search", getPostsBySearch);
router.get("/", getPosts);
router.get("/creator", getCreatorPosts);
router.get("/:id", getPost);
router.post("/", isLoggedIn, createPost);
router.patch("/:id", isLoggedIn, updatePost);
router.delete("/:id", isLoggedIn, deletePost);
router.patch("/:id/likePost", isLoggedIn, likePost);
router.post("/:id/commentPost", isLoggedIn, commentPost);
router.delete("/:id/commentPost/:index", isLoggedIn, commentDelete);

export default router;
