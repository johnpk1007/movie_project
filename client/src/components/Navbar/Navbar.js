import {
  AppBar,
  Avatar,
  Button,
  Toolbar,
  Typography,
  createTheme,
  ThemeProvider,
} from "@material-ui/core";

import { Link } from "react-router-dom";
import useStyles from "./styles";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { LOGOUT } from "../../slices/authSlice";
import decode from "jwt-decode";
import { setLogin } from "../../slices/loginSlice";
import TheatersIcon from "@mui/icons-material/Theaters";

const Navbar = () => {
  const classes = useStyles();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const theme = createTheme({
    typography: {
      fontFamily: ["Abril Fatface", "cursive"].join(","),
    },
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const loginChange = useSelector((state) => state.login.login);
  const id = location.pathname.split("/")[2];

  const logout = () => {
    dispatch(LOGOUT());
    dispatch(setLogin(!loginChange));
    setUser(null);
    if (id) navigate(`/posts/${id}`);
    else navigate("/");
  };

  useEffect(() => {
    const token = user?.token;
    if (token) {
      const decodedToken = decode(token);
      if (decodedToken.exp * 1000 < new Date().getTime()) logout();
    }

    setUser(JSON.parse(localStorage.getItem("profile")));
  }, [location]);

  return (
    <AppBar
      className={classes.appBar}
      position="static"
      color="inherit"
      elevation={0}
    >
      <ThemeProvider theme={theme}>
        <Link
          to="/"
          className={classes.brandContainer}
          style={{ textDecoration: "none" }}
        >
          Movies
          <TheatersIcon fontSize="inherit" />
        </Link>
      </ThemeProvider>
      <Toolbar className={classes.toolbar}>
        {/* {login ? ( */}
        {user ? (
          <div className={classes.profile}>
            <Avatar
              className={classes.purple}
              alt={user?.result?.name || user?.name}
              src={user?.result?.imageUrl || user?.imageUrl}
            >
              {user?.result?.name.charAt(0) || user?.name.charAt(0)}
            </Avatar>
            <Typography className={classes.userName} variant="h6">
              {user?.result?.name || user?.name}
            </Typography>
            <Button
              variant="contained"
              color="secondary"
              onClick={logout}
              size="small"
            >
              Logout
            </Button>
          </div>
        ) : (
          <Button
            component={Link}
            to="/auth"
            variant="contained"
            color="primary"
          >
            Sign In
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
