import { Button } from "@mui/material";
import { styled } from "@mui/system";

const ButtonTransparent = styled(Button)({
  borderRadius: "4px",
  padding: "6px 12px",
  fontWeight: "600",
  fontFamily: "inherit",
  lineHeight: "unset",
  color: "var(--main-content-text-color) !important",
  border: "1px solid var(--main-content-text-color) !important",
  "&:hover": {
    color: "var(--main-hover-color) !important",
    border: "1px solid var(--main-hover-color) !important",
  },
});
export default ButtonTransparent;
