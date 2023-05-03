import { Navigate, useNavigate } from "react-router-dom";
import { useEffect } from "react";
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

  const [logoutTrigger, logoutResult] = apiSlice.useLazyLogoutQuery();

  const dispatch = useDispatch();

  const logout = () => {
    logoutTrigger();
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
      // logout();
    }
  }, [creatorIdFromUrl]);
  useEffect(() => {
    if (deleteAccountResult.isSuccess) {
      logout();
    }
  }, [deleteAccountResult]);

  useEffect(() => {
    console.log("logoutResult:", logoutResult);
    if (logoutResult.isSuccess) {
      navigate("/");
    }
  }, [logoutResult]);
};

export default DeleteDone;
