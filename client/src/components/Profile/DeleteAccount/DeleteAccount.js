import { useRef } from "react";
import emailjs from "@emailjs/browser";
import { Paper, Grid, Container } from "@material-ui/core";
import { Typography } from "@mui/material";
import useStyles from "./styles";
import DeleteIcon from "@mui/icons-material/Delete";
import { useSendEmailMutation } from "../../../slices/postsSlice";
import { useSendDeleteEmailMutation } from "../../../slices/postsSlice";
import CustomizedDialogs from "./DeleteEmailSend";
import { useState } from "react";
import { useParams } from "react-router-dom";
import SendIcon from "@mui/icons-material/Send";
import Button from "@mui/material/Button";
import Input from "./Input";
import CheckIcon from "@mui/icons-material/Check";
import { useSignInMutation } from "../../../slices/postsSlice";
import { useEffect } from "react";

const DeleteAccount = () => {
  const classes = useStyles();
  const profile = JSON.parse(localStorage.getItem("profile"));
  const email = profile.result.email;
  const creatorId = profile.result.id;
  const src = profile.result.src;

  console.log(src);

  const [sendDeleteEmail] = useSendDeleteEmailMutation();

  const initialState = {
    email: "",
    password: "",
    confirmPassword: "",
    name: "",
  };

  const [open, setOpen] = useState(false);
  const [passwordPass, setPasswordPass] = useState(false);
  const [formData, setFormData] = useState(initialState);
  const [showPassword1, setShowPassword1] = useState(false);
  const [passwordCheckError, setPasswordCheckError] = useState(false);
  const openFunction = () => {
    setOpen((prevState) => !prevState);
  };

  const handleShowPassword1 = () => {
    setShowPassword1((prevShowPassword) => !prevShowPassword);
  };
  const { lang } = useParams();

  useEffect(() => {
    if (src === "local") {
      setPasswordPass(false);
    } else {
      setPasswordPass(true);
    }
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const [signIn] = useSignInMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("first security check");
    const email = JSON.parse(localStorage.getItem("profile")).result.email;
    const checkInfo = { ...formData, email };
    const info = await signIn(checkInfo);
    if (info.error) {
      setPasswordCheckError(true);
      return console.log(info.error.data.message);
    }
    setPasswordPass(true);
    setPasswordCheckError(false);
  };

  return (
    <>
      <Container component="main" maxWidth="xs">
        <Paper className={classes.paper} elevation={0}>
          {!passwordPass && (
            <>
              <Typography
                variant="h5"
                sx={{ fontWeight: "bold", color: "error.main" }}
              >
                {lang === "en" ? "Security Check" : "비밀번호 확인"}
              </Typography>
              <Typography
                variant="subtitle2"
                align="center"
                sx={{ color: "gray", paddingTop: 4 }}
              >
                {lang === "en"
                  ? "You need to confirm your password before we delete your account"
                  : "계정을 삭제하기 전에 비밀번호 확인이 필요합니다."}
              </Typography>
              <form className={classes.form} onSubmit={handleSubmit}>
                <Grid container spacing={2}>
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
                </Grid>
              </form>
            </>
          )}
          {passwordPass && (
            <>
              <Typography
                variant="h5"
                sx={{ fontWeight: "bold", color: "error.main" }}
              >
                {lang === "en" ? "Delete your account" : "계정 삭제"}
              </Typography>

              <Typography
                variant="body1"
                align="center"
                style={{ paddingTop: 20 }}
              >
                {lang === "en"
                  ? "Deleting your account means you won't be able to get your reviews or comments back."
                  : "계정 삭제가 되면 계정과 관련된 리뷰와 댓글이 삭제되며 복구는 불가능합니다."}
              </Typography>

              {lang === "en" ? (
                <Typography
                  variant="body1"
                  align="center"
                  style={{ paddingTop: 10, paddingBottom: 20 }}
                >
                  if you're ready to delete your account, we'll send you an
                  email to <b>{email}</b> with the final step.
                </Typography>
              ) : (
                <Typography
                  variant="body1"
                  align="center"
                  style={{ paddingTop: 10, paddingBottom: 20 }}
                >
                  계정을 삭제하기로 결정하셨다면 <b>{email}</b>로 이메일을 보내
                  마지막 절차를 밟을 것입니다.
                </Typography>
              )}

              <Button
                variant="outlined"
                className={classes.button}
                startIcon={<SendIcon />}
                color="error"
                sx={{ borderRadius: 20 }}
                onClick={() => {
                  sendDeleteEmail({
                    email,
                    creatorId,
                    src,
                    lang,
                  });
                  openFunction();
                  if (src === "local") {
                    setPasswordPass(false);
                  } else {
                    setPasswordPass(true);
                  }
                }}
              >
                {lang === "en" ? "send email" : "이메일 발송"}
              </Button>
            </>
          )}
        </Paper>
      </Container>
      <CustomizedDialogs open={open} setOpen={setOpen} lang={lang} />
    </>
  );
};

export default DeleteAccount;
