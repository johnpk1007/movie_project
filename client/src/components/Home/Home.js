import { Container, Grid } from "@material-ui/core";
import Posts from "../Posts/Posts";
import Form from "../Form/Form";
import useStyles from "./styles";
import Pagination from "../Pagination";
import { useLocation } from "react-router-dom";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const Home = () => {
  const query = useQuery();
  const page = query.get("page") || 1;
  const url = new URL(window.location.href);
  const search = url.searchParams.get("searchQuery");

  return (
    <Container maxWidth="xl">
      <Grid
        container
        direction="column"
        justifyContent="space-between"
        alignItems="center"
        spacing={3}
      >
        <Grid item xs={12} sm={11} md={10}>
          <Posts />
        </Grid>
        <Grid item xs={12} md={3}>
          <Pagination page={page} search={search} />
        </Grid>
      </Grid>
    </Container>
  );
};

export default Home;
