import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useState } from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useDispatch } from "react-redux";
import { setCurrentId } from "../../slices/postUpdateSlice";
import { useNavigate } from "react-router-dom";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { useDeletePostMutation } from "../../slices/postsSlice";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const BasicMenu = ({ data, lang, id }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deletePost] = useDeletePostMutation();
  const handleClickOpen = () => {
    setDeleteOpen(true);
  };
  const handleDeleteClose = () => {
    setDeleteOpen(false);
  };

  const handleCloseCancel = () => {
    setDeleteOpen(false);
  };

  const handleCloseDelete = () => {
    setDeleteOpen(false);
    deletePost(data);
    navigate(`/${lang}/posts`);
  };

  return (
    <div>
      <Button
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        <MoreVertIcon sx={{ color: "black" }} />
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
        elevation={1}
      >
        <MenuItem
          onClick={() => {
            dispatch(setCurrentId(data._id));
            navigate(`/${lang}/newreview/${id}`);
          }}
        >
          <ListItemIcon>
            <EditIcon />
          </ListItemIcon>
          <ListItemText>{lang === "en" ? "Edit" : "수정"}</ListItemText>
        </MenuItem>
        <MenuItem onClick={() => handleClickOpen()}>
          <ListItemIcon>
            <DeleteIcon />
          </ListItemIcon>
          <ListItemText>{lang === "en" ? "Delete" : "삭제"}</ListItemText>
        </MenuItem>
      </Menu>
      <Dialog
        open={deleteOpen}
        onClose={handleDeleteClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {lang === "en"
            ? "Are you usre you want to delete your review?"
            : "이 리뷰를 삭제하시겠습니까?"}
        </DialogTitle>

        <DialogActions>
          <Button onClick={handleCloseCancel}>
            {lang === "en" ? "Cancel" : "취소"}
          </Button>
          <Button onClick={handleCloseDelete}>
            {lang === "en" ? "Delete" : "삭제"}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default BasicMenu;
