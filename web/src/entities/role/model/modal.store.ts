import { create } from "zustand";

type ModalAction = "create" | "update" | "delete" | "show" | null;

interface ModalState {
  isOpen: boolean;
  id?: number;
  action: ModalAction;
  onOpenChange: (isOpen: boolean, action?: Exclude<ModalAction, null>, id?: number) => void;
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
}));
