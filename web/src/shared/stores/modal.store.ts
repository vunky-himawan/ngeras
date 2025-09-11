import { create } from "zustand";

type ModalAction = "create" | "update" | "delete" | "show" | null;

interface ModalState {
  isOpen: boolean;
  id?: number | string;
  action: ModalAction;
  onOpenChange: (
    isOpen: boolean,
    action?: Exclude<ModalAction, null>,
    id?: number | string,
  ) => void;
  close: () => void;
}

export const useModalStore = create<ModalState>((set) => ({
  isOpen: false,
  action: null,
  onOpenChange: (isOpen, action, id) => {
    if (!isOpen) {
      set({ isOpen, id: undefined });
      setTimeout(() => set({ action: null }), 300);
    } else {
      set({ isOpen, action: action ?? null, id });
    }
  },
  close: () => set({ isOpen: false, action: null, id: undefined }),
}));
