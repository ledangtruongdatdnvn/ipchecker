import { Button } from "@mui/material";
import { styled } from "@mui/system";

const ButtonTransparent = styled(Button)({
  borderRadius: "4px",
  padding: "6px 12px",
  fontWeight: "400",
  fontFamily: "inherit",
  lineHeight: "unset",
  textTransform: "unset",
  color: "rgb(55, 125, 255)",
  border: "1px solid rgb(55, 125, 255)",
  "&:hover": {
    color: "rgb(55, 125, 255)",
    border: "1px solid rgb(55, 125, 255)",
  },
});
export default ButtonTransparent;
