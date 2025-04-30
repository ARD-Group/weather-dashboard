import { ReactNode, ReactElement } from "react";

type ToastMessage = string | ReactNode | ReactElement;
type ToastNotify = { title: string; subtitle: string; icon?: string };

export type ToasterProps = {
  message: ToastMessage;
  notify?: ToastNotify;
  position?:
    | "top-left"
    | "top-right"
    | "bottom-left"
    | "bottom-right"
    | "top-center"
    | "bottom-center";
  dir?: "rtl" | "ltr" | "auto";
};

export type ToasterType = (props: ToasterProps) => ReactElement;

export type ToastType = {
  toastSuccess: (message: ToastMessage) => void;
  toastError: (message: ToastMessage) => void;
  toastWarning: (message: ToastMessage) => void;
  toastInfo: (message: ToastMessage) => void;
  toastNotify: (notify: ToastNotify) => void;
};
