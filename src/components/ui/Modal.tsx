import React, { useEffect, useRef } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import Button from './Button';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | '6xl' | '7xl';
  closeOnClickOutside?: boolean;
  showCloseButton?: boolean;
  className?: string;
  footer?: React.ReactNode;
  hideHeader?: boolean;
  hideFooter?: boolean;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  size = 'md',
  closeOnClickOutside = true,
  showCloseButton = true,
  className = '',
  footer,
  hideHeader = false,
  hideFooter = false,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);

  // Close modal when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        closeOnClickOutside &&
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    // Close on Escape key press
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleKeyDown);
      // Prevent body scroll when modal is open
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
      // Re-enable body scroll when modal is closed
      document.body.style.overflow = 'auto';
    };
  }, [isOpen, onClose, closeOnClickOutside]);

  // Don't render if modal is closed
  if (!isOpen) return null;

  const sizeClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    '2xl': 'max-w-2xl',
    '3xl': 'max-w-3xl',
    '4xl': 'max-w-4xl',
    '5xl': 'max-w-5xl',
    '6xl': 'max-w-6xl',
    '7xl': 'max-w-7xl',
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center p-4 text-center sm:block sm:p-0">
        {/* Background overlay */}
        <div className="fixed inset-0 bg-black/50 transition-opacity" aria-hidden="true" />

        {/* Modal panel */}
        <div
          ref={modalRef}
          className={`inline-block w-full transform overflow-hidden rounded-lg bg-white text-left align-bottom shadow-xl transition-all sm:my-8 sm:align-middle ${sizeClasses[size]} ${className}`}
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
        >
          {/* Header */}
          {!hideHeader && (
            <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
              <h3
                className="text-lg font-medium leading-6 text-gray-900"
                id="modal-title"
              >
                {title}
              </h3>
              {showCloseButton && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onClose}
                  className="text-gray-400 hover:text-gray-500"
                  aria-label="Close"
                >
                  <XMarkIcon className="h-5 w-5" />
                </Button>
              )}
            </div>
          )}

          {/* Content */}
          <div className="px-6 py-4">
            {children}
          </div>

          {/* Footer */}
          {!hideFooter && (
            <div className="border-t border-gray-200 bg-gray-50 px-6 py-4 sm:flex sm:flex-row-reverse sm:px-6">
              {footer || (
                <Button
                  variant="primary"
                  onClick={onClose}
                  className="w-full sm:ml-3 sm:w-auto"
                >
                  Close
                </Button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Modal;
