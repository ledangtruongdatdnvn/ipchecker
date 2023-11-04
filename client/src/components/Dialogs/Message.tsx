import { Stack } from "@mui/material";
import CustomDialog from "../DialogContainer";
import { ButtonModal } from "../DialogContainer/styles";
interface DialogMessageProps {
  onOk?: any;
  onCancel?: any;
  okText?: string;
  cancelText?: string;
  title?: string;
  content: any;
  variant: "notification" | "confirm";
}
const DialogMessage = ({
  onOk,
  onCancel,
  title = "Notification",
  content,
  okText = "Ok",
  cancelText = "Cancel",
  variant = "notification",
}: DialogMessageProps) => {
  return (
    <CustomDialog
      title={title}
      content={content}
      action={
        variant === "confirm" && (
          <Stack direction="row" spacing={2}>
            <ButtonModal variant="contained" onClick={() => onCancel()}>
              {cancelText}
            </ButtonModal>
            <ButtonModal variant="contained" onClick={() => onOk()}>
              {okText}
            </ButtonModal>
          </Stack>
        )
      }
      onClose={() => (variant === "confirm" ? onCancel() : onOk())}
    />
  );
};
export default DialogMessage;
