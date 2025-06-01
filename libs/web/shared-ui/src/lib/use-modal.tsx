import { useState, useCallback } from 'react';

export interface UseModalOptions {
  initialOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export interface UseModalReturn {
  isOpen: boolean;
  open: () => void;
  close: () => void;
  toggle: () => void;
  setOpen: (open: boolean) => void;
}

export function useModal(options: UseModalOptions = {}): UseModalReturn {
  const { initialOpen = false, onOpenChange } = options;
  const [isOpen, setIsOpen] = useState(initialOpen);

  const setOpen = useCallback((open: boolean) => {
    setIsOpen(open);
    onOpenChange?.(open);
  }, [onOpenChange]);

  const open = useCallback(() => setOpen(true), [setOpen]);
  const close = useCallback(() => setOpen(false), [setOpen]);
  const toggle = useCallback(() => setOpen(!isOpen), [isOpen, setOpen]);

  return {
    isOpen,
    open,
    close,
    toggle,
    setOpen,
  };
}