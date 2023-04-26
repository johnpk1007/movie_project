import mongoose from "mongoose";
import PostMessage from "../models/postMessage.js";
import redisClient from "../models/redis.js";

export const getPostsBySearch = async (req, res) => {
  const { searchQuery, tags, en } = req.query;

  const genreOptionsKo = [
    { label: "액션", info: "action" },
    { label: "어드벤쳐", info: "adventure" },
    { label: "드라마", info: "drama" },
    { label: "판타지", info: "fantasy" },
    { label: "공포", info: "horror" },
    { label: "미스터리", info: "mystery" },
    { label: "뮤지컬", info: "musical" },
    { label: "공상과학", info: "science fiction" },
    { label: "스포츠", info: "sports" },
    { label: "스릴러", info: "thriller" },
    { label: "전쟁", info: "war" },
  ];

  try {
    const title = new RegExp(searchQuery, "i");
    const genre = new RegExp(tags, "i");
    console.log("tags:", tags);
    console.log("genre:", genre);
    const posts =
      searchQuery !== "none"
        ? await PostMessage.find({
            title: title,
          })
        : en === "false"
        ? await PostMessage.find({
            tags: genreOptionsKo.find((genre) => genre.label === tags).info,
          })
        : await PostMessage.find({
            tags: genre,
          });

    res.json({ data: posts });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getCreatorPosts = async (req, res) => {
  try {
    const { creatorId, page } = req.query;

    const LIMIT = 8;
    const startIndex = (Number(page) - 1) * LIMIT;

    const result = await PostMessage.aggregate([
      {
        $match: { creator: creatorId },
      },
      {
        $facet: {
          totalRecords: [
            {
              $count: "total",
            },
          ],
          data: [
            {
              $sort: { _id: -1 },
            },
            {
              $skip: startIndex,
            },
            {
              $limit: LIMIT,
            },
          ],
        },
      },
    ]);

    console.log("result:", result);

    const total = result[0].totalRecords[0].total;

    console.log("total:", total);

    res.status(200).json({
      data: result[0].data,
      currentPage: Number(page),
      numberOfPage: Math.ceil(total / LIMIT),
      total: Number(total),
    });
  } catch (error) {
    res.json({ message: error.message });
  }
};
export const getPosts = async (req, res) => {
  const { page } = req.query;
  const cookies = req.cookies;

  try {
    const LIMIT = 8;
    const startIndex = (Number(page) - 1) * LIMIT;
    const total = await PostMessage.countDocuments({});
    const posts = await PostMessage.find()
      .sort({ _id: -1 })
      .skip(startIndex)
      .limit(LIMIT);
    res.status(200).json({
      data: posts,
      currentPage: Number(page),
      numberOfPage: Math.ceil(total / LIMIT),
    });
  } catch (error) {
    res.json({ message: error.message });
  }
};

export const getPost = async (req, res) => {
  try {
    const { id } = req.params;
    await redisClient.set("id", id);
    const redisid = await redisClient.get("id");
    console.log("redisid:", redisid);
    const postMessage = await PostMessage.findById(id);
    res.status(200).json(postMessage);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createPost = async (req, res) => {
  console.log("req.body:", req.body);
  const post = req.body;
  const newPost = new PostMessage({
    ...post,
    createdAt: new Date().toISOString(),
  });
  try {
    console.log(newPost);
    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const updatePost = async (req, res) => {
  try {
    const { _id: id, ...post } = req.body;
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(404).end("No post with that id");
    const updatedPost = await PostMessage.findByIdAndUpdate(id, post, {
      new: true,
    });
    res.json(updatedPost);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const deletePost = async (req, res) => {
  try {
    const { _id: id } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(404).end("No post with that id");
    await PostMessage.findByIdAndDelete(id);
    res.status(200).json({ _id: id });
  } catch (error) {
    res.status(404).json({ error });
  }
};

export const likePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { creatorId } = req.body;
    /*
    const post = await PostMessage.findById(id);

    const index = post.likes.findIndex((id) => id === creatorId);

    if (index === -1) {
      post.likes.push(creatorId);
    } else {
      post.likes = post.likes.filter((id) => id !== creatorId);
    }

    const updatedPost = await PostMessage.findByIdAndUpdate(id, post, {
      new: true,
    });
    res.json(updatedPost);
*/

    console.log("creatorId:", creatorId);

    const post = await PostMessage.findById(id);
    const include = post.likes.includes(creatorId);

    if (!include) {
      await PostMessage.updateOne(
        { _id: id },
        {
          $push: {
            likes: creatorId,
          },
        }
      );
      console.log("push");
    } else {
      await PostMessage.updateOne(
        { _id: id },
        {
          $pull: {
            likes: `${creatorId}`,
          },
        }
      );
      console.log("pull");
    }
    res.status(200).json({ _id: id });
  } catch (error) {
    res.status(404).json({ error });
  }
};

export const commentPost = async (req, res) => {
  /*
  const { id } = req.params;
  const { finalComment, creatorId, uniqueNumber } = req.body;
  console.log(finalComment);
  const post = await PostMessage.findById(id);
  post.comments.push({ id: creatorId, uniqueNumber, comment: finalComment });
  const updatedPost = await PostMessage.findByIdAndUpdate(id, post, {
    new: true,
  });
  res.status(200).json(updatedPost.comments.map((x) => x.comment));
  // res.json(updatedPost);
*/

  const { id } = req.params;
  const { finalComment, creatorId, uniqueNumber } = req.body;
  const result = await PostMessage.updateOne(
    { _id: id },
    {
      $push: {
        comments: {
          id: creatorId,
          uniqueNumber: uniqueNumber,
          comment: finalComment,
        },
      },
    }
  );
  res.status(200).json({ _id: id });
};

export const commentDelete = async (req, res) => {
  // const { _id: id, index } = req.body;
  // const post = await PostMessage.findById(id);
  // post.comments.splice(index, 1);
  // const updatedPost = await PostMessage.findByIdAndUpdate(id, post, {
  //   new: true,
  // });
  // res.status(200);
  // console.log("uniqueNumber:", index);
  // const number = post.comments.findIndex(
  //   (element) => element.uniqueNumber === index
  // );
  // console.log("number:", number);
  // post.comments.splice(number, 1);
  // await PostMessage.findByIdAndUpdate(id, post, {
  //   new: true,
  // });
  // res.status(200);

  const { id } = req.params;
  const { index } = req.body;
  const result = await PostMessage.updateOne(
    { _id: id },
    {
      $pull: {
        comments: {
          uniqueNumber: index,
        },
      },
    }
  );
  console.log("result:", result);
};
