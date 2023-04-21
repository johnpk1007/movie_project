import { useDispatch } from "react-redux";
import { AUTH } from "../../slices/authSlice";
import { setLogin } from "../../slices/loginSlice";
import { useNavigate } from "react-router-dom";

const SocialLoginLoading = () => {
  const urlParameter = new URL(window.location.href);
  const name = urlParameter.searchParams.get("name");
  const id = urlParameter.searchParams.get("id");
  const src = urlParameter.searchParams.get("src");
  const email = urlParameter.searchParams.get("email");

  const redirectUrl = localStorage.getItem("redirectUrl");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  console.log("name:", name);
  console.log("id:", id);
  console.log("redirect:", redirectUrl);

  dispatch(
    AUTH({
      result: {
        name: name,
        id: id,
        src: src,
        email: email,
      },
    })
  );
  dispatch(setLogin(true));
  navigate(redirectUrl);
  return (
    <>
      {/* <div>name: `{name}`</div>
      <div>id: `{id}`</div> */}
    </>
  );
};

export default SocialLoginLoading;
