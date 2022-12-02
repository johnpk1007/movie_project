import { useState, useRef } from "react";
import { Typography, TextField, Button } from "@material-ui/core";
import { IconButton } from "@mui/material";
import {
  useCommentDeleteMutation,
  useCommentPostMutation,
  useGetPostQuery,
} from "../../slices/postsSlice";
import { useParams } from "react-router-dom";
import useStyles from "./styles";
import CloseIcon from "@mui/icons-material/Close";

const CommentSection = ({ user }) => {
  const { id } = useParams();
  const getResult = useGetPostQuery({ id });
  const classes = useStyles();
  const [comment, setComment] = useState("");
  const [commentResult, setCommentResult] = useState([
    ...getResult.data.comments,
  ]);
  const [commentPost] = useCommentPostMutation();
  const [commentDelete] = useCommentDeleteMutation();
  const commentsRef = useRef();

  const handleClick = () => {
    const finalComment = `${user.result.name}: ${comment}`;
    setCommentResult([
      ...commentResult,
      { id: user?.result?.sub || user?.result?._id, comment: finalComment },
    ]);
    commentPost({
      finalComment,
      _id: id,
      creatorId: user?.result?.sub || user?.result?._id,
    });
    setComment("");
    commentsRef.current.scrollIntoView(false);
  };

  const handleDeleteClick = (index) => {
    commentDelete({ _id: id, index });
    commentResult.splice(index, 1);
    setCommentResult(commentResult);
  };

  return (
    <div>
      <div className={classes.commentsOuterContainer}>
        <div className={classes.commentsColumnContainer}>
          <Typography gutterBottom variant="h6">
            Comments
          </Typography>

          <div className={classes.commentsInnerContainer}>
            {commentResult.map((currentValue, index) => (
              <Typography key={index} gutterBottom variant="subtitle1">
                <strong>{currentValue.comment.split(": ")[0]}</strong>
                {currentValue.comment.split(":")[1]}

                {(user?.result?.sub === currentValue.id ||
                  user?.result?._id === currentValue.id) && (
                  <Button size="small" onClick={() => handleDeleteClick(index)}>
                    <CloseIcon fontSize="small" />
                  </Button>
                )}
              </Typography>
            ))}

            <div ref={commentsRef}>&nbsp;</div>
          </div>
        </div>
        {user?.result?.name && (
          <div style={{ width: "70%" }}>
            <Typography gutterBottom variant="h6">
              Write a comment
            </Typography>
            <TextField
              fullWidth
              minRows={4}
              variant="outlined"
              label="comment"
              multiline
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <Button
              style={{ marginTop: "10px" }}
              fullWidth
              disabled={!comment}
              variant="contained"
              onClick={handleClick}
              color="primary"
            >
              Comment
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CommentSection;
