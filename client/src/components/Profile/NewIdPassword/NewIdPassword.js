import { Avatar, Paper, Grid, Container } from "@material-ui/core";
import { Button, Typography } from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import useStyles from "./styles";
import Input from "./Input";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  useSignInMutation,
  useSignUpMutation,
  usePasswordChangeMutation,
} from "../../../slices/postsSlice";
import { useNavigate, useLocation } from "react-router-dom";
import { AUTH } from "../../../slices/authSlice";
import { setLogin } from "../../../slices/loginSlice";
import CustomizedDialogs from "./ChangeSuccess";
import { useRef } from "react";
import LockResetIcon from "@mui/icons-material/LockReset";
import CheckIcon from "@mui/icons-material/Check";
import { useParams } from "react-router-dom";
import PublishedWithChangesIcon from "@mui/icons-material/PublishedWithChanges";

const initialState = {
  email: "",
  password: "",
  confirmPassword: "",
  name: "",
};

const NewIdPassword = () => {
  const classes = useStyles();
  const [isSignup, setIsSignup] = useState(false);
  const [showPassword1, setShowPassword1] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const [formData, setFormData] = useState(initialState);
  const [open, setOpen] = useState(false);

  const [signUp] = useSignUpMutation();
  const [signIn] = useSignInMutation();
  const [passwordChange] = usePasswordChangeMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loginChange = useSelector((state) => state.login.login);

  const switchMode = () => {
    setIsSignup((prevIsSignup) => !prevIsSignup);
  };

  const openFunction = () => {
    setOpen((prevState) => !prevState);
  };

  const handleShowPassword1 = () => {
    setShowPassword1((prevShowPassword) => !prevShowPassword);
  };
  const handleShowPassword2 = () => {
    setShowPassword2((prevShowPassword) => !prevShowPassword);
  };

  const [passwordCheckError, setPasswordCheckError] = useState(false);
  const [passwordChangeError1, setPasswordChangeError1] = useState(false);
  const [passwordChangeError2, setPasswordChangeError2] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSignup) {
      console.log("password change");
      const email = JSON.parse(localStorage.getItem("profile")).result.email;
      const name = JSON.parse(localStorage.getItem("profile")).result.name;
      console.log("formdata after update", formData);
      const changePassword = { ...formData, email, name };

      const info = await passwordChange(changePassword);
      if (info.error) {
        setPasswordChangeError1(true);
        setPasswordChangeError2(true);
        return console.log(info.error.data.message);
      }

      console.log(info.data);
      dispatch(AUTH(info.data));
      setPasswordChangeError1(false);
      setPasswordChangeError2(false);
      switchMode();
      openFunction();
    } else {
      console.log("first security check");
      const email = JSON.parse(localStorage.getItem("profile")).result.email;
      const checkInfo = { ...formData, email };
      const info = await signIn(checkInfo);
      if (info.error) {
        setPasswordCheckError(true);
        return console.log(info.error.data.message);
      }
      switchMode();
      setPasswordCheckError(false);
    }
  };
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const { lang } = useParams();

  return (
    <Container component="main" maxWidth="xs">
      <Paper className={classes.paper} elevation={0}>
        <Typography
          variant="h5"
          sx={{ fontWeight: "bold", color: "primary.main" }}
        >
          {lang === "en"
            ? isSignup
              ? "Change Password"
              : "Security Check"
            : isSignup
            ? "비밀번호 변경"
            : "비밀번호 확인"}
        </Typography>
        <Typography
          align="center"
          variant="subtitle2"
          sx={{ color: "gray", paddingTop: 4 }}
        >
          {lang === "en"
            ? "You need to confirm your password before we change your password"
            : "비밀번호를 변경하기 전에 비밀번호 확인이 필요합니다."}
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {!isSignup && (
              <>
                <Input
                  name="password"
                  label={lang === "en" ? "Password" : "비밀번호"}
                  handleChange={handleChange}
                  type={showPassword1 ? "text" : "password"}
                  handleShowPassword={handleShowPassword1}
                  passwordCheckError={passwordCheckError}
                  lang={lang}
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="outlined"
                  color="primary"
                  className={classes.submit}
                  startIcon={<CheckIcon />}
                  sx={{ marginTop: 2 }}
                >
                  {lang === "en" ? "CHECK" : "확인"}
                </Button>
                <CustomizedDialogs open={open} setOpen={setOpen} lang={lang} />
              </>
            )}

            {isSignup && (
              <>
                <Input
                  name="password"
                  label={lang === "en" ? "Password" : "비밀번호"}
                  handleChange={handleChange}
                  type={showPassword1 ? "text" : "password"}
                  handleShowPassword={handleShowPassword1}
                  passwordChangeError1={passwordChangeError1}
                />
                <Input
                  name="confirmPassword"
                  label={lang === "en" ? "Confirm Password" : "비밀번호 확인"}
                  handleChange={handleChange}
                  type={showPassword2 ? "text" : "password"}
                  handleShowPassword={handleShowPassword2}
                  passwordChangeError2={passwordChangeError2}
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="outlined"
                  color="primary"
                  className={classes.submit}
                  sx={{ marginTop: 2 }}
                  startIcon={<PublishedWithChangesIcon />}
                >
                  {lang === "en" ? "Update" : "업데이트"}
                </Button>
              </>
            )}
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default NewIdPassword;
