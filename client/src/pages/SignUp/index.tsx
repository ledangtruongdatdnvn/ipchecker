import { Box, Grid, Stack, Typography } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import ButtonPrimary from "../../components/ButtonPrimary";
import CustomTextField from "../../components/CustomTextField";
import CustomTypography from "../../components/CustomTypography";
import { headers } from "../../constants";
import { setIsOpenDialogMessage } from "../../slice/dialogMessageSlice";

const SignUp = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [errEmail, setErrEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errPassword, setErrPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errConfirmPassword, setErrConfirmPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [errFirstName, setErrFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [errLastName, setErrLastName] = useState("");
  const [companyName, setCompanyName] = useState("");

  const dispatch = useDispatch();

  const validateForm = () => {
    if (firstName.trim().length === 0) {
      setErrFirstName("First name is required!");
      return false;
    }
    if (lastName.trim().length === 0) {
      setErrLastName("Last name is required!");
      return false;
    }
    if (email.trim().length === 0) {
      setErrEmail("Email is required!");
      return false;
    }
    if (password.trim().length === 0) {
      setErrPassword("Password is required!");
      return false;
    }
    if (confirmPassword.trim().length === 0) {
      setErrConfirmPassword("Confirm password is required!");
      return false;
    }
    if (password.localeCompare(confirmPassword) !== 0) {
      setErrConfirmPassword("Confirm password does not match!");
      return false;
    }

    return true;
  };
  const handleClickSignUp = async () => {
    if (validateForm()) {
      const requestData = {
        email,
        password,
        firstName,
        lastName,
        companyName,
      };

      try {
        const response = await axios.post(
          `${process.env.REACT_APP_API_URL}/user/register`,
          requestData,
          {
            headers: headers,
          }
        );
        if (response.data.status === 200) {
          dispatch(
            setIsOpenDialogMessage({
              isOpen: true,
              message: response.data.message,
            })
          );
          navigate("/login");
        }
      } catch (error) {
        console.error("error:", error);
      }
    }
  };

  return (
    <>
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
        style={{ minHeight: "100vh" }}
      >
        <Grid item xs={12} sm={8} md={4} lg={3} xl={3}>
          <Box
            component="div"
            width={{
              xs: "calc(300px + 5vw)",
              sm: "calc(500px + 5vw)",
            }}
            className="main-border"
            sx={{
              background: "var(--main-bg-color)",
            }}
            p={{ xs: "32px 0px", sm: "32px 8px" }}
          >
            <Box component="div" display="flex" justifyContent="center">
              <CustomTypography
                color="var(--main-content-text-color)"
                fontSize="24px !important"
                fontWeight="700 !important"
              >
                SIGN UP
              </CustomTypography>
            </Box>
            <Box component="div" px={4} py={1} mb={1}>
              <Box component="form" noValidate autoComplete="off">
                <Box component="div" p={1}>
                  <Stack
                    direction={{ xs: "column", sm: "row" }}
                    spacing={{ xs: 2, sm: 4 }}
                    justifyContent={{ xs: "unset", sm: "space-between" }}
                  >
                    <Box component="div" width="100%">
                      <CustomTextField
                        id="first-name"
                        label="First name"
                        variant="outlined"
                        inputProps={{ maxLength: 50 }}
                        fullWidth
                        value={firstName}
                        onChange={(e) => {
                          setErrFirstName("");
                          setFirstName(e.target.value);
                        }}
                      />
                      {errFirstName && (
                        <Typography variant="caption" color="error">
                          {errFirstName}
                        </Typography>
                      )}
                    </Box>
                    <Box component="div" width="100%">
                      <CustomTextField
                        id="last-name"
                        label="Last name"
                        variant="outlined"
                        inputProps={{ maxLength: 50 }}
                        fullWidth
                        value={lastName}
                        onChange={(e) => {
                          setErrLastName("");
                          setLastName(e.target.value);
                        }}
                      />
                      {errLastName && (
                        <Typography variant="caption" color="error">
                          {errLastName}
                        </Typography>
                      )}
                    </Box>
                  </Stack>
                </Box>
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
                  {errEmail && (
                    <Typography variant="caption" color="error">
                      {errEmail}
                    </Typography>
                  )}
                </Box>
                <Box component="div" p={1}>
                  <Stack
                    direction={{ xs: "column", sm: "row" }}
                    spacing={{ xs: 2, sm: 4 }}
                    justifyContent={{ xs: "unset", sm: "space-between" }}
                  >
                    <Box component="div" width="100%">
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
                      {errPassword && (
                        <Typography variant="caption" color="error">
                          {errPassword}
                        </Typography>
                      )}
                    </Box>
                    <Box component="div" width="100%">
                      <CustomTextField
                        id="confirm-password"
                        label="Confirm Password"
                        variant="outlined"
                        inputProps={{ maxLength: 15 }}
                        type="password"
                        fullWidth
                        value={confirmPassword}
                        onChange={(e) => {
                          setErrConfirmPassword("");
                          setConfirmPassword(e.target.value);
                        }}
                      />
                      {errConfirmPassword && (
                        <Typography variant="caption" color="error">
                          {errConfirmPassword}
                        </Typography>
                      )}
                    </Box>
                  </Stack>
                </Box>
                <Box component="div" p={1}>
                  <Stack
                    direction={{ xs: "column", sm: "row" }}
                    spacing={{ xs: 2, sm: 4 }}
                    justifyContent={{ xs: "unset", sm: "space-between" }}
                  >
                    <CustomTextField
                      id="company-name"
                      label="Company name"
                      variant="outlined"
                      inputProps={{ maxLength: 50 }}
                      fullWidth
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                    />
                  </Stack>
                </Box>
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
                onClick={handleClickSignUp}
              >
                Sign Up
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
                Already have an account?
              </Typography>
              <Box component="div" onClick={() => navigate("/login")}>
                <Typography
                  fontSize={14}
                  ml={1}
                  sx={{
                    color: "#377dff",
                    opacity: "0.7",
                    "&:hover": {
                      cursor: "pointer",
                      opacity: "0.8",
                    },
                    "&:active": {
                      opacity: "1",
                    },
                  }}
                >
                  Login
                </Typography>
              </Box>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};
export default SignUp;
