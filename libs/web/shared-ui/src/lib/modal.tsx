import { ReactNode } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  title?: string;
  ariaLabel?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
}

function getModalSizeClass(size: 'sm' | 'md' | 'lg' | 'xl' | 'full' = 'md'): string {
  switch (size) {
    case 'sm':
      return 'max-w-sm';
    case 'md':
      return 'max-w-md';
    case 'lg':
      return 'max-w-4xl';
    case 'xl':
      return 'max-w-6xl';
    case 'full':
      return 'max-w-[95vw] max-h-[95vh] overflow-auto';
    default:
      return 'max-w-md';
  }
}

export function Modal({ isOpen, onClose, children, title, ariaLabel, size = 'md' }: ModalProps) {
  if (!isOpen) return null;

  const sizeClass = getModalSizeClass(size);

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      onClick={onClose}
      aria-label="Modal backdrop"
    >
      <div 
        className={`bg-neutral-primary rounded-lg shadow-lg w-full ${sizeClass} mx-4 p-6`}
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