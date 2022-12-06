import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
  CardActionArea,
} from "@mui/material";

import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import ThumbUpAltOutlinedIcon from "@mui/icons-material/ThumbUpAltOutlined";
import DeleteIcon from "@mui/icons-material/Delete";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import useStyles from "./styles";
import moment from "moment";
import { useDispatch } from "react-redux";
import { setCurrentId } from "../../../slices/postUpdateSlice";
import {
  useDeletePostMutation,
  useLikePostMutation,
} from "../../../slices/postsSlice";
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

const Post = ({ post }) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const location = useLocation();
  const [deletePost] = useDeletePostMutation();
  const [likePost] = useLikePostMutation();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const [likes, setLikes] = useState(post?.likes);
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleCloseCancel = () => {
    setOpen(false);
  };

  const handleCloseDelete = () => {
    setOpen(false);
    deletePost(post);
  };

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("profile")));
  }, [location]);

  const handleLikes = () => {
    likePost(post);
    if (
      post?.likes?.find(
        (like) => like === (user?.result?.sub || user?.result?._id)
      )
    ) {
      setLikes(
        post?.likes?.filter(
          (like) => like !== (user?.result?.sub || user?.result?._id)
        )
      );
    } else {
      setLikes([...post.likes, user?.result?.sub || user?.result?._id]);
    }
  };

  const Likes = () => {
    if (likes.length > 0) {
      return likes.find(
        (like) => like === (user?.result?.sub || user?.result?._id)
      ) ? (
        <>
          <ThumbUpAltIcon fontSize="small" />
          &nbsp;
          {post.likes.length > 2
            ? `You and ${likes.length - 1} others`
            : `${likes.length} like${likes.length > 1 ? "s" : ""}`}
        </>
      ) : (
        <>
          <ThumbUpAltOutlinedIcon fontSize="small" />
          &nbsp;{likes.length} {likes.length === 1 ? "Like" : "Likes"}
        </>
      );
    }

    return (
      <>
        <ThumbUpAltOutlinedIcon fontSize="small" />
        &nbsp;Like
      </>
    );
  };

  const openPost = () => {
    navigate(`/posts/${post._id}`);
  };

  return (
    <div>
      <Card
        className={classes.card}
        // raised
        // elevation={6}
      >
        <CardActionArea className={classes.cardAction} onClick={openPost}>
          <CardMedia
            className={classes.media}
            image={
              post.selectedFile ||
              "https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png"
            }
            title={post.title}
          />
          <div className={classes.overlay}>
            <Typography variant="h6">{post.name}</Typography>
            <Typography variant="body2">
              {moment(post.createdAt).fromNow()}
            </Typography>
          </div>

          {post.tags[0] !== "" && (
            <div className={classes.details}>
              <Typography variant="body2" color="textSecondary">
                {post.tags.map((tag) => `#${tag} `)}
              </Typography>
            </div>
          )}
          <Typography className={classes.title} variant="h5" gutterBottom>
            {post.title}
          </Typography>
          <CardContent>
            <Typography
              variant="body2"
              color="textSecondary"
              component="p"
              className={classes.PostMessage}
            >
              {post.message}
            </Typography>
          </CardContent>
        </CardActionArea>

        {(user?.result?.sub === post?.creator ||
          user?.result?._id === post?.creator) && (
          <div className={classes.overlay2}>
            <Button
              style={{ color: "white" }}
              size="small"
              onClick={() => {
                dispatch(setCurrentId(post._id));
              }}
            >
              <MoreHorizIcon fontSize="default" />
            </Button>
          </div>
        )}

        <CardActions className={classes.cardActions}>
          <Button
            size="small"
            color="primary"
            disabled={!user?.result}
            onClick={handleLikes}
          >
            <Likes />
          </Button>
          {(user?.result?.sub === post?.creator ||
            user?.result?._id === post?.creator) && (
            <Button
              size="small"
              color="primary"
              type="button"
              onClick={
                // () => {
                handleClickOpen
                // deletePost(post);
                // }
              }
            >
              <DeleteIcon fontSize="small" />
              Delete
            </Button>
          )}
        </CardActions>
      </Card>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Are you usre you want to delete your review??"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            This review will be deleted immediately. You can't undo this action.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseCancel}>Cancel</Button>
          <Button onClick={handleCloseDelete} autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Post;
