import { Button } from "@material-ui/core";
import { useRef } from "react";

import NaverIcon from "./NaverIcon";

const backend = process.env.REACT_APP_BACKEND_ADDRESS;
const url = backend + "/users/naversignin";

const NaverButton = ({ isSignup, lang, redirect }) => {
  const naverRef = useRef();

  const handleNaverLogin = () => {
    localStorage.setItem("redirectUrl", redirect);
    naverRef.current.click();
  };

  return (
    <>
      <a href={url} ref={naverRef} style={{ display: "none" }}>
        naver login
      </a>

      <Button
        fullWidth
        variant="contained"
        onClick={handleNaverLogin}
        startIcon={<NaverIcon />}
        style={{
          backgroundColor: "#03C75A",
          // color: "white",
          color: { xs: "red", sm: "blue" },
          height: 36.5,
          marginBottom: 10,
          fontSize: lang === "en" ? "13px" : "13px",
          paddingLeft: 0,
          paddingRight: 0,
        }}
      >
        {lang === "en"
          ? isSignup
            ? "Naver Sign Up"
            : "Naver Log In"
          : isSignup
          ? "네이버 회원가입"
          : "네이버 로그인"}
      </Button>
    </>
  );
};

export default NaverButton;
