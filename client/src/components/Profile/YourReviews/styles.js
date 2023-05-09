import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  mainContainer: {
    display: "flex",
    alignItems: "center",
  },
  smMargin: {
    margin: theme.spacing(1),
  },
  actionDiv: {
    textAlign: "center",
  },
  ul: {
    justifyContent: "space-around",
  },
  button: {
    borderRadius: 20,
  },
  img: {
    [theme.breakpoints.up("xs")]: {
      height: 250,
    },
    [theme.breakpoints.up("sm")]: {
      height: 400,
    },
  },
  loadingPaper: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "20px",
    borderRadius: "15px",
    height: "39vh",
  },
}));
