import { Grid } from "@material-ui/core";
import Nothing from "../../../images/nothing.png";
import useStyles from "./styles";
import Post from "../Post/Post";
import { Typography } from "@mui/material";
import { CircularProgress, Paper } from "@material-ui/core";

const Title = ({ searchResult, lang, searchTerm }) => {
  const classes = useStyles();

  if (
    searchResult.isUninitialized ||
    searchResult.isLoading ||
    searchResult.isError ||
    searchResult.status === "pending"
  ) {
    return (
      <Paper elevation={0} className={classes.loadingPaper}>
        <CircularProgress size="7em" />
      </Paper>
    );
  } else if (searchResult.isSuccess) {
    if (searchResult.data.data.length === 0) {
      return (
        <Grid
          container
          direction="column"
          justifyContent="flex-start"
          alignItems="center"
        >
          <Grid item xs>
            <img src={Nothing} alt="typing" className={classes.img} />
          </Grid>
          <Grid item>
            <Typography
              variant="h6"
              color="primary.main"
              sx={{ paddingTop: 2, fontWeight: "bold" }}
            >
              {lang === "en"
                ? `Your search ${searchTerm} did not match any reviews.`
                : `${searchTerm}와(과) 일치하는 리뷰를 찾을 수 없습니다.`}
            </Typography>
          </Grid>
        </Grid>
      );
    }

    return (
      <Grid container alignItems="stretch" spacing={3}>
        {searchResult.data.data.map((post) => (
          <Grid key={post._id} item xs={12} sm={6} md={4} lg={3}>
            <Post post={post} lang={lang} />
          </Grid>
        ))}
      </Grid>
    );
  }
};

export default Title;
