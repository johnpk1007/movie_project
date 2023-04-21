import { TextField, Grid, InputAdornment, IconButton } from "@material-ui/core";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

const Input = ({
  name,
  handleChange,
  half,
  label,
  autoFocus,
  type,
  handleShowPassword,
  passwordCheckError,
  lang,
  passwordChangeError1,
  passwordChangeError2,
}) => {
  return (
    <Grid item xs={12} sm={half ? 6 : 12}>
      <TextField
        name={name}
        onChange={handleChange}
        vairant="outlined"
        required
        fullWidth
        label={label}
        autoFocus={autoFocus}
        type={type}
        error={
          passwordCheckError || passwordChangeError1 || passwordChangeError2
        }
        helperText={
          lang === "en"
            ? passwordCheckError
              ? "Wrong Password. Try again"
              : passwordChangeError2
              ? "Password don't match"
              : ""
            : passwordCheckError
            ? "틀린 비밀번호입니다. 다시 시도해보세요."
            : passwordChangeError2
            ? "비밀번호가 일치하지 않습니다."
            : ""
        }
        InputProps={
          name === "password" || name === "confirmPassword"
            ? {
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleShowPassword}>
                      {type === "password" ? (
                        <VisibilityIcon />
                      ) : (
                        <VisibilityOffIcon />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }
            : null
        }
      />
    </Grid>
  );
};

export default Input;
