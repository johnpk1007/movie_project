import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  media: {
    height: 200,
    // paddingTop: "56.25%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    backgroundBlendMode: "darken",
    // [theme.breakpoints.up("md")]: {
    //   height: 250,
    // },
    // [theme.breakpoints.up(700)]: {
    //   height: 350,
    // },
    // [theme.breakpoints.up("md")]: {
    //   height: 250,
    // },
  },
  border: {
    border: "solid",
  },
  fullHeightCard: {
    height: "100%",
  },
  card: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    borderRadius: "15px",
    height: "100%",
    position: "relative",
  },
  overlay: {
    position: "absolute",
    top: "20px",
    left: "20px",
    color: "white",
  },
  overlay2: {
    position: "absolute",
    top: "20px",
    right: "20px",
    color: "white",
    zIndex: 1,
  },
  overlay3: {
    width: "100%",
    display: "flex",
    position: "absolute",
    zIndex: 1,
    top: "200px",
    direction: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "0 16px",
  },
  grid: {
    display: "flex",
  },
  details: {
    display: "flex",
    justifyContent: "space-between",
    margin: "20px",
    alignItems: "center",
  },
  title: {
    padding: "30px 16px 0",
    display: "-webkit-box",
    boxOrient: "vertical",
    lineClamp: 1,
    wordBreak: "break-all",
    overflow: "hidden",
  },
  cardActions: {
    padding: "0 16px 8px 16px",
    display: "flex",
    justifyContent: "space-between",
  },
  cardAction: {
    display: "block",
    textAlign: "initial",
  },
  PostMessage: {
    display: "-webkit-box",
    boxOrient: "vertical",
    lineClamp: 3,
    wordBreak: "break-all",
    overflow: "hidden",
  },
}));
