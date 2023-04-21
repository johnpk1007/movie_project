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
  value,
  idPasswordError1,
  idPasswordError2,
  emailError,
  passwordError1,
  passwordError2,
  lang,
  noUserError,
  noEmailVerifyError,
}) => {
  return (
    <Grid item xs={12} sm={half ? 6 : 12}>
      <TextField
        error={
          idPasswordError1 ||
          idPasswordError2 ||
          emailError ||
          passwordError1 ||
          passwordError2 ||
          noUserError ||
          noEmailVerifyError
        }
        name={name}
        onChange={handleChange}
        vairant="outlined"
        required
        fullWidth
        label={label}
        autoFocus={autoFocus}
        type={type}
        value={value}
        helperText={
          lang === "en"
            ? idPasswordError2
              ? "Wrong ID or Password. Try again"
              : emailError
              ? "User already exists"
              : passwordError2
              ? "Password don't match"
              : noUserError
              ? "Can't find your email account"
              : noEmailVerifyError
              ? "Your email hasn't verified yet. Please verify"
              : ""
            : idPasswordError2
            ? "아이디 또는 패스워드가 잘못되었습니다. 다시 시도하세요."
            : emailError
            ? "다른 회원이 이미 사용하고 있는 이메일 주소입니다."
            : passwordError2
            ? "비밀번호가 일치하지 않습니다."
            : noUserError
            ? "이메일을 찾을 수 없습니다."
            : noEmailVerifyError
            ? "이메일이 확인되지 않았습니다. 이메일을 확인해주세요."
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
