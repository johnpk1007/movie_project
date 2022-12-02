import { useState, useEffect } from "react";
import {
  Paper,
  Typography,
  CircularProgress,
  Divider,
} from "@material-ui/core";

import moment from "moment";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import useStyles from "./styles";
import { useGetPostQuery } from "../../slices/postsSlice";
import { apiSlice } from "../../slices/postsSlice";
import CommentSection from "./CommentSection";

const PostDetails = () => {
  const { id } = useParams();
  const getData = useGetPostQuery({ id }, { skip: !id });
  const classes = useStyles();
  const navigate = useNavigate();
  const location = useLocation();

  const openPost = (_id) => navigate(`/posts/${_id}`);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));

  const [searchTrigger, searchResult] = apiSlice.useLazySearchPostsQuery();
  useEffect(() => {
    if (getData.isSuccess && getData.data.tags.length) {
      searchTrigger({ search: "none", tags: getData.data.tags });
    }
  }, [getData.isSuccess]);

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("profile")));
  }, [location]);

  if (getData.isUninitialized || getData.isLoading || getData.isError) {
    return (
      <Paper elevation={6} className={classes.loadingPaper}>
        <CircularProgress size="7em" />
      </Paper>
    );
  } else if (getData.isSuccess && searchResult.isSuccess) {
    const recommendedPosts = searchResult.data.data.filter(
      (post) => post._id !== getData.data._id
    );

    return (
      <Paper style={{ padding: "20px", borderRadius: "15px" }} elevation={6}>
        <div className={classes.card}>
          <div className={classes.section}>
            <Typography variant="h3" component="h2">
              {getData.data.title}
            </Typography>
            {getData.data.tags[0] !== "" && (
              <Typography
                gutterBottom
                variant="h6"
                color="textSecondary"
                component="h2"
              >
                {getData.data.tags.map((tag) => `#${tag} `)}
              </Typography>
            )}
            <Typography gutterBottom variant="body1" component="p">
              {getData.data.message}
            </Typography>
            <Typography variant="h6">
              Created by: {getData.data.name}
            </Typography>
            <Typography variant="body1">
              {moment(getData.data.createdAt).fromNow()}
            </Typography>
            <Divider style={{ margin: "20px 0" }} />
            <CommentSection user={user} />
            <Divider style={{ margin: "20px 0" }} />
          </div>
          <div className={classes.imageSection}>
            <img
              className={classes.media}
              src={
                getData.data.selectedFile ||
                "https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png"
              }
              alt={getData.data.title}
            />
          </div>
        </div>

        {/* {getData.data.tags && ( */}
        {recommendedPosts.length !== 0 && (
          <div className={classes.section}>
            <Typography gutterBottom variant="h5">
              You might also like:
            </Typography>
            <Divider />
            <div className={classes.recommendedPosts}>
              {recommendedPosts.map(
                ({ title, name, message, likes, selectedFile, _id }) => (
                  <div
                    style={{ margin: "20px", cursor: "pointer" }}
                    onClick={() => openPost(_id)}
                    key={_id}
                  >
                    <Typography gutterBottom variant="h6">
                      {title}
                    </Typography>
                    <Typography gutterBottom variant="subtitle2">
                      {name}
                    </Typography>
                    <Typography gutterBottom variant="subtitle2">
                      {message}
                    </Typography>
                    <Typography gutterBottom variant="subtitle1">
                      Likes: {likes.length}
                    </Typography>
                    <img src={selectedFile} width="200px" alt={title} />
                  </div>
                )
              )}
            </div>
          </div>
        )}
      </Paper>
    );
  } else
    return (
      <Paper elevation={6} className={classes.loadingPaper}>
        <CircularProgress size="7em" />
      </Paper>
    );
};

export default PostDetails;
