import { useEffect, useState } from "react";
import { TextField, Button, Typography, Paper } from "@material-ui/core";
import FileBase from "react-file-base64";
import useStyles from "./styles";
import {
  useGetPostQuery,
  useCreatePostsMutation,
  useUpdatePostMutation,
} from "../../slices/postsSlice";
import { useSelector, useDispatch } from "react-redux";
import { setCurrentId } from "../../slices/postUpdateSlice";
import { useLocation, useNavigate } from "react-router-dom";
import { Container } from "@mui/material";
import { useParams } from "react-router-dom";

import StyledDropzone from "./NewDropzone";
import ComboBox from "./GenreOptions";

const NewReview = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const [updatePost, updateResult] = useUpdatePostMutation();
  const [createPosts, createResult] = useCreatePostsMutation();
  const [postData, setPostData] = useState({
    title: "",
    message: "",
    tags: "",
    selectedFile: "",
  });
  const [noMessageError, setNoMessageError] = useState(false);
  const [noTitleError, setNoTitleError] = useState(false);
  const [noTagError, setNoTagError] = useState(false);

  const [picture, setPicture] = useState();

  const { lang, id } = useParams();

  const { data: post } = useGetPostQuery({ id }, { skip: !id });
  useEffect(() => {
    if (id && post) setPostData(post);
  }, [id, post]);

  useEffect(() => {
    return () => {
      console.log("cleaning up");
      dispatch(setCurrentId(null));
    };
  }, []);

  const loginChange = useSelector((state) => state.login.login);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("profile")));
  }, [location, loginChange]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (id) {
      updatePost({
        id,
        ...postData,
        name: user?.result?.name,
        creatorId: user?.result?.id,
      });
      //   clear();
    } else {
      console.log("im gonna create");
      const info = await createPosts({
        ...postData,
        name: user?.result?.name,
        creator: user?.result?.id,
      });

      console.log(info);

      if (info.error) {
        if (info.error.data.message.includes("Path `message` is required.")) {
          setNoMessageError(true);
        } else {
          setNoMessageError(false);
        }
        if (info.error.data.message.includes("Path `title` is required.")) {
          setNoTitleError(true);
        } else {
          setNoTitleError(false);
        }
        if (info.error.data.message.includes("Path `tags` is required.")) {
          setNoTagError(true);
        } else {
          setNoTagError(false);
        }
      }
    }
  };

  const clear = () => {
    dispatch(setCurrentId(null));
    setPostData({
      title: "",
      message: "",
      tags: "",
      selectedFile: "",
    });
  };

  useEffect(() => {
    if (createResult.isUninitialized === false && createResult.isSuccess) {
      clear();
      navigate(`/${lang}/posts/${createResult.data._id}`);
    }
  }, [createResult.isSuccess]);

  useEffect(() => {
    if (updateResult.isUninitialized === false && updateResult.isSuccess) {
      clear();
      navigate(`/${lang}/posts/${updateResult.originalArgs._id}`);
    }
  }, [updateResult.isSuccess]);

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

  const preOption =
    id !== null
      ? lang === "en"
        ? genreOptionsEn.find((genre) => genre.info === post?.tags)
        : genreOptionsKo.find((genre) => genre.info === post?.tags)
      : undefined;

  return (
    <Container component="main" maxWidth="xs">
      <Paper elevation={1} className={classes.paper}>
        <form
          autoComplete="off"
          noValidate
          className={`${classes.root} ${classes.form}`}
          onSubmit={(e) => handleSubmit(e)}
        >
          <Typography variant="h6">
            {lang === "en"
              ? id
                ? "Editing a Movie Review"
                : "Creating a Movie Review"
              : id
              ? "리뷰 수정"
              : "리뷰 작성"}
          </Typography>
          <TextField
            name="title"
            variant="outlined"
            label={lang === "en" ? "Title" : "제목"}
            fullWidth
            value={postData.title}
            onChange={(e) =>
              setPostData({ ...postData, title: e.target.value })
            }
            error={noTitleError}
            helperText={
              lang === "en"
                ? noTitleError
                  ? "Please fill out the title field"
                  : ""
                : noTitleError
                ? "리뷰의 제목을 작성해주세요."
                : ""
            }
          />
          <TextField
            name="message"
            variant="outlined"
            label={lang === "en" ? "Review" : "리뷰"}
            fullWidth
            value={postData.message}
            multiline
            minRows={5}
            onChange={(e) =>
              setPostData({ ...postData, message: e.target.value })
            }
            error={noMessageError}
            helperText={
              lang === "en"
                ? noMessageError
                  ? "Please fill out the review field"
                  : ""
                : noMessageError
                ? "리뷰를 작성해주세요."
                : ""
            }
          />

          <ComboBox
            postData={postData}
            setPostData={setPostData}
            lang={lang}
            tags={postData.tags}
            preOption={preOption}
            noTagError={noTagError}
          />
          <StyledDropzone
            picture={postData.selectedFile}
            postData={postData}
            setPostData={setPostData}
            lang={lang}
          />
          <Button
            className={classes.buttonSubmit}
            variant="contained"
            color="primary"
            size="large"
            type="submit"
            fullWidth
          >
            {lang === "en" ? "Submit" : "저장"}
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default NewReview;
