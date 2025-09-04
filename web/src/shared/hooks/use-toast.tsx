import { CircleAlert, CircleCheck, CircleX, Info } from "lucide-react";
import type { ReactNode } from "react";
import { toast } from "sonner";

type ToastType = "success" | "error" | "info" | "warning";

interface ToastOptions {
  position?:
    | "top-left"
    | "top-center"
    | "top-right"
    | "bottom-left"
    | "bottom-center"
    | "bottom-right";
  duration?: number;
  icon?: ReactNode;
}

export const useToast = () => {
  const showToast = (type: ToastType = "info", message: string, options?: ToastOptions) => {
    const icons: Record<ToastType, ReactNode> = {
      success: <CircleCheck color="white" fill="green" />,
      info: <Info color="white" fill="blue" />,
      warning: <CircleAlert color="white" fill="orange" />,
      error: <CircleX color="white" fill="red" />,
    };

    toast(message, {
      ...options,
      position: options?.position ?? "top-center",
      duration: options?.duration ?? 3000,
      icon: options?.icon ?? icons[type],
    });
  };

  return { showToast };
};
