import React, { useMemo, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import useStyles from "./styles";
import { CardMedia, Typography, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const baseStyle = {
  flex: 1,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  padding: "20px",
  borderWidth: 2,
  borderRadius: 2,
  borderColor: "#eeeeee",
  borderStyle: "dashed",
  backgroundColor: "#fafafa",
  color: "#bdbdbd",
  outline: "none",
  transition: "border .24s ease-in-out",
  height: 200,
  width: 348,
  marginTop: 5,
  marginBottom: 12,
};

const focusedStyle = {
  borderColor: "#2196f3",
};

const acceptStyle = {
  borderColor: "#00e676",
};

const rejectStyle = {
  borderColor: "#ff1744",
};

function StyledDropzone({ picture, setPostData, postData, lang }) {
  const classes = useStyles();
  const onDrop = useCallback(
    (acceptedFiles) => {
      acceptedFiles.forEach((file) => {
        const reader = new FileReader();

        reader.onabort = () => console.log("file reading was aborted");
        reader.onerror = () => console.log("file reading has failed");
        reader.onload = () => {
          const binaryStr = reader.result;
          setPostData({ ...postData, selectedFile: binaryStr });
        };

        reader.readAsDataURL(file);
      });
    },
    [postData]
  );

  const { getRootProps, getInputProps, isFocused, isDragAccept, isDragReject } =
    useDropzone({ onDrop, accept: { "image/*": [] } });

  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isFocused ? focusedStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isFocused, isDragAccept, isDragReject]
  );

  const closeButton = (e) => {
    e.stopPropagation();
    setPostData({ ...postData, selectedFile: "" });
  };

  if (picture) {
    return (
      // <div className="container">
      <div {...getRootProps({ style })}>
        <input {...getInputProps()} />

        <div style={{ position: "relative" }}>
          <CardMedia image={picture} className={classes.media} />
          <div className={classes.overlay}>
            <Typography variant="subtitle1">
              {lang === "en"
                ? "If you want to change the image, drag 'n' drop some files here, or click to select files"
                : "이미지를 바꾸고 싶다면 이미지 파일을 마우스로 끌어오거나 창을 클릭하여 이미지 파일을 선택하세요."}
            </Typography>
          </div>
          <div className={classes.overlay2}>
            <IconButton onClick={(e) => closeButton(e)}>
              <CloseIcon sx={{ color: "white" }} />
            </IconButton>
          </div>
        </div>
      </div>
      // </div>
    );
  } else
    return (
      // <div className="container">
      <div {...getRootProps({ style })}>
        <input {...getInputProps()} />
        <Typography variant="subtitle1">
          {lang === "en"
            ? "Drag 'n' drop some files here, or click to select files"
            : "이미지 파일을 마우스로 끌어오거나 창을 클릭하여 이미지 파일을 선택하세요."}
        </Typography>
      </div>
      // </div>
    );
}
export default StyledDropzone;
