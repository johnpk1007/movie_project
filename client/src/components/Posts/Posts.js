import { Grid, CircularProgress } from "@material-ui/core";
import Post from "./Post/Post";
import useStyles from "./styles";
import { apiSlice } from "../../slices/postsSlice";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { postShare } from "../../slices/postShare";

const Posts = () => {
  const classes = useStyles();

  const [getTrigger, getResult] = apiSlice.useLazyGetPostsQuery();
  const [searchTrigger, searchResult] = apiSlice.useLazySearchPostsQuery();
  const dispatch = useDispatch();
  const postShareSelector = useSelector((state) => state.postShare.post);
  const page = useSelector((state) => state.postPage.page);

  useEffect(() => {
    getTrigger({ page });
    dispatch(postShare());
  }, [page]);

  useEffect(() => {
    if (postShareSelector) {
      searchTrigger(postShareSelector);
    }
  }, [postShareSelector]);

  if (postShareSelector) {
    if (
      searchResult.isUninitialized ||
      searchResult.isLoading ||
      searchResult.isError
    ) {
      return <CircularProgress />;
    } else if (searchResult.isSuccess) {
      return (
        <Grid
          className={classes.container}
          container
          alignItems="stretch"
          spacing={3}
        >
          {searchResult.data.data.map((post) => (
            <Grid key={post._id} item xs={12} sm={6}>
              <Post post={post} />
            </Grid>
          ))}
        </Grid>
      );
    } else return null;
  } else {
    if (getResult.isUninitialized || getResult.isLoading || getResult.isError) {
      return <CircularProgress />;
    } else if (getResult.isSuccess) {
      return (
        <Grid
          className={classes.container}
          container
          alignItems="stretch"
          spacing={3}
        >
          {getResult.data.data.map((post) => (
            <Grid key={post._id} item xs={12} sm={12} md={6} lg={4} xl={3}>
              <Post post={post} />
            </Grid>
          ))}
        </Grid>
      );
    } else return null;
  }
};

export default Posts;
