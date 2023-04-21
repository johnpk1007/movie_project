import { Pagination, PaginationItem } from "@mui/material";
import useStyles from "./styles";
import { apiSlice } from "../../../slices/postsSlice";
import { Link } from "react-router-dom";
import { useEffect } from "react";

const Paginate = ({ page, creatorId, numberOfPage }) => {
  const classes = useStyles();

  return (
    <Pagination
      classes={{ ul: classes.ul }}
      count={numberOfPage}
      page={Number(page) || 1}
      // variant="outlined"
      color="primary"
      renderItem={(item) => (
        <PaginationItem
          {...item}
          component={Link}
          to={`/profile?page=${item.page}`}
        />
      )}
    />
  );
};

export default Paginate;
