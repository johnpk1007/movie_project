import { CircularProgress, Paper } from "@material-ui/core";
import Post from "./Post/Post";
import useStyles from "./styles";
import { Grid } from "@mui/material";
import { apiSlice } from "../../slices/postsSlice";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { postShare } from "../../slices/postShare";

import { useParams } from "react-router-dom";
import Nothing from "../../images/nothing.png";

import { useState } from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom";

import Title from "./Title/Title";
import Tags from "./Tags/Tags";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Grid
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
      item
      xs
    >
      {value === index && (
        <Box
          sx={{
            p: 3,
          }}
        >
          {children}
        </Box>
      )}
    </Grid>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

const Posts = () => {
  const { lang } = useParams();
  const navigate = useNavigate();

  const classes = useStyles();

  const [getTrigger, getResult] = apiSlice.useLazyGetPostsQuery();
  const [searchTrigger, searchResult] = apiSlice.useLazySearchPostsQuery();
  const dispatch = useDispatch();
  const page = useSelector((state) => state.postPage.page);

  const url = new URL(window.location.href);
  const search = url.searchParams.get("searchQuery");
  const tags = url.searchParams.get("tags");

  const [value, setValue] = useState(search === "none" ? 1 : 0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const searchTerm = search !== "none" ? search : tags;

  const [usingEnglish, setUsingEnglish] = useState(
    /^[a-zA-Z]+$/.test(searchTerm)
  );
  useEffect(() => {
    if (/^[a-zA-Z]+$/.test(searchTerm)) {
      setUsingEnglish(true);
    } else {
      setUsingEnglish(false);
    }
  }, [searchTerm]);

  useEffect(() => {
    getTrigger({ page });
    dispatch(postShare());
  }, [page]);

  useEffect(() => {
    if (search && search !== "none") {
      console.log("search:", search);
      setValue(0);
      searchTrigger({ search: search, tags: "" });
    }
    if (tags && search === "none") {
      console.log("tags:", tags);
      setValue(1);
      searchTrigger({ search: "none", tags: tags, usingEnglish: usingEnglish });
    }
  }, [search, tags]);

  useEffect(() => {
    if (search) {
      if (value === 0) {
        navigate(`/${lang}/posts/search?searchQuery=${searchTerm}&tags=`);
      } else {
        navigate(`/${lang}/posts/search?searchQuery=none&tags=${searchTerm}`);
      }
    }
  }, [value]);

  if (search) {
    return (
      <Box
        sx={{
          // flexGrow: 1,
          bgcolor: "background.paper",
          display: "flex",
          direction: "row",
          justifyContent: "flex-start",
          height: 200,
        }}
      >
        <Tabs
          orientation="vertical"
          variant="scrollable"
          value={value}
          onChange={handleChange}
          aria-label="Vertical tabs example"
          sx={{
            borderRight: 1,
            borderColor: "white",
            // minWidth: 150,
            width: { xs: 90, sm: 150 },
          }}
        >
          <Tab label={lang === "en" ? "Title" : "제목"} {...a11yProps(0)} />
          <Tab label={lang === "en" ? "Genre" : "장르"} {...a11yProps(1)} />
        </Tabs>

        <TabPanel value={value} index={0}>
          <Title
            searchResult={searchResult}
            lang={lang}
            searchTerm={searchTerm}
          />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <Tags
            searchResult={searchResult}
            lang={lang}
            searchTerm={searchTerm}
          />
        </TabPanel>
      </Box>
    );
  } else {
    if (getResult.isUninitialized || getResult.isLoading || getResult.isError) {
      return (
        <Paper elevation={0} className={classes.loadingPaper}>
          <CircularProgress size="7em" />
        </Paper>
      );
    } else if (getResult.isSuccess) {
      if (getResult.isFetching === true) {
        if (getResult.currentData !== getResult.data) {
          return (
            <Paper elevation={0} className={classes.loadingPaper}>
              <CircularProgress size="7em" />
            </Paper>
          );
        } else {
          return (
            <Grid container alignItems="stretch" spacing={3}>
              {getResult.data.data.map((post) => (
                <Grid key={post._id} item xs={12} sm={6} md={4} lg={3}>
                  <Post post={post} lang={lang} />
                </Grid>
              ))}
            </Grid>
          );
        }
      }
      if (getResult.isFetching === false) {
        return (
          <Grid container alignItems="stretch" spacing={3}>
            {getResult.data.data.map((post) => (
              <Grid key={post._id} item xs={12} sm={6} md={4} lg={3}>
                <Post post={post} lang={lang} />
              </Grid>
            ))}
          </Grid>
        );
      }
    } else return null;
  }
};

export default Posts;
