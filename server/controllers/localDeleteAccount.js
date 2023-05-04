import User from "../models/user.js";
import PostMessage from "../models/postMessage.js";

// export const localDeleteAccount = async (id, src) => {
export const localDeleteAccount = async (req, res) => {
  const { creatorId: id, src } = req.body;
  const user = await User.findOneAndDelete({ _id: id, src });
  if (user === null) return console.log("user doesn't exist");
  await PostMessage.updateMany(
    { "comments.id": id },
    { $pull: { comments: { id: id } } }
  );
  await PostMessage.deleteMany({ creator: id });
  res.json({ message: "User deleted successfully" });
};
