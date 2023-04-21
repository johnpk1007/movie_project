import { useState, useEffect, useCallback } from "react";
import { Paper, CircularProgress } from "@material-ui/core";
import { Typography, Grid, Divider, Button, SliderTrack } from "@mui/material";

import moment from "moment";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import useStyles from "./styles";
import { useGetPostQuery } from "../../slices/postsSlice";
import { apiSlice } from "../../slices/postsSlice";

import CommentSection from "./CommentSection";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import ThumbUpAltOutlinedIcon from "@mui/icons-material/ThumbUpAltOutlined";

import { useDispatch, useSelector } from "react-redux";

import { useDeletePostMutation } from "../../slices/postsSlice";

import BasicMenu from "./MoreButton";

import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { useLikePostMutation } from "../../slices/postsSlice";
import Post from "../Posts/Post/Post";

const PostDetails = () => {
  const { id, lang } = useParams();

  const getData = useGetPostQuery({ id }, { skip: !id });

  const classes = useStyles();
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const [deletePost] = useDeletePostMutation();
  const openPost = (_id) => navigate(`/posts/${_id}`);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const loginChange = useSelector((state) => state.login.login);
  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("profile")));
  }, [loginChange]);
  const [likePost] = useLikePostMutation();

  const [searchTrigger, searchResult] = apiSlice.useLazySearchPostsQuery();
  const [likes, setLikes] = useState([]);

  useEffect(() => {
    console.log("useEffect worked!");
    if (getData.isSuccess && getData.data.tags.length) {
      console.log("getData.data.tags:", getData.data.tags);
      searchTrigger({ search: "none", tags: getData.data.tags });
    }

    if (getData.isSuccess && getData.data.likes.length) {
      setLikes(getData.data.likes);
    }
  }, [getData.isSuccess, location, getData?.data?.tags]);

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("profile")));
  }, [location]);

  useEffect(() => {
    if (likes !== getData?.data?.likes) {
      setLikes(getData?.data?.likes);
    }
  }, [getData?.data?.likes]);

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

  if (getData.isUninitialized || getData.isLoading || getData.isError) {
    return (
      <Paper elevation={0} className={classes.loadingPaper}>
        <CircularProgress size="7em" />
      </Paper>
    );
  } else if (getData.isSuccess && searchResult.isSuccess) {
    const recommendedPosts = searchResult.data.data.filter(
      (post) => post._id !== getData.data._id
    );

    const Likes = () => {
      if (likes?.includes(user?.result?.id)) {
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
            {likes?.length ? likes.length : " "}{" "}
            {lang === "en" ? (likes.length === 1 ? "Like" : "Likes") : "좋아요"}
          </>
        );
      }
    };

    const handleLikes = () => {
      likePost({ _id: getData?.data._id, creatorId: user?.result?.id });

      const include = likes.includes(user?.result?.id);
      if (include) {
        setLikes(likes.filter((like) => like !== user.result.id));
      } else {
        setLikes([...likes, user.result.id]);
      }
    };

    return (
      <div>
        <Grid container justifyContent="center">
          <Grid item xs={10} xl={8}>
            <Card
              sx={{
                display: "flex",
                justifyContent: "space-between",
                flexDirection: { xs: "column-reverse", md: "row" },
              }}
            >
              <CardContent sx={{ padding: 5 }}>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    height: "100%",
                  }}
                >
                  <Box>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "row",
                          paddingBottom: 1,
                        }}
                      >
                        <Typography
                          variant="subtitle1"
                          color="text.secondary"
                          component="div"
                        >
                          {getData.data.name}
                        </Typography>
                        <div>&nbsp;</div>
                        <div>&nbsp;</div>
                        <Typography
                          variant="subtitle1"
                          color="text.secondary"
                          component="div"
                        >
                          {moment(getData.data.createdAt)
                            .locale(lang === "en" ? "en" : "ko")
                            .fromNow()}
                        </Typography>
                      </Box>
                      {user?.result?.id === getData?.data.creator && (
                        <BasicMenu data={getData.data} lang={lang} id={id} />
                      )}
                    </Box>
                    <Typography component="div" variant="h4" gutterBottom>
                      {getData.data.title}
                    </Typography>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                      }}
                      paddingBottom={1}
                    >
                      <Typography variant="subtitle1" color="primary">
                        #
                        {lang === "en"
                          ? genreOptionsEn.find(
                              (genre) => genre.info === getData.data.tags
                            )?.label
                          : genreOptionsKo.find(
                              (genre) => genre.info === getData.data.tags
                            )?.label}
                      </Typography>
                      <div>&nbsp;</div>
                      <div>&nbsp;</div>
                      <Button
                        size="small"
                        color="primary"
                        disabled={!user?.result}
                        onClick={handleLikes}
                      >
                        <Likes />
                      </Button>
                    </Box>
                    <Box sx={{ height: "50%", overflow: "auto" }}>
                      <Typography
                        variant="body1"
                        component="p"
                        className={classes.message}
                        paddingBottom={2}
                      >
                        {getData.data.message}
                      </Typography>
                    </Box>
                  </Box>

                  <CommentSection
                    user={user}
                    lang={lang}
                    comments={getData.data.comments}
                    location={location}
                    success={getData.isSuccess}
                  />
                </Box>
              </CardContent>

              <CardMedia
                component="img"
                sx={{ width: { xs: "auto", md: 400, lg: 500 } }}
                image={
                  getData.data.selectedFile ||
                  "https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png"
                }
                alt="poster"
              />
            </Card>
          </Grid>
        </Grid>

        <Grid
          container
          justifyContent="center"
          style={{ paddingTop: 30, paddingBottom: 30 }}
        >
          <Grid item xs={10} xl={8}>
            <Grid
              item
              display="flex"
              justifyContent="flex-start"
              paddingBottom={2}
              paddingLeft={4}
            >
              <Typography variant="h6">
                {recommendedPosts.length
                  ? lang === "en"
                    ? "Related reviews"
                    : "관련 리뷰들"
                  : ""}
              </Typography>
            </Grid>
            <Grid container alignItems="stretch" spacing={3}>
              {recommendedPosts.slice(0, 4).map((post) => (
                <Grid key={post._id} item xs={12} sm={6} md={4} lg={3}>
                  <Post post={post} lang={lang} />
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </div>
    );
  } else
    return (
      <Paper elevation={0} className={classes.loadingPaper}>
        <CircularProgress size="7em" />
      </Paper>
    );
};

export default PostDetails;
