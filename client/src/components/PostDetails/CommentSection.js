import { useState, useRef, useEffect } from "react";
import { Typography, TextField, Button } from "@material-ui/core";
import IconButton from "@mui/material/IconButton";
import {
  useCommentDeleteMutation,
  useCommentPostMutation,
  useGetPostQuery,
} from "../../slices/postsSlice";
import { useParams } from "react-router-dom";
import useStyles from "./styles";
import CloseIcon from "@mui/icons-material/Close";
import CreateIcon from "@mui/icons-material/Create";
import InputBase from "@mui/material/InputBase";
import { Divider } from "@mui/material";
import Pagination from "@mui/material/Pagination";

const CommentSection = ({ user, lang, comments, location, success }) => {
  const { id } = useParams();

  const classes = useStyles();
  const [comment, setComment] = useState("");

  const [commentResult, setCommentResult] = useState([...comments]);

  useEffect(() => {
    if (comments !== commentResult) {
      setCommentResult([...comments]);
    }
  }, [comments]);

  const [commentPost] = useCommentPostMutation();
  const [commentDelete] = useCommentDeleteMutation();

  const handleClick = () => {
    const finalComment = `${user.result.name}: ${comment}`;
    const randomNumber = Math.random() * 10 ** 16;

    setCommentResult([
      ...commentResult,
      {
        id: user?.result?.id,
        number: randomNumber,
        comment: finalComment,
      },
    ]);

    commentPost({
      finalComment,
      _id: id,
      uniqueNumber: randomNumber,
      creatorId: user?.result?.id,
    });
    setComment("");
  };

  const handleDeleteClick = (index) => {
    console.log("index:", index);
    commentDelete({ _id: id, index });

    const number = commentResult.findIndex(
      (element) => element.uniqueNumber === index
    );
    console.log(number);
    commentResult.splice(number, 1);
    setCommentResult(commentResult);
  };

  const ceil = Math.ceil(commentResult.length / 5);
  const oldValueRef = useRef(null);

  const [number, setNumber] = useState(1);

  const handlePageChange = (event, value) => {
    setNumber(value);
  };
  useEffect(() => {
    if (commentResult.length > 4 && ceil < number) {
      setNumber(ceil);
    }
  }, [ceil, number]);

  useEffect(() => {
    const oldValue = oldValueRef.current;
    const newValue = commentResult.length;
    oldValueRef.current = commentResult.length;
    if (newValue % 5 === 1 && newValue > oldValue) {
      setNumber(ceil);
    }
  }, [commentResult.length]);

  const handleKeyPress = (e) => {
    if (e.keyCode === 13) {
      handleClick();
    }
  };

  return (
    <div
      style={{
        height: "50%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <div className={classes.commentsColumnContainer}>
        {commentResult.length !== 0 && (
          <Typography gutterBottom variant="h6">
            {lang === "en" ? "Comments" : "댓글"}
          </Typography>
        )}

        <div className={classes.commentsInnerContainer}>
          {commentResult
            .slice(number * 5 - 5, number * 5)
            .map((currentValue, index) => (
              <Typography key={index} gutterBottom variant="subtitle2">
                <strong>{currentValue.comment.split(": ")[0]}</strong>
                &nbsp;
                {currentValue.comment.split(":")[1]}
                {user?.result?.id === currentValue.id && (
                  <IconButton
                    size="small"
                    color="error"
                    onClick={() => {
                      console.log(currentValue);

                      handleDeleteClick(currentValue.uniqueNumber);
                    }}
                  >
                    <CloseIcon fontSize="small" />
                  </IconButton>
                )}
              </Typography>
            ))}
        </div>
      </div>
      <div className={classes.commentsBottomColumnContainer}>
        {commentResult.length > 5 ? (
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Pagination
              count={ceil}
              page={number}
              onChange={handlePageChange}
            />
          </div>
        ) : null}
        <Divider sx={{ marginBottom: 3, marginTop: 2 }} />
        <div style={{ width: "100%" }}>
          <div className={classes.search}>
            <InputBase
              className={classes.styledInputBase}
              placeholder={
                lang === "en"
                  ? user?.result?.name === undefined
                    ? "Log in if you want to add your comment"
                    : "Write your comment"
                  : user?.result?.name === undefined
                  ? "댓글을 작성하시려면 로그인을 해주세요."
                  : "댓글을 작성하세요."
              }
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              disabled={user?.result?.name === undefined ? true : false}
              onKeyDown={handleKeyPress}
            />
            <div className={classes.searchIconWrapper}>
              <IconButton
                onClick={() => {
                  handleClick();
                }}
                disabled={user?.result?.name === undefined ? true : false}
              >
                <CreateIcon />
              </IconButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommentSection;
