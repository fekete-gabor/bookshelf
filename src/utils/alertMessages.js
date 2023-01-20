import { toast } from "react-toastify";

export const alertMessages = (type, msg) => {
  if (type === "success") return toast.success(msg);
  if (type === "warning") return toast.warning(msg);
  if (type === "error") return toast.error(msg);
};
