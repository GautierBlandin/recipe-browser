import { ReactNode } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { cn } from './utils';

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
  const sizeClass = getModalSizeClass(size);

  return (
    <Dialog.Root open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <Dialog.Portal>
        <Dialog.Overlay
          className="fixed inset-0 z-50 bg-black bg-opacity-50"
          aria-label="Modal backdrop"
        />
        <Dialog.Content
          className={cn(
            "fixed left-[50%] top-[50%] z-50 translate-x-[-50%] translate-y-[-50%]",
            "bg-neutral-primary rounded-lg shadow-lg w-full mx-4 p-6",
            sizeClass
          )}
          aria-label={ariaLabel || "Modal dialog"}
          aria-describedby={undefined}
        >
          {title && (
            <div className="mb-4">
              <Dialog.Title className="text-lg font-semibold text-neutral-primary">
                {title}
              </Dialog.Title>
            </div>
          )}
          {children}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
