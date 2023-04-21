import { Container } from "@material-ui/core";
import Navbar from "./components/Navbar/Navbar";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./components/Home/Home";
import Auth from "./components/Auth/Auth";
import PostDetails from "./components/PostDetails/PostDetails";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import NewReview from "./components/NewReview/NewReview";
import Profile from "./components/Profile/Profile";
import { Outlet } from "react-router-dom";
import NewIdPassword from "./components/Profile/NewIdPassword/NewIdPassword";
import DeleteDone from "./components/DeleteDone/DeleteDone";
import Verify from "./components/Verify/Verify";
import Search from "./components/Search/Search";
import SocialLoginLoading from "./components/SocialLoginLoading/SocialLoginLoading";

function WithoutNav() {
  return (
    <>
      <Outlet />
    </>
  );
}

function WithNav() {
  return (
    <>
      <CssBaseline />
      <Navbar />
      <Outlet />
    </>
  );
}

function App() {
  const login = useSelector((state) => state.login.login);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const [naverLogin, setNaverLogin] = useState(
    localStorage.getItem("NaverLogin")
  );

  const language = window.navigator.language;
  const languageInfo = language === "ko-KR" ? "ko" : "en";

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("profile")));
  }, [login]);
  useEffect(() => {
    setNaverLogin(localStorage.getItem("NaverLogin"));
  }, []);

  return (
    <BrowserRouter>
      <Container maxWidth="xl">
        <Routes>
          <Route element={<WithNav />}>
            <Route
              path="/"
              element={<Navigate replace to={languageInfo + "/posts"} />}
            />
            <Route path=":lang/posts" element={<Home />} />
            <Route path=":lang/posts/search" element={<Search />} />
            <Route path=":lang/posts/:id" element={<PostDetails />} />
            <Route
              path=":lang/newreview/:id"
              element={
                user === null ? (
                  <Navigate replace to={"/" + languageInfo + "/posts"} />
                ) : (
                  <NewReview />
                )
              }
            />
            <Route
              path=":lang/newreview"
              element={
                user === null ? (
                  <Navigate replace to={"/" + languageInfo + "/posts"} />
                ) : (
                  <NewReview />
                )
              }
            />
            <Route
              path=":lang/profile"
              element={
                user === null ? (
                  <Navigate replace to={"/" + languageInfo + "/posts"} />
                ) : (
                  <Profile />
                )
              }
            />
            <Route
              path=":lang/auth"
              element={
                user === null ? (
                  <Auth />
                ) : (
                  <Navigate replace to={"/" + languageInfo + "/posts"} />
                )
              }
            />
          </Route>
          <Route element={<WithoutNav />}>
            <Route path="/newidpassword" element={<NewIdPassword />} />
            <Route path="/deletedone" element={<DeleteDone />} />
            <Route path="/verify" element={<Verify />} />
            <Route
              path="*"
              element={<Navigate replace to={"/" + languageInfo + "/posts"} />}
            />

            <Route
              path="/socialloginloading"
              element={<SocialLoginLoading />}
            />
          </Route>
        </Routes>
      </Container>
    </BrowserRouter>
  );
}

export default App;
