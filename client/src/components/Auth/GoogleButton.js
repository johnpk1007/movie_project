import { Button } from "@material-ui/core";
import Icon from "./icon";
import useStyles from "./styles";
import { useRef } from "react";

const backend = process.env.REACT_APP_BACKEND_ADDRESS;
const url = backend + "/users/googlesignin";
console.log("backend:", backend);
console.log("url:", url);

const GoogleButton = ({ isSignup, lang, redirect }) => {
  const classes = useStyles();
  const googleRef = useRef();

  const handleGoogleLogin = () => {
    localStorage.setItem("redirectUrl", redirect);
    googleRef.current.click();
  };

  return (
    <>
      <a href={url} ref={googleRef} style={{ display: "none" }}>
        google login
      </a>
      <Button
        onClick={() => handleGoogleLogin()}
        className={classes.googleButton}
        style={{
          backgroundColor: "#4285f4",
          color: "white",
          height: 36.5,
          fontSize: lang === "en" ? "12px" : "13px",
          paddingRight: 0,
          paddingLeft: 0,
        }}
        fullWidth
        startIcon={<Icon />}
        variant="contained"
      >
        {lang === "en"
          ? isSignup
            ? "Google Sign Up"
            : "Google Log In"
          : isSignup
          ? "구글 회원가입"
          : "구글 로그인"}
      </Button>
    </>
  );
};

export default GoogleButton;
