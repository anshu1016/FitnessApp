import { toast } from "react-toastify";

export const initialToast = {
  show: false,
  message: "",
  type: "info" // This could be 'success', 'error', 'info', 'warn' based on your needs.
};

export const ToastReducer = (state = initialToast, action) => {
  switch (action.type) {
    case "SHOW_TOAST":
      switch (action.payload.type) {
        case "success":
          toast.success(action.payload.message);
          break;
        case "error":
          toast.error(action.payload.message);
          break;
        default:
          toast.info(action.payload.message);
          break;
      }
      return { ...state, show: true, message: action.payload.message };
    case "HIDE_TOAST":
      toast.dismiss();
      return { ...state, show: false, message: "" };
    default:
      return state;
  }
};
