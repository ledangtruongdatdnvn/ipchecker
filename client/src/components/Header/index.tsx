import DarkModeIcon from "@mui/icons-material/DarkMode";
import LogoutIcon from "@mui/icons-material/Logout";
import PublicIcon from "@mui/icons-material/Public";
import Box from "@mui/material/Box";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import userAvatar from "../../assets/images/user-avatar.jpg";
import RouterPath from "../../router/RouterPath";
import { logout } from "../../slice/loginSlice";
import Avatar from "../Avatar";
import CustomTypography from "../CustomTypography";
import { DarkLightSwitch, StyledMenu } from "./styles";
interface HeaderProps {
  onClickDarkMode: any;
  userData: any;
  onLogout: any;
}
const Header = ({ onClickDarkMode, userData, onLogout }: HeaderProps) => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const data = userData;

  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleClickLogout = () => {
    handleCloseUserMenu();
    dispatch(logout());
    onLogout();
    navigate("/login");
  };

  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 999,
        borderBottom: "1px solid var(--main-content-text-color)",
        width: "100%",
        height: "68.5px",
        background: "var(--main-bg-color)",
      }}
    >
      <Box
        component="div"
        sx={{
          display: "flex",
          height: "100%",
          cursor: "pointer",
          justifyContent: "space-between",
          alignItems: "center",
          paddingX: 2,
        }}
      >
        <Box component="div" ml="2px" display={{ xs: "none", sm: "inline" }}>
          <Box
            component="div"
            display="inline-flex"
            justifyContent="center"
            alignItems="center"
            onClick={() => navigate(RouterPath.HOME)}
          >
            <PublicIcon
              sx={{ color: "var(--main-content-text-color)" }}
              fontSize="large"
            />
            <Box component="div">
              <CustomTypography
                fontWeight="900 !important"
                fontSize="18px !important"
                color="var(--main-content-text-color)"
                lineHeight="1"
                letterSpacing="2px"
              >
                Demo
              </CustomTypography>
              <CustomTypography
                fontWeight="700 !important"
                fontSize="10px !important"
                color="var(--main-content-text-color)"
                letterSpacing="2px"
              >
                Easy Demo App
              </CustomTypography>
            </Box>
          </Box>
        </Box>
        <Box
          width={{ xs: "100%", sm: "unset" }}
          component="div"
          display="flex"
          justifyContent="flex-end"
          alignItems="center"
        >
          {!(Object.keys(data).length === 0) && (
            <Box
              component="div"
              sx={{
                backgroundSize: "cover",
                width: "40px",
                height: "40px",
                ml: 2,
                mr: 1,
              }}
              onClick={handleOpenUserMenu}
            >
              <Avatar avatar={userAvatar} />
            </Box>
          )}
          <StyledMenu
            sx={{
              mt: 6,
            }}
            anchorEl={anchorElUser}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={Boolean(anchorElUser)}
            onClose={handleCloseUserMenu}
            disablePortal
          >
            <Box component="div" p="6px 12px">
              <Box
                component="div"
                display="flex"
                alignItems="center"
                paddingRight={1}
                sx={{ borderBottom: "1px solid" }}
              >
                <Box
                  component="div"
                  sx={{
                    backgroundSize: "cover",
                    width: "40px",
                    height: "40px",
                    m: 1,
                    mr: 2,
                  }}
                >
                  <Avatar avatar={userAvatar} />
                </Box>
                <CustomTypography
                  fontWeight="700 !important"
                  color="var(--main-content-text-color)"
                  textTransform="capitalize"
                >
                  {data?.lastName + " " + data?.firstName}
                </CustomTypography>
              </Box>

              {/* <Box
                mt={1}
                component="div"
                display="flex"
                alignItems="center"
                padding="8px 16px"
                className="user-profile-hover"
              >
                <DarkModeIcon />
                <CustomTypography ml={1} fontWeight="700 !important">
                  Darkmode
                </CustomTypography>
                <Box component="div" ml={3}>
                  <DarkLightSwitch onClick={onClickDarkMode} defaultChecked />
                </Box>
              </Box> */}
              <Box
                mt={1}
                component="div"
                display="flex"
                alignItems="center"
                padding="8px 16px"
                className="user-profile-hover"
                onClick={handleClickLogout}
              >
                <LogoutIcon />
                <CustomTypography ml={1} fontWeight="700 !important">
                  Logout
                </CustomTypography>
              </Box>
            </Box>
          </StyledMenu>
        </Box>
      </Box>
    </header>
  );
};
export default Header;
