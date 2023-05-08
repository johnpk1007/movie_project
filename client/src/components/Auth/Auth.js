import { Paper, Grid, Container, CircularProgress } from "@material-ui/core";
import { Button, Avatar, Typography, Divider } from "@mui/material";
import useStyles from "./styles";
import Input from "./Input";
import { useState } from "react";
import { googleLogout, GoogleOAuthProvider } from "@react-oauth/google";
import GoogleButton from "./GoogleButton";
import { useDispatch, useSelector } from "react-redux";
import { useSignUpMutation, useSignInMutation } from "../../slices/postsSlice";
import { useNavigate, useLocation } from "react-router-dom";
import { AUTH } from "../../slices/authSlice";
import { setLogin } from "../../slices/loginSlice";
import NaverButton from "./NaverButton";
import CustomizedDialogs from "./SignUpEmailSend";
import { useParams } from "react-router-dom";
import LoginIcon from "@mui/icons-material/Login";

const id = process.env.REACT_APP_CLIENT_KEY;

const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const Auth = () => {
  const classes = useStyles();
  const [isSignup, setIsSignup] = useState(false);
  const [showPassword1, setShowPassword1] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const [formData, setFormData] = useState(initialState);
  const [open, setOpen] = useState(false);
  const [idPasswordError1, setIdPasswordError1] = useState(false);
  const [idPasswordError2, setIdPasswordError2] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [noUserError, setNoUserError] = useState(false);
  const [noEmailVerifyError, setNoEmailVerifyError] = useState(false);
  const [passwordError1, setPasswordError1] = useState(false);
  const [passwordError2, setPasswordError2] = useState(false);

  const [signUp] = useSignUpMutation();
  const [signIn, signInResult] = useSignInMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { lang } = useParams();

  const url = new URL(window.location.href);
  const redirect = url.searchParams.get("redirect");
  console.log("redirect:", redirect);

  const openFunction = () => {
    setOpen((prevState) => !prevState);
  };

  const handleShowPassword1 = () => {
    setShowPassword1((prevShowPassword) => !prevShowPassword);
  };

  const handleShowPassword2 = () => {
    setShowPassword2((prevShowPassword) => !prevShowPassword);
  };

  console.log("signInResult:", signInResult);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSignup) {
      const info = await signUp({ ...formData, lang: lang });

      if (info.error) {
        if (info.error.data.message === "Password don't match") {
          setPasswordError1(true);
          setPasswordError2(true);
          return console.log(info.error.data.message);
        } else {
          setPasswordError1(false);
          setPasswordError2(false);
        }
        if (info.error.data.message === "User already exists") {
          setEmailError(true);
          return console.log(info.error.data.message);
        } else {
          setEmailError(false);
        }
      }
      setFormData(initialState);
      setIsSignup(false);
      setPasswordError1(false);
      setPasswordError2(false);
      setEmailError(false);
      openFunction();
    } else {
      const info = await signIn(formData);
      if (info.error) {
        if (info.error.data.message === "User doesn't exist") {
          setNoUserError(true);
          return console.log(info.error.data.message);
        } else {
          setNoUserError(false);
        }
        if (info.error.data.message === "Wrong password") {
          setIdPasswordError1(true);
          setIdPasswordError2(true);
          return console.log("login error");
        } else {
          setIdPasswordError1(false);
          setIdPasswordError2(false);
        }
        if (info.error.data.message === "email hasn't varified") {
          setNoEmailVerifyError(true);
        } else {
          setNoEmailVerifyError(false);
        }
      }
      const { data } = info;
      dispatch(
        AUTH({
          result: data.result,
        })
      );
      dispatch(setLogin(true));
      navigate(redirect);
    }
  };
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const switchMode = () => {
    setIsSignup((prevIsSignup) => !prevIsSignup);
    setShowPassword1(false);
    setShowPassword2(false);
    setIdPasswordError1(false);
    setIdPasswordError2(false);
    setEmailError(false);
    setPasswordError1(false);
    setPasswordError2(false);
    setNoEmailVerifyError(false);
    setNoUserError(false);
  };
  if (signInResult.isLoading === false) {
    return (
      <>
        <Container component="main" maxWidth="xs">
          <Paper className={classes.paper} elevation={1}>
            <Typography
              variant="h5"
              sx={{ fontWeight: "bold", paddingTop: 3 }}
              color="primary"
            >
              {lang === "en"
                ? isSignup
                  ? "Sign Up"
                  : "Log In"
                : isSignup
                ? "회원가입"
                : "로그인"}
            </Typography>

            <form className={classes.form} onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                {isSignup && (
                  <>
                    <Input
                      name="firstName"
                      label={lang === "en" ? "First Name" : " 이름"}
                      handleChange={handleChange}
                      autoFocus
                      half
                      value={formData.firstName}
                    />
                    <Input
                      name="lastName"
                      label={lang === "en" ? "Last Name" : "성"}
                      handleChange={handleChange}
                      half
                      value={formData.lastName}
                    />
                  </>
                )}
                <Input
                  name="email"
                  label={lang === "en" ? "Email Address" : "이메일 주소"}
                  handleChange={handleChange}
                  type="email"
                  value={formData.email}
                  idPasswordError1={idPasswordError1}
                  emailError={emailError}
                  noUserError={noUserError}
                  noEmailVerifyError={noEmailVerifyError}
                />
                <Input
                  name="password"
                  label={lang === "en" ? "Password" : "비밀번호"}
                  handleChange={handleChange}
                  type={showPassword1 ? "text" : "password"}
                  handleShowPassword={handleShowPassword1}
                  value={formData.password}
                  idPasswordError2={idPasswordError2}
                  passwordError1={passwordError1}
                  lang={lang}
                />
                {isSignup && (
                  <Input
                    name="confirmPassword"
                    label={lang === "en" ? "Repeat Password" : "비밀번호 확인"}
                    handleChange={handleChange}
                    type={showPassword2 ? "text" : "password"}
                    value={formData.confirmPassword}
                    handleShowPassword={handleShowPassword2}
                    passwordError2={passwordError2}
                  />
                )}
                <Grid item xs={12}>
                  <Button
                    type="submit"
                    fullWidth
                    variant="outlined"
                    color="primary"
                    className={classes.submit}
                    startIcon={<LoginIcon />}
                  >
                    {lang === "en"
                      ? isSignup
                        ? "Sign Up"
                        : "Log In"
                      : isSignup
                      ? "회원가입"
                      : "로그인"}
                  </Button>
                </Grid>
                <Grid item xs={12}>
                  <Divider>
                    <Typography color="lightgray">
                      {lang === "en" ? "Or" : "또는"}
                    </Typography>
                  </Divider>
                </Grid>

                <Grid item xs={6}>
                  <GoogleOAuthProvider clientId={id}>
                    <GoogleButton
                      isSignup={isSignup}
                      lang={lang}
                      redirect={redirect}
                    />
                  </GoogleOAuthProvider>
                </Grid>
                <Grid item xs={6}>
                  <NaverButton
                    isSignup={isSignup}
                    lang={lang}
                    redirect={redirect}
                  />
                </Grid>
              </Grid>

              <Grid container justifyContent="center">
                <Grid item>
                  <Button onClick={switchMode} sx={{ fontSize: 13 }}>
                    {lang === "en"
                      ? isSignup
                        ? "Already have an account? Log In!"
                        : "Don't have an account? Sign Up!"
                      : isSignup
                      ? "이미 회원가입하셨나요? 로그인 하세요. "
                      : "아직 회원가입하지 않으셨나요? 지금 가입하세요"}
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Paper>
        </Container>
        <CustomizedDialogs open={open} setOpen={setOpen} lang={lang} />
      </>
    );
  } else {
    return (
      <>
        <Container component="main" maxWidth="xs">
          <Paper className={classes.paper} elevation={1}>
            <Typography
              variant="h5"
              sx={{ fontWeight: "bold", paddingTop: 3 }}
              color="primary"
            >
              {lang === "en"
                ? isSignup
                  ? "Sign Up"
                  : "We are loggin in..."
                : isSignup
                ? "회원가입"
                : "로그인 중입니다..."}
            </Typography>
            <Paper elevation={0} className={classes.loadingPaper}>
              <CircularProgress size="7em" />
            </Paper>
          </Paper>
        </Container>
        <CustomizedDialogs open={open} setOpen={setOpen} lang={lang} />
      </>
    );
  }
};

export default Auth;
