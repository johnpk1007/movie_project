import { makeStyles } from "@material-ui/core/styles";
import { blue, deepPurple, lightBlue } from "@material-ui/core/colors";

export default makeStyles((theme) => ({
  appBar: {
    margin: "0 0 12px 0",
    display: "flex",
    padding: "0 10px",
    borderBottom: "1px solid #ededed",
    // alignItems: "center",
    // flexDirection: "column",
    // borderRadius: "5px",
    // justifyContent: "space-between",
    // padding: "10px 50px",
    // backgroundColor: "white",
    // height: 40,
    // border: 1,
    [theme.breakpoints.up("md")]: {
      padding: "0 100px",
    },
    [theme.breakpoints.up("lg")]: {
      padding: "0 15%",
    },
    [theme.breakpoints.up("xl")]: {
      padding: "0 20%",
    },
  },
  toolbar: {
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "row",
  },
  heading: {
    color: "rgba(0,183,255, 1)",
    textDecoration: "none",
  },
  image: {
    marginLeft: "15px",
  },
  profileWithoutUser: {
    // width: 150,
    minWidth: 150,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  profileWithUser: {
    width: 90,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  userName: {
    display: "flex",
    alignItems: "center",
  },
  brandContainer: {
    display: "flex",
    alignItems: "center",
    underline: "none",
    fontFamily: "Abril Fatface",
    fontSize: 30,
    color: "black",
  },
  purple: {
    // color: theme.palette.getContrastText(deepPurple[500]),
    backgroundColor: deepPurple[500],
  },
  button: {
    borderRadius: 20,
    minWidth: 100,
  },
  search: {
    position: "relative",
    borderRadius: 20,
    backgroundColor: "#f7f7f7",
    transition: "0.3s",
    "&:hover": {
      backgroundColor: "#fafafa",
    },
    marginRight: theme.spacing(1),
    marginLeft: 0,
    width: "auto",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "50%",
    },
  },
  searchIconWrapper: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    // pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    right: 0,
    top: 0,
  },
  styledInputBase: {
    width: "80%",
    color: "inherit",
    "& .MuiInputBase-input": {
      padding: theme.spacing(1, 1, 1, 0),
      paddingLeft: "20px",
      transition: theme.transitions.create("width"),
      // width: "100%",
      // paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      // width: "300px",
      // [theme.breakpoints.up("sm")]: {
      //   width: "20ch",
      // },
    },
  },
}));
