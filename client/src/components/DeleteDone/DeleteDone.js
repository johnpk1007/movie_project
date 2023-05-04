import { Navigate, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDeleteAccountMutation } from "../../slices/postsSlice";
import { useDispatch, useSelector } from "react-redux";
import { LOGOUT } from "../../slices/authSlice";
import { setLogin } from "../../slices/loginSlice";
import { apiSlice } from "../../slices/postsSlice";

const DeleteDone = () => {
  const navigate = useNavigate();
  const urlParameter = new URL(window.location.href);
  const creatorIdFromUrl = urlParameter.searchParams.get("creatorId");
  const src = urlParameter.searchParams.get("src");
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));

  const [logoutTrigger, logoutResult] = apiSlice.useLazyLogoutQuery();

  const dispatch = useDispatch();

  const userId = user?.result?.id;
  const login = useSelector((state) => state.login.login);

  const logout = () => {
    logoutTrigger({ userId });
    dispatch(LOGOUT());
    dispatch(setLogin(false));
  };

  const [deleteAccount, deleteAccountResult] = useDeleteAccountMutation();

  useEffect(() => {
    if (creatorIdFromUrl) {
      deleteAccount({
        creatorId: creatorIdFromUrl,
        src: src,
      });
    }
  }, [creatorIdFromUrl]);
  useEffect(() => {
    console.log("deleteAccountResult:", deleteAccountResult);
    if (deleteAccountResult.isSuccess && login) {
      logout();
    }
  }, [deleteAccountResult]);

  useEffect(() => {
    console.log("logoutResult:", logoutResult);
    if (logoutResult.isSuccess) {
      navigate("/");
    }
  }, [logoutResult]);

  useEffect(() => {
    console.log("deleteAccountResult:", deleteAccountResult);
    if (deleteAccountResult.isSuccess && !login) {
      navigate("/");
    }
  }, [deleteAccountResult]);
};

export default DeleteDone;
