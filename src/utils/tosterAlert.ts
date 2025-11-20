import { toast, ToastOptions, ToastPosition } from "react-toastify";

export const ALERT_TYPE = {
  SUCCESS: "SUCCESS",
  INFO: "INFO",
  WARNING: "WARNING",
  ERROR: "ERROR",
};

export const alertMessage = (message: string, type: string) => {
  let configObj: ToastOptions = {
    position: "top-right" as ToastPosition,
    autoClose: 3000,
    hideProgressBar: true,
    closeOnClick: true,
    theme: "light",
  };

  switch (type) {
    case ALERT_TYPE.SUCCESS:
      toast.success(message, configObj);
      break;
    case ALERT_TYPE.INFO:
      toast.info(message, configObj);
      break;
    case ALERT_TYPE.WARNING:
      toast.warning(message, configObj);
      break;
    case ALERT_TYPE.ERROR:
      toast.error(message, configObj);
      break;
    default:
      toast(message, configObj);
      break;
  }
};
