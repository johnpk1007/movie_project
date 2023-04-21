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

const Form = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const [updatePost] = useUpdatePostMutation();
  const [createPosts, createResult] = useCreatePostsMutation();
  const [postData, setPostData] = useState({
    title: "",
    message: "",
    tags: "",
    selectedFile: "",
  });

  const id = useSelector((state) => state.postUpdate.id);
  const loginChange = useSelector((state) => state.login.login);
  const { data: post } = useGetPostQuery({ id }, { skip: !id });
  useEffect(() => {
    if (id && post) setPostData(post);
  }, [id, post]);

  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("profile")));
  }, [location, loginChange]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (id) {
      updatePost({ id, ...postData, name: user?.result?.name });
      clear();
    } else {
      createPosts({ ...postData, name: user?.result?.name });
      clear();
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

  if (createResult.isUninitialized === false && createResult.isSuccess) {
    navigate(`/posts/${createResult.data._id}`);
  }

  if (!user?.result?.name && !user?.name) {
    return (
      <Paper elevation={6} className={classes.paper}>
        <Typography variant="h6" align="center">
          Please Sign In to create your own movie reviews
        </Typography>
      </Paper>
    );
  }

  return (
    <Paper elevation={6} className={classes.paper}>
      <form
        autoComplete="off"
        noValidate
        className={`${classes.root} ${classes.form}`}
        onSubmit={(e) => handleSubmit(e)}
      >
        <Typography variant="h6">
          {id ? "Editing" : "Creating"} a Movie Review
        </Typography>
        <TextField
          name="title"
          variant="outlined"
          label="Title"
          fullWidth
          value={postData.title}
          onChange={(e) => setPostData({ ...postData, title: e.target.value })}
        />
        <TextField
          name="message"
          variant="outlined"
          label="Review"
          fullWidth
          value={postData.message}
          onChange={(e) =>
            setPostData({ ...postData, message: e.target.value })
          }
        />
        <TextField
          name="tags"
          variant="outlined"
          label="Tags"
          fullWidth
          value={postData.tags}
          onChange={(e) =>
            setPostData({ ...postData, tags: e.target.value.split(",") })
          }
        />
        <div className={classes.fileInput}>
          <FileBase
            type="file"
            multiple={false}
            onDone={({ base64 }) =>
              setPostData({ ...postData, selectedFile: base64 })
            }
          />
        </div>
        <Button
          className={classes.buttonSubmit}
          variant="contained"
          color="primary"
          size="large"
          type="submit"
          fullWidth
        >
          Submit
        </Button>
      </form>
    </Paper>
  );
};

export default Form;
