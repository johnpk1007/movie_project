import { AppBar, Toolbar } from "@material-ui/core";
import { createTheme, ThemeProvider } from "@mui/material";
import Avatar from "@mui/material/Avatar";

import { Link } from "react-router-dom";
import useStyles from "./styles";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { LOGOUT } from "../../slices/authSlice";

import { setLogin } from "../../slices/loginSlice";
import TheatersIcon from "@mui/icons-material/Theaters";
import { postShare } from "../../slices/postShare";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import {
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import AccountBoxOutlinedIcon from "@mui/icons-material/AccountBoxOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import CreateOutlinedIcon from "@mui/icons-material/CreateOutlined";
import Divider from "@mui/material/Divider";
import { useParams } from "react-router-dom";
import LanguageIcon from "@mui/icons-material/Language";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import LoginIcon from "@mui/icons-material/Login";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { apiSlice } from "../../slices/postsSlice";

import reviewIcon5 from "../../images/reviewIcon5.png";

const Navbar = () => {
  const classes = useStyles();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const theme = createTheme({
    // typography: {
    //   fontFamily: ["Abril Fatface", "cursive"].join(","),
    // },
    // typography: {
    //   fontFamily: ["Josefin Sans", "sans-serif"].join(","),
    //   fontWeightRegular: 400,
    //   fontWeightLight: 300,
    // },
    typography: {
      fontFamily: ["Oswald", "sans-serif"].join(","),
      fontWeightMedium: 500,
      fontWeightRegular: 400,
      fontWeightLight: 300,
    },
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const loginChange = useSelector((state) => state.login.login);
  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("profile")));
  }, [loginChange]);

  const [search, setSearch] = useState("");
  const [tags, setTags] = useState([]);

  const { lang, id } = useParams();

  const [anchorEl, setAnchorEl] = useState(null);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);

  const [logoutTrigger, logoutResult] = apiSlice.useLazyLogoutQuery();

  const logout = () => {
    logoutTrigger();
    dispatch(LOGOUT());
    dispatch(setLogin(false));
    handleClose();
    if (id) {
      navigate(`/${lang}/posts/${id}`);
    } else {
      navigate(`/${lang}/posts`);
    }
  };

  const searchPost = () => {
    if (search || tags.length) {
      try {
        navigate(
          `${lang}/posts/search?searchQuery=${search || ""}&tags=${tags}`
        );
      } catch (error) {
        console.log(error);
      }
    } else if (!search && !tags.length) {
      console.log("nothing to search!");
    } else {
      console.log("something is wrong");
    }
  };

  const handleKeyPress = (e) => {
    if (e.keyCode === 13) {
      searchPost();
      setSearch("");
    }
  };

  const [alignment, setAlignment] = useState(null);
  useEffect(() => {
    setAlignment(lang);
  }, [lang]);

  const handleChange = (event, newAlignment) => {
    console.log("newAlignment:", newAlignment);
    setAlignment(newAlignment);
  };

  const url = location.pathname + location.search;

  const prevUrl = location.pathname;

  const loginUrl = `${lang}/auth?redirect=${prevUrl}`;

  const languageChange = () => {
    if (lang === "en") {
      navigate(url.replace("en", "ko"));
    } else {
      navigate(url.replace("ko", "en"));
    }
  };

  return (
    <AppBar
      className={classes.appBar}
      position="static"
      color="inherit"
      elevation={0}
    >
      <Toolbar className={classes.toolbar}>
        <ThemeProvider theme={theme}>
          <Link
            to={"/" + lang + "/posts"}
            className={classes.brandContainer}
            style={{ textDecoration: "none" }}
            onClick={() => {
              dispatch(postShare());
            }}
          >
            <img
              src={reviewIcon5}
              alt="typing"
              height="30px"
              // className={classes.img}
            />
            <Typography fontWeight="fontWeightLight" sx={{ fontSize: 30 }}>
              FilmView
            </Typography>
          </Link>
        </ThemeProvider>

        <div className={classes.search}>
          <InputBase
            className={classes.styledInputBase}
            placeholder={lang === "en" ? "Search" : "검색"}
            inputProps={{ "aria-label": "search" }}
            onKeyDown={handleKeyPress}
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
            }}
          />
          <div className={classes.searchIconWrapper}>
            <IconButton
              onClick={() => {
                searchPost();
                setSearch("");
              }}
            >
              <SearchIcon />
            </IconButton>
          </div>
        </div>

        <div>
          {user ? (
            <Avatar
              sx={{ bgcolor: "#1976D2" }}
              alt={user?.result?.name || user?.name}
              src={user?.result?.imageUrl || user?.imageUrl}
              aria-controls={open ? "basic-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={(e) => {
                handleClick(e);
              }}
            >
              <Button style={{ color: "white" }}>
                {user?.result?.name.charAt(0) || user?.name.charAt(0)}
              </Button>
            </Avatar>
          ) : (
            <IconButton
              color="primary"
              bgcolor="white"
              onClick={(e) => {
                handleClick(e);
              }}
            >
              <AccountCircleIcon sx={{ width: 50, height: 50 }} />
            </IconButton>
          )}

          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
            anchorOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            elevation={1}
          >
            {user ? (
              <div>
                <MenuItem
                  component={Link}
                  to={lang + "/newreview"}
                  onClick={handleClose}
                >
                  <ListItemIcon>
                    <CreateOutlinedIcon />
                  </ListItemIcon>
                  <ListItemText>
                    {lang === "en" ? "Write new review" : "새로운 리뷰 작성"}
                  </ListItemText>
                </MenuItem>
                <MenuItem
                  component={Link}
                  to={lang + "/profile"}
                  onClick={handleClose}
                >
                  <ListItemIcon>
                    <AccountBoxOutlinedIcon />
                  </ListItemIcon>
                  <ListItemText>
                    {lang === "en" ? "My account" : "내 계정"}
                  </ListItemText>
                </MenuItem>
                <Divider />
              </div>
            ) : null}
            <MenuItem>
              <ListItemIcon>
                <LanguageIcon />
              </ListItemIcon>
              <ToggleButtonGroup
                value={alignment}
                exclusive
                onChange={handleChange}
                aria-label="Platform"
                size="small"
              >
                <ToggleButton
                  value="en"
                  onClick={() => {
                    languageChange();
                  }}
                >
                  English
                </ToggleButton>
                <ToggleButton
                  value="ko"
                  onClick={() => {
                    languageChange();
                  }}
                >
                  한국어
                </ToggleButton>
              </ToggleButtonGroup>
            </MenuItem>
            <Divider />
            {user ? (
              <MenuItem onClick={logout}>
                <ListItemIcon>
                  <LogoutOutlinedIcon />
                </ListItemIcon>
                <ListItemText>
                  {lang === "en" ? "Logout" : "로그아웃"}
                </ListItemText>
              </MenuItem>
            ) : (
              <MenuItem
                onClick={() => {
                  handleClose();
                  navigate(loginUrl);
                }}
              >
                <ListItemIcon>
                  <LoginIcon />
                </ListItemIcon>
                <ListItemText>
                  {lang === "en" ? "Login" : "로그인"}
                </ListItemText>
              </MenuItem>
            )}
          </Menu>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
