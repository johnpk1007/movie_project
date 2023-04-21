import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
  CardActionArea,
  collapseClasses,
} from "@mui/material";

import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import ThumbUpAltOutlinedIcon from "@mui/icons-material/ThumbUpAltOutlined";
import DeleteIcon from "@mui/icons-material/Delete";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import useStyles from "./styles";
import moment from "moment";

import "moment/locale/ko";

import { useDispatch, useSelector } from "react-redux";
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

const Post = ({ post, lang }) => {
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

  const loginChange = useSelector((state) => state.login.login);

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("profile")));
  }, [location, loginChange]);

  const handleLikes = () => {
    likePost({ _id: post._id, creatorId: user?.result?.id });

    const include = likes.includes(user?.result?.id);
    if (include) {
      setLikes(likes.filter((like) => like !== user.result.id));
    } else {
      setLikes([...likes, user.result.id]);
    }
  };

  const Likes = () => {
    if (likes.includes(user?.result?.id)) {
      return (
        <>
          <ThumbUpAltIcon fontSize="small" />
          &nbsp;
          {likes.length ? likes.length : " "}{" "}
          {lang === "en" ? (likes.length === 1 ? "Like" : "Likes") : "좋아요"}
        </>
      );
    } else {
      return (
        <>
          <ThumbUpAltOutlinedIcon fontSize="small" />
          &nbsp;
          {likes.length ? likes.length : " "}{" "}
          {lang === "en" ? (likes.length === 1 ? "Like" : "Likes") : "좋아요"}
        </>
      );
    }
  };

  const openPost = (event, value) => {
    navigate(`/${lang}/posts/${post._id}`);
  };

  const genreOptionsEn = [
    { label: "Action", info: "action" },
    { label: "Adventure", info: "adventure" },
    { label: "Drama", info: "drama" },
    { label: "Fantasy", info: "fantasy" },
    { label: "Horror", info: "horror" },
    { label: "Mystery", info: "mystery" },
    { label: "Musical", info: "musical" },
    { label: "Science Fiction", info: "science fiction" },
    { label: "Sports", info: "sports" },
    { label: "Thriller", info: "thriller" },
    { label: "War", info: "war" },
  ];

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

  return (
    <div>
      <Card className={classes.card} elevation={0}>
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
              {moment(post.createdAt)
                .locale(lang === "en" ? "en" : "ko")
                .fromNow()}
            </Typography>
          </div>

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

        <div className={classes.overlay3}>
          <Typography variant="body2" color="primary">
            #
            {lang === "en"
              ? genreOptionsEn.find((genre) => genre.info === post.tags)?.label
              : genreOptionsKo.find((genre) => genre.info === post.tags)?.label}
          </Typography>

          <Button
            size="small"
            color="primary"
            disabled={!user?.result}
            onClick={handleLikes}
          >
            <Likes />
          </Button>
        </div>
      </Card>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Are you usre you want to delete your review?"}
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
