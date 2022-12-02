import { useGoogleLogin } from "@react-oauth/google";
import { Button } from "@material-ui/core";
import Icon from "./icon";
import useStyles from "./styles";
import { useDispatch, useSelector } from "react-redux";
import { AUTH } from "../../slices/authSlice";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
import { setLogin } from "../../slices/loginSlice";

// const url = "https://console.firebase.google.com/project/test-backend-13e73/overview";
const url = "http://localhost:5000";

const GoogleButton = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loginChange = useSelector((state) => state.login.login);
  const googleSuccess = async (codeResponse) => {
    const tokens = await axios.post(`${url}/auth/google`, {
      code: codeResponse.code,
    });

    const userInfo = jwt_decode(tokens.data.id_token);

    try {
      dispatch(AUTH({ result: userInfo, token: tokens.data.id_token }));
      dispatch(setLogin(!loginChange));

      navigate(-1);
      console.log("google login success");
    } catch (error) {
      console.log(error);
    }
  };

  const googleFailure = (err) => {
    console.log(err);
  };
  const login = useGoogleLogin({
    flow: "auth-code",
    onSuccess: (res) => googleSuccess(res),
    onError: (err) => googleFailure(err),
  });
  const classes = useStyles();

  return (
    <Button
      onClick={() => login()}
      className={classes.googleButton}
      color="primary"
      fullWidth
      startIcon={<Icon />}
      variant="contained"
    >
      GOOGLE SIGN IN
    </Button>
  );
};

export default GoogleButton;
