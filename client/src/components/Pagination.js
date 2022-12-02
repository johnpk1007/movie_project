import { Pagination, PaginationItem } from "@material-ui/lab";
import useStyles from "./styles";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPostPage } from "../slices/postPage";
import { apiSlice } from "../slices/postsSlice";

const Paginate = ({ page }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [getTrigger, getResult] = apiSlice.useLazyGetPostsQuery();

  useEffect(() => {
    if (page) {
      dispatch(setPostPage(page));
      getTrigger(page);
    }
  }, [page]);

  if (getResult.isUninitialized === false && getResult.isSuccess) {
    return (
      <Pagination
        classes={{ ul: classes.ul }}
        count={getResult.data.numberOfPage}
        page={Number(page) || 1}
        variant="outlined"
        color="primary"
        renderItem={(item) => (
          <PaginationItem
            {...item}
            component={Link}
            to={`/posts?page=${item.page}`}
          />
        )}
      />
    );
  }
};

export default Paginate;
