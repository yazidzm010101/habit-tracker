import { useState } from "react";

export function useDisclosure() {
  const [isOpen, setOpen] = useState<boolean>();
  return {
    isOpen,
    onOpen() {
      setOpen(true);
    },
    onClose() {
      setOpen(false);
    },
    onToggle() {
      setOpen(!isOpen);
    },
  };
}
