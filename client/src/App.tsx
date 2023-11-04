import { Box } from "@mui/material";
import useAxios from "axios-hooks";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import RoutesContainer from "./RoutesContainer";
import DialogMessage from "./components/Dialogs/Message";
import Header from "./components/Header";
import { RootState } from "./config/store";
import { API_URL, headers } from "./constants";
import "./index.scss";
import Login from "./pages/Login";
import RouterPath from "./router/RouterPath";
import { setDarkMode } from "./slice/darkModeSlice";
import {
  dialogMessageState,
  setIsOpenDialogMessage,
} from "./slice/dialogMessageSlice";
import { loginSuccess } from "./slice/loginSlice";

const App = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [userProfile, setUserProfile] = useState<any>({});
  const dialogMessageData = useSelector<RootState>(
    (state) => state.dialogMessage
  ) as dialogMessageState;
  const dispatch = useDispatch();
  const location = useLocation();
  const handleClickDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };
  const token = localStorage.getItem("access_token");
  const [{}, execute] = useAxios(
    {
      url: `${API_URL}/user/profile`,
      headers: {
        ...headers,
        Authorization: `Bearer ${token}`,
      },
    },
    {
      manual: true,
    }
  );
  useEffect(() => {
    if (token) {
      execute()
        .then((result) => result.data)
        .then((data) => {
          setUserProfile(data?.userData);
          dispatch(
            loginSuccess({
              userData: data?.userData,
              accessToken: data?.token,
            })
          );
        })
        .catch((err) => console.error(err));
    }
  }, []);

  useEffect(() => {
    dispatch(setDarkMode(isDarkMode));
  }, [isDarkMode]);
  const setLoginData = (userData: any) => {
    setUserProfile(userData);
  };
  const renderLoginComponent = () => {
    return (
      <Route
        path={RouterPath.LOGIN}
        element={<Login setUserData={setLoginData} />}
      />
    );
  };
  return (
    <Box
      component="div"
      data-theme={isDarkMode ? "dark" : "light"}
      sx={{
        minHeight: "100vh",
        backgroundColor: isDarkMode ? "#233142" : "#fff",
      }}
    >
      <Box component="div">
        <ToastContainer
          toastStyle={
            isDarkMode
              ? { background: "#374359", color: "#eeeeee" }
              : { background: "#ffffff", color: "#152238" }
          }
        />
        {dialogMessageData.isOpen && (
          <DialogMessage
            variant="notification"
            title="Notification"
            content={dialogMessageData.message}
            onOk={() => {
              dispatch(setIsOpenDialogMessage({ isOpen: false, message: "" }));
            }}
          />
        )}
        {!location.pathname.includes("login") &&
          !location.pathname.includes("register") && (
            <Header
              userData={userProfile}
              onClickDarkMode={handleClickDarkMode}
              onLogout={() => setUserProfile({})}
            />
          )}
        <Box
          component="div"
          sx={{
            minHeight: "calc(100vh - 216px)",
          }}
        >
          <RoutesContainer renderLogin={renderLoginComponent} />
        </Box>
      </Box>
    </Box>
  );
};

export default App;
