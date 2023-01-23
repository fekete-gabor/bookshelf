import { toast } from "react-toastify";

export const alertMessages = (type, msg) => {
  msg = msg
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  if (type === "success") return toast.success(msg);
  if (type === "warning") return toast.warning(msg);
  if (type === "error") return toast.error(msg);
};
