// import { Pagination, PaginationItem } from "@material-ui/lab";
import { Pagination, PaginationItem } from "@mui/material";
import useStyles from "./styles";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPostPage } from "../slices/postPage";
import { apiSlice } from "../slices/postsSlice";
import { useParams } from "react-router-dom";

const Paginate = ({ page, search }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [getTrigger, getResult] = apiSlice.useLazyGetPostsQuery();
  const { lang } = useParams();

  const searchStatus = search;

  useEffect(() => {
    if (page && searchStatus === null) {
      dispatch(setPostPage(page));
      getTrigger(page);
    }
  }, [page, searchStatus]);

  if (
    getResult.isUninitialized === false &&
    getResult.isSuccess &&
    searchStatus === null
  ) {
    return (
      <Pagination
        classes={{ ul: classes.ul }}
        count={getResult.data.numberOfPage}
        page={Number(page) || 1}
        color="primary"
        renderItem={(item) => (
          <PaginationItem
            {...item}
            component={Link}
            to={`/${lang}/posts?page=${item.page}`}
          />
        )}
      />
    );
  } else {
    return null;
  }
};

export default Paginate;
