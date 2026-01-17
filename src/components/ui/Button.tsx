import React, { forwardRef, ForwardedRef } from 'react';
import LoadingSpinner from './LoadingSpinner';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'link';
type ButtonSize = 'sm' | 'md' | 'lg';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
  as?: React.ElementType;
  href?: string;
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      variant = 'primary',
      size = 'md',
      isLoading = false,
      disabled = false,
      className = '',
      leftIcon,
      rightIcon,
      fullWidth = false,
      as: Component = 'button',
      ...props
    },
    ref: ForwardedRef<HTMLButtonElement>
  ) => {
    const baseStyles = 'inline-flex items-center justify-center rounded-md font-medium transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-60 disabled:pointer-events-none';
    
    const sizeStyles: Record<ButtonSize, string> = {
      sm: 'text-xs px-3 py-1.5',
      md: 'text-sm px-4 py-2',
      lg: 'text-base px-6 py-3',
    };

    const variantStyles: Record<ButtonVariant, string> = {
      primary: 'bg-primary-600 text-white hover:bg-primary-700 focus:ring-primary-500',
      secondary: 'bg-secondary-500 text-gray-900 hover:bg-secondary-600 focus:ring-secondary-400',
      outline: 'bg-transparent border border-gray-300 text-gray-700 hover:bg-gray-50 focus:ring-primary-500',
      ghost: 'bg-transparent text-gray-700 hover:bg-gray-100 focus:ring-primary-500',
      link: 'bg-transparent text-primary-600 hover:text-primary-700 hover:underline p-0 focus:ring-0',
    };

    const buttonClasses = [
      baseStyles,
      sizeStyles[size as ButtonSize] || sizeStyles.md,
      variantStyles[variant],
      fullWidth ? 'w-full' : '',
      className,
    ].filter(Boolean).join(' ');

    const content = (
      <>
        {isLoading && (
          <span className="mr-2">
            <LoadingSpinner size={size === 'sm' ? 'sm' : 'md'} color={variant === 'primary' ? 'white' : 'primary'} />
          </span>
        )}
        {!isLoading && leftIcon && <span className="mr-2">{leftIcon}</span>}
        {children}
        {rightIcon && <span className="ml-2">{rightIcon}</span>}
      </>
    );

    const buttonType = Component === 'button' ? { type: 'button' as const } : {};

    if (Component === 'button') {
      return (
        <button
          ref={ref}
          className={buttonClasses}
          disabled={disabled || isLoading}
          {...buttonType}
          {...props}
        >
          {content}
        </button>
      );
    }

    // For other elements, we need to cast the ref to any to avoid type errors
    return (
      <Component
        ref={ref as any}
        className={buttonClasses}
        {...buttonType}
        {...props}
      >
        {content}
      </Component>
    );
  }
);

Button.displayName = 'Button';

export default Button;
