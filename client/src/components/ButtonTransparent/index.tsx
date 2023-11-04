import { Button } from "@mui/material";
import { styled } from "@mui/system";

const ButtonTransparent = styled(Button)({
  borderRadius: "4px",
  padding: "6px 20px",
  fontWeight: "700",
  fontFamily: "inherit",
  color: "var(--main-content-text-color) !important",
  border: "1px solid var(--main-content-text-color) !important",
  "&:hover": {
    filter: "brightness(2)",
  },
});
export default ButtonTransparent;
