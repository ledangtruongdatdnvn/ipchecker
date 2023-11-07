import { styled } from "@mui/system";
import { TextField } from "@mui/material";
const CustomTextField = styled(TextField)({
  "& label.Mui-focused": {
    color: "#377dff",
    // fontFamily: "inherit",
    // fontWeight: "500",
    // fontSize: "16px",
  },
  "& .MuiFormLabel-root": {
    color: "var(--main-content-text-color)",
    // fontFamily: "inherit",
    // fontWeight: "500",
    // fontSize: "16px",
    "& :hover": {
      borderBottomColor: "#377dff",
    },
  },
  "& .MuiOutlinedInput-root": {
    "&:hover fieldset": {
      borderColor: "#377dff",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#377dff",
    },
  },
  "& .MuiInputBase-input": {
    color: "var(--main-content-text-color)",
    // fontFamily: "inherit",
    // fontWeight: "500",
    // fontSize: "16px",
  },
  "& ::before": {
    borderBottomColor: "#377dff",
  },
  "& ::after": {
    borderBottomColor: "#377dff",
  },
  "& .MuiInputBase-root.MuiInput-root:hover:not(.Mui-disabled):before": {
    borderBottomColor: "#377dff",
    // fontFamily: "inherit",
    // fontWeight: "500",
    // fontSize: "16px",
  },
});

export default CustomTextField;
