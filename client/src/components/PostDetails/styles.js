import { Hidden } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
// import { makeStyles } from "@mui/styles";

export default makeStyles((theme) => ({
  media: {
    borderRadius: "20px",
    objectFit: "cover",
    width: "100%",
    maxHeight: "600px",
  },
  // card: {
  //   display: "flex",
  //   width: "100%",
  //   [theme.breakpoints.down("xs")]: {
  //     flexWrap: "wrap",
  //     flexDirection: "column-reverse",
  //   },
  // },
  section: {
    borderRadius: "20px",
    margin: "10px",
    flex: 1,
  },
  imageSection: {
    marginLeft: "20px",
    [theme.breakpoints.down("sm")]: {
      marginLeft: 0,
    },
  },
  recommendedPosts: {
    display: "flex",
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
    },
  },

  recommendedPostMessage: {
    display: "-webkit-box",
    boxOrient: "vertical",
    lineClamp: 2,
    wordBreak: "break-all",
    overflow: "hidden",
    width: "200px",
  },
  loadingPaper: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "20px",
    borderRadius: "15px",
    height: "39vh",
  },
  // commentsOuterContainer: {
  //   display: "flex",
  //   flexDirection: "column",
  //   justifyContent: "center",
  // },
  // commentsInnerContainer: {
  //   // height: "100%",
  //   // overflow: "auto",
  //   // marginRight: "30px",
  // },
  commentsColumnContainer: {
    display: "flex",
    flexDirection: "column",
    height: "70%",
  },
  commentsBottomColumnContainer: {
    display: "flex",
    flexDirection: "column",
    // height: "30%",
  },
  message: {
    minWidth: "200px",
  },
  commentSectionButton: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  button: {
    borderRadius: 20,
  },
  titleMore: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  review: {
    display: "flex",
    flexDirection: "row",
  },
  titleContent: {
    display: "flex",
    flexDirection: "column",
  },
  title: {
    display: "flex",
    justifyContent: "center",
  },
  info: {
    display: "flex",
    justifyContent: "space-between",
    padding: "0 30px 0 30px",
  },
  extraInfo: {
    display: "flex",
    // direction: "column",
  },
  reviewImage: {
    display: "flex",
    direction: "row",
  },
  reviewComment: {
    display: "flex",
    flexDirection: "column",
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
    width: "100%",

    // [theme.breakpoints.up("sm")]: {
    //   marginLeft: theme.spacing(3),
    //   width: "50%",
    // },
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
  card: {
    display: "flex",
    justifyContent: "space-between",
    [theme.breakpoints.down("md")]: {
      flexDirection: "column-reverse",
    },
  },
}));
