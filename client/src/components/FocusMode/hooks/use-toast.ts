import {
  useToast as useToastImpl,
  ToastOptions as ToastOptionsImpl,
  toast as toastImpl,
} from "@/components/FocusMode/ui/use-toast";

export type ToastOptions = ToastOptionsImpl;

export function useToast() {
  const { toast, dismiss, toasts } = useToastImpl();
  return { toast, dismiss, toasts };
}

export const toast = toastImpl;
