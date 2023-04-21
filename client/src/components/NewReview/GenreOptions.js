import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { useEffect, useState } from "react";

const genreOptionsEn = [
  { label: "Action", info: "action" },
  { label: "Adventure", info: "adventure" },
  { label: "Drama", info: "drama" },
  { label: "Fantasy", info: "fantasy" },
  { label: "Horror", info: "horror" },
  { label: "Mystery", info: "mystery" },
  { label: "Musical", info: "musical" },
  { label: "Science Fiction", info: "science fiction" },
  { label: "Sports", info: "sports" },
  { label: "Thriller", info: "thriller" },
  { label: "War", info: "war" },
];

const genreOptionsKo = [
  { label: "액션", info: "action" },
  { label: "어드벤쳐", info: "adventure" },
  { label: "드라마", info: "drama" },
  { label: "판타지", info: "fantasy" },
  { label: "공포", info: "horror" },
  { label: "미스터리", info: "mystery" },
  { label: "뮤지컬", info: "musical" },
  { label: "공상과학", info: "science fiction" },
  { label: "스포츠", info: "sports" },
  { label: "스릴러", info: "thriller" },
  { label: "전쟁", info: "war" },
];

export default function ComboBox({
  postData,
  setPostData,
  lang,
  preOption,
  noTagError,
  tags,
}) {
  const [value, setValue] = useState(preOption);

  useEffect(() => {
    console.log("useEffect is working now!!!!!!");
    if (preOption) {
      setValue(preOption);
    }
  }, [preOption]);
  return (
    <Autocomplete
      fullWidth
      disablePortal
      id="combo-box-demo"
      options={lang === "en" ? genreOptionsEn : genreOptionsKo}
      value={value || null}
      isOptionEqualToValue={(option, value) => option.label === value.label}
      renderInput={(params) => (
        <TextField
          {...params}
          sx={{ width: 348 }}
          label={lang === "en" ? "Genre" : "장르"}
          error={noTagError}
          helperText={
            lang === "en"
              ? noTagError
                ? "Please choose the genre"
                : ""
              : noTagError
              ? "장르를 선택해주세요."
              : ""
          }
        />
      )}
      onChange={(event, value) => {
        setValue(value);
        setPostData({ ...postData, tags: value.info });
      }}
    />
  );
}
