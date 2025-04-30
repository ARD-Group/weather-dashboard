import { toast, Toaster as SonnerToaster } from "sonner";

import NotifyToast from "./NotifyToast";

import { ToastType, ToasterProps } from "../toastInterface";

export const Toaster = (props: ToasterProps) => (
  <SonnerToaster expand richColors {...props} />
);

export const Toast: ToastType = {
  toastSuccess: (message) => toast.success(message),
  toastError: (message) => toast.error(message),
  toastWarning: (message) => toast.warning(message),
  toastInfo: (message) => toast.info(message),
  toastNotify: ({ title, subtitle, icon }) =>
    toast.custom((toastIdx) => (
      <div
        style={{
          padding: "16px",
          width: "var(--width)",
          gap: "6px",
        }}
        className="bg-info0 border-info5 rounded-sm border-s-4"
      >
        <NotifyToast
          toastIdx={toastIdx}
          title={title}
          subtitle={subtitle}
          icon={icon}
        />
      </div>
    )),
};

export default Toast;
