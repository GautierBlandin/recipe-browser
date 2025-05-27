import { ReactNode } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  title?: string;
  ariaLabel?: string;
}

export function Modal({ isOpen, onClose, children, title, ariaLabel }: ModalProps) {
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      onClick={onClose}
      aria-label="Modal backdrop"
    >
      <div 
        className="bg-neutral-primary rounded-lg shadow-lg w-full max-w-md mx-4 p-6"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label={ariaLabel || "Modal dialog"}
      >
        {title && (
          <div className="mb-4">
            <h2 className="text-lg font-semibold text-neutral-primary">{title}</h2>
          </div>
        )}
        {children}
      </div>
    </div>
  );
}