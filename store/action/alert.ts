enum AlertType {
  success = "success",
  warning = "warning",
  error = "error",
  info = "info",
}
interface payloadProps {
  type: any;
  content: string;
}

export const OpenAlertAction = (payload: payloadProps) => {
  return {
    type: "OpenAlert",
    payload: payload,
  };
};

export const CloseAlertAction = () => {
  return {
    type: "CloseAlert",
  };
};
