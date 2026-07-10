"use client";

import { createContext, useContext, useState, type ReactNode } from "react";

interface ModalState {
  open: boolean;
  openModal: () => void;
  closeModal: () => void;
}

const ModalContext = createContext<ModalState>({
  open: false,
  openModal: () => {},
  closeModal: () => {},
});

export function ModalProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <ModalContext.Provider
      value={{
        open,
        openModal: () => setOpen(true),
        closeModal: () => setOpen(false),
      }}
    >
      {children}
    </ModalContext.Provider>
  );
}

export function useModal(): ModalState {
  return useContext(ModalContext);
}
