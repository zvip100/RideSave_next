'use client';

import { useEffect, useCallback, useState } from 'react';

/**
 * Sheet - A slide-in panel/tray from the right side
 * 
 * @param {boolean} open - Whether the sheet is open
 * @param {function} onClose - Callback when sheet should close
 * @param {string} title - Optional title for the sheet header
 * @param {string} description - Optional description below title
 * @param {React.ReactNode} children - Content to render inside the sheet
 * @param {string} width - Width of sheet: 'sm' | 'md' | 'lg' | 'xl' | 'full' (default: 'md')
 */
export default function Sheet({
  open,
  onClose,
  title,
  description,
  children,
  width = 'md'
}) {
  const [shouldRender, setShouldRender] = useState(false);
  const [shouldAnimate, setShouldAnimate] = useState(false);

  // Handle mounting/unmounting with delay for animation
  useEffect(() => {
    if (open) {
      setShouldRender(true);
      // Small delay to trigger enter animation after mount
      requestAnimationFrame(() => {
        requestAnimationFrame(() => setShouldAnimate(true));
      });
    } else {
      setShouldAnimate(false);
      // Wait for animation to complete before unmounting
      const timer = setTimeout(() => setShouldRender(false), 500);
      return () => clearTimeout(timer);
    }
  }, [open]);

  // Handle ESC key to close
  const handleEscape = useCallback((e) => {
    if (e.key === 'Escape') onClose();
  }, [onClose]);

  useEffect(() => {
    if (open) {
      document.addEventListener('keydown', handleEscape);
      // Get scrollbar width before hiding it
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
      document.body.style.overflow = 'hidden';
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
    };
  }, [open, handleEscape]);

  // Width variants
  const widthClasses = {
    sm: 'max-w-sm',      // 384px
    md: 'max-w-md',      // 448px - good for forms
    lg: 'max-w-lg',      // 512px
    xl: 'max-w-xl',      // 576px
    full: 'max-w-full',  // Full width
  };

  if (!shouldRender) return null;

  return (
    <div className="fixed inset-0 z-50">
      {/* Backdrop */}
      <div
        className={`
          fixed inset-0 bg-black/30 
          transition-opacity duration-500 ease-out
          ${shouldAnimate ? 'opacity-100' : 'opacity-0'}
        `}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Sheet Panel */}
      <div className="fixed inset-y-0 right-0 flex">
        <div
          className={`
            relative w-screen ${widthClasses[width]}
            bg-card border-l border-border
            shadow-2xl shadow-black/50
            transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]
            ${shouldAnimate ? 'translate-x-0' : 'translate-x-full'}
          `}
        >
          {/* Header */}
          <div className="flex items-start justify-between p-6 border-b border-border">
            <div className="flex-1 pr-4">
              {title && (
                <h2 className="text-xl font-semibold text-foreground">
                  {title}
                </h2>
              )}
              {description && (
                <p className="mt-1 text-sm text-muted-foreground">
                  {description}
                </p>
              )}
            </div>

            {/* Close Button */}
            <button
              onClick={onClose}
              className="p-2 -m-2 text-muted-foreground hover:text-foreground hover:bg-secondary rounded-lg transition-colors"
              aria-label="Close panel"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-6">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

