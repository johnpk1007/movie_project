import { Navigate } from "react-router-dom";
import { useEffect } from "react";
import { useVerifyEmailMutation } from "../../slices/postsSlice";
import { useDispatch, useSelector } from "react-redux";
import { AUTH } from "../../slices/authSlice";
import { setLogin } from "../../slices/loginSlice";
import { useParams } from "react-router-dom";

const Verify = () => {
  const [verifyEmail] = useVerifyEmailMutation();
  const urlParameter = new URL(window.location.href);
  const creatorIdFromUrl = urlParameter.searchParams.get("creatorId");
  const dispatch = useDispatch();
  const loginChange = useSelector((state) => state.login.login);
  const asyncFunction = async () => {
    const info = await verifyEmail({ creatorId: creatorIdFromUrl });
    const { data } = info;
    dispatch(
      AUTH({
        result: data.result,
      })
    );
    dispatch(setLogin(true));
  };

  console.log(creatorIdFromUrl);
  useEffect(() => {
    asyncFunction();
  }, []);

  return loginChange ? <Navigate to="/" replace /> : null;
};

export default Verify;
