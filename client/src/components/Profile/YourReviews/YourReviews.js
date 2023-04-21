import { Grid, CircularProgress } from "@material-ui/core";
import { Button, Paper } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import Post from "../../Posts/Post/Post";
import useStyles from "./styles";
import { apiSlice } from "../../../slices/postsSlice";
import { postShare } from "../../../slices/postShare";
import { useState } from "react";
import Pagination from "./Pagination";
import { useLocation } from "react-router-dom";
import Typing from "../../../images/typing.png";
import { Container, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import CreateOutlinedIcon from "@mui/icons-material/CreateOutlined";
import { useParams } from "react-router-dom";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const YourReviews = () => {
  const { lang } = useParams();
  const classes = useStyles();
  const [creatorId, setCreatorId] = useState();
  const user = JSON.parse(localStorage.getItem("profile"));
  const [getCreatorPosts, creatorPostsResult] =
    apiSlice.useLazyCreatorPostsQuery();
  const query = useQuery();
  const page = query.get("page") || 1;

  useEffect(() => {
    if (user.result.sub) {
      setCreatorId(user.result.sub);
    } else if (user.result._id) {
      setCreatorId(user.result._id);
    } else if (user.result.id) {
      setCreatorId(user.result.id);
    }
  }, []);

  useEffect(() => {
    if (creatorId && page) {
      getCreatorPosts({ creatorId: creatorId, page: page });
    }
  }, [creatorId, page]);

  if (
    creatorPostsResult.isUninitialized ||
    creatorPostsResult.isLoading ||
    creatorPostsResult.isError
  ) {
    console.log(creatorPostsResult);
    return (
      <Paper elevation={0} className={classes.loadingPaper}>
        <CircularProgress size="7em" />
      </Paper>
    );
  } else if (creatorPostsResult.isSuccess) {
    console.log(creatorPostsResult);
    if (creatorPostsResult.data.message) {
      return (
        <Grid
          container
          direction="column"
          justifyContent="flex-start"
          alignItems="center"
        >
          <Grid item xs>
            <img
              src={Typing}
              alt="typing"
              height="400px"
              className={classes.img}
            />
          </Grid>
          <Grid item>
            <Button
              component={Link}
              to={"/" + lang + "/newreview"}
              variant="outlined"
              color="primary"
              startIcon={<CreateOutlinedIcon />}
              sx={{ borderRadius: 20 }}
            >
              {lang === "en" ? "Write new review" : "새로운 리뷰 작성"}
            </Button>
          </Grid>
        </Grid>
      );
    } else {
      return (
        <div>
          <Grid container spacing={3}>
            {creatorPostsResult.data.data.map((post) => (
              <Grid key={post._id} item xs={12} sm={6} md={4} lg={3}>
                <Post post={post} lang={lang} />
              </Grid>
            ))}
          </Grid>
          {creatorPostsResult.data.total > 8 ? (
            <Container maxWidth="xl">
              <Grid
                container
                direction="column"
                justifyContent="space-between"
                alignItems="center"
                spacing={3}
              >
                <Grid item xs={12}>
                  <Pagination
                    creatorId={creatorId}
                    page={page}
                    numberOfPage={creatorPostsResult.data.numberOfPage}
                  />
                </Grid>
              </Grid>
            </Container>
          ) : null}
        </div>
      );
    }
  } else return null;
};

export default YourReviews;
