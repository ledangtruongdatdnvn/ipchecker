import { Box } from "@mui/material";
interface AvatarProps {
  avatar: any;
}
const Avatar = ({ avatar }: AvatarProps) => {
  return (
    <Box
      component="div"
      sx={{
        background: `url(${avatar})`,
        borderRadius: "50%",
        height: "100%",
        width: "100%",
        backgroundSize: "cover",
      }}
    ></Box>
  );
};
export default Avatar;
