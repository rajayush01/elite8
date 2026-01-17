import React from 'react';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  color?: 'primary' | 'white' | 'gray';
  className?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 'md',
  color = 'primary',
  className = '',
}) => {
  const sizeClasses = {
    sm: 'h-4 w-4 border-2',
    md: 'h-8 w-8 border-2',
    lg: 'h-12 w-12 border-4',
  };

  const colorClasses = {
    primary: 'border-t-primary-600',
    white: 'border-t-white',
    gray: 'border-t-gray-400',
  };

  return (
    <div className={`inline-block ${className}`} role="status">
      <div
        className={`animate-spin rounded-full ${sizeClasses[size]} ${colorClasses[color]} border-solid border-transparent`}
        style={{
          animation: 'spin 1s linear infinite',
        }}
        aria-hidden="true"
      >
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
};

export default LoadingSpinner;
