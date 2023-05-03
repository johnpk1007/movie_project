import { Navigate } from "react-router-dom";
import { useEffect } from "react";
import { useDeleteAccountMutation } from "../../slices/postsSlice";
import { useDispatch, useSelector } from "react-redux";
import { LOGOUT } from "../../slices/authSlice";
import { setLogin } from "../../slices/loginSlice";
import { apiSlice } from "../../slices/postsSlice";

const DeleteDone = () => {
  const urlParameter = new URL(window.location.href);
  const creatorIdFromUrl = urlParameter.searchParams.get("creatorId");
  const src = urlParameter.searchParams.get("src");

  const [logoutTrigger] = apiSlice.useLazyLogoutQuery();

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

  return <Navigate to="/" replace />;
};

export default DeleteDone;
