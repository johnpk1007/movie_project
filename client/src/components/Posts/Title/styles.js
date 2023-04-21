import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  img: {
    [theme.breakpoints.down(650)]: {
      height: 250,
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
