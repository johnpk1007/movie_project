import User from "../models/user.js";
import PostMessage from "../models/postMessage.js";

export const localDeleteAccount = async (id, src) => {
  const user = await User.findOneAndDelete({ _id: id, src });
  if (user === null) return console.log("user doesn't exist");
  await PostMessage.updateMany(
    { "comments.id": id },
    { $pull: { comments: { id: id } } }
  );
  await PostMessage.deleteMany({ creator: id });
};
