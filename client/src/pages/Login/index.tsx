import { Box, Grid, Typography } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import ButtonPrimary from "../../components/ButtonPrimary";
import CustomTextField from "../../components/CustomTextField";
import CustomTypography from "../../components/CustomTypography";
import { headers } from "../../constants";
import { setIsOpenDialogMessage } from "../../slice/dialogMessageSlice";
import { loginSuccess } from "../../slice/loginSlice";
interface LoginProps {
  setUserData: any;
}

const Login = ({ setUserData }: LoginProps) => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");

  const [errEmail, setErrEmail] = useState("");

  const [password, setPassword] = useState("");

  const [errPassword, setErrPassword] = useState("");

  const dispatch = useDispatch();

  const validateForm = () => {
    if (email.trim().length === 0) {
      setErrEmail("Email is required!");
      return false;
    }

    if (password.trim().length === 0) {
      setErrPassword("Password is required!");
      return false;
    }
    return true;
  };

  const handleClickLogin = async () => {
    if (validateForm()) {
      try {
        const response = await axios.post(
          `${process.env.REACT_APP_API_URL}/user/login`,
          { email, password },
          {
            headers: headers,
          }
        );
        if (response?.data.status === 200) {
          dispatch(
            loginSuccess({
              userData: response?.data?.userData,
              accessToken: response?.data?.token,
            })
          );
          setUserData(response?.data?.userData);
          navigate("/");
        } else if (response?.data.status === 403) {
          dispatch(
            setIsOpenDialogMessage({
              isOpen: true,
              message: "Email and password does not match!",
            })
          );
        }
      } catch (error) {
        console.error("error:", error);
      }
    }
  };
  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
      sx={{
        minHeight: "100vh",
        backgroundColor: "#f5f6fa",
      }}
    >
      <Grid item xs={12} sm={8} md={4} lg={3} xl={3}>
        <Box
          className="main-border"
          component="div"
          sx={{
            width: "calc(300px + 5vw)",
            background: "var(--main-bg-color)",
            boxShadow: "0px 0px 10px var(--main-bg-color)",
            borderRadius: "4px",
            padding: { xs: "32px 0px", sm: "32px 8px" },
          }}
        >
          <Box component="div" display="flex" justifyContent="center">
            <CustomTypography
              color="var(--main-content-text-color)"
              fontSize="24px !important"
              fontWeight="700 !important"
            >
              SIGN IN
            </CustomTypography>
          </Box>
          <Box component="div" px={4} mb={1}>
            <Box component="div" p={1}>
              <CustomTextField
                id="email"
                label="Email"
                variant="outlined"
                inputProps={{ maxLength: 50 }}
                fullWidth
                value={email}
                onChange={(e) => {
                  setErrEmail("");
                  setEmail(e.target.value);
                }}
              />
              <Typography
                variant="caption"
                color={errEmail.length > 0 ? "error" : "transparent"}
                sx={{ marginTop: "4px" }}
              >
                {errEmail.length > 0 ? errEmail : "error"}
              </Typography>
            </Box>
            <Box component="div" px={1}>
              <CustomTextField
                id="password"
                label="Password"
                variant="outlined"
                inputProps={{ maxLength: 15 }}
                type="password"
                fullWidth
                value={password}
                onChange={(e) => {
                  setErrPassword("");
                  setPassword(e.target.value);
                }}
              />

              <Typography
                variant="caption"
                color={errPassword.length > 0 ? "error" : "transparent"}
              >
                {errPassword.length > 0 ? errPassword : "error"}
              </Typography>
            </Box>
          </Box>
          <Box
            component="div"
            display="flex"
            justifyContent="center"
            sx={{ paddingX: 5 }}
            mb={2}
          >
            <ButtonPrimary
              variant="contained"
              fullWidth
              onClick={handleClickLogin}
            >
              Log In
            </ButtonPrimary>
          </Box>
          <Box
            component="div"
            display="flex"
            justifyContent="center"
            sx={{ paddingX: 5 }}
            alignItems="center"
          >
            <Typography fontSize={14} color="var(--main-content-text-color)">
              Don't have an account?
            </Typography>
            <Box component="div" onClick={() => navigate("/register")}>
              <Typography
                sx={{
                  fontSize: "14px",
                  marginLeft: 1,
                  color: "#377dff",
                  "&:hover": {
                    cursor: "pointer",
                  },
                }}
              >
                Create
              </Typography>
            </Box>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};
export default Login;
