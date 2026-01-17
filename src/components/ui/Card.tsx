import React, { forwardRef } from 'react';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  as?: React.ElementType;
  hoverEffect?: boolean;
  rounded?: 'none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';
  shadow?: 'none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'inner' | 'none';
  bordered?: boolean;
  className?: string;
}

const Card = forwardRef<HTMLDivElement, CardProps>(({
  as: Component = 'div',
  hoverEffect = false,
  rounded = 'lg',
  shadow = 'md',
  bordered = true,
  className = '',
  children,
  ...props
}, ref) => {
  const baseStyles = 'overflow-hidden transition-all duration-300';
  
  const roundedStyles = {
    none: 'rounded-none',
    sm: 'rounded-sm',
    md: 'rounded-md',
    lg: 'rounded-lg',
    xl: 'rounded-xl',
    '2xl': 'rounded-2xl',
    full: 'rounded-full',
  };

  const shadowStyles = {
    none: 'shadow-none',
    sm: 'shadow-sm',
    md: 'shadow-md',
    lg: 'shadow-lg',
    xl: 'shadow-xl',
    '2xl': 'shadow-2xl',
    inner: 'shadow-inner',
  };

  const borderStyles = bordered ? 'border border-gray-200' : 'border-0';
  const hoverStyles = hoverEffect ? 'hover:shadow-lg hover:-translate-y-1' : '';

  const cardClasses = [
    baseStyles,
    roundedStyles[rounded],
    shadowStyles[shadow],
    borderStyles,
    hoverStyles,
    'bg-white',
    className,
  ].filter(Boolean).join(' ');

  return (
    <Component ref={ref} className={cardClasses} {...props}>
      {children}
    </Component>
  );
});

Card.displayName = 'Card';

interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  as?: React.ElementType;
}

const CardHeader = forwardRef<HTMLDivElement, CardHeaderProps>(({ 
  as: Component = 'div', 
  className = '', 
  ...props 
}, ref) => {
  return (
    <Component 
      ref={ref} 
      className={`px-6 py-4 border-b border-gray-100 ${className}`} 
      {...props} 
    />
  );
});

CardHeader.displayName = 'CardHeader';

interface CardBodyProps extends React.HTMLAttributes<HTMLDivElement> {
  as?: React.ElementType;
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

const CardBody = forwardRef<HTMLDivElement, CardBodyProps>(({ 
  as: Component = 'div', 
  padding = 'md',
  className = '', 
  ...props 
}, ref) => {
  const paddingStyles = {
    none: 'p-0',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
  };

  return (
    <Component 
      ref={ref} 
      className={`${paddingStyles[padding]} ${className}`} 
      {...props} 
    />
  );
});

CardBody.displayName = 'CardBody';

interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  as?: React.ElementType;
}

const CardFooter = forwardRef<HTMLDivElement, CardFooterProps>(({ 
  as: Component = 'div', 
  className = '', 
  ...props 
}, ref) => {
  return (
    <Component 
      ref={ref} 
      className={`px-6 py-4 border-t border-gray-100 bg-gray-50 ${className}`} 
      {...props} 
    />
  );
});

CardFooter.displayName = 'CardFooter';

export { Card, CardHeader, CardBody, CardFooter };
