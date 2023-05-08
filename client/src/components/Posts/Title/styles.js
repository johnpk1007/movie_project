import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  img: {
    [theme.breakpoints.up("xs")]: {
      height: 200,
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
