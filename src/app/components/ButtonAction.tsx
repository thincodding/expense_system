import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  variant?: 'primary' | 'danger' | 'success' | 'default';
  className?: string;
  disabled?: boolean;
}


const ButtonAction: React.FC<ButtonProps> = ({
  children,
  onClick,
  type = 'button',
  variant = 'default',
  className = '',
  disabled = false
}) => {
  const baseStyle = 'p-2 text-sm cursor-pointer rounded transition-colors duration-200';

  const variants: Record<string, string> = {
    default: 'bg-gray-200 text-black hover:bg-gray-300',
    primary: 'bg-blue-600 text-white hover:bg-blue-500',
    danger: 'bg-red-600 text-white hover:bg-red-500',
    success: 'bg-green-600 text-white hover:bg-green-500',
  };

  const combinedClassName = `${baseStyle} ${variants[variant]} ${className}`.trim();

  return (
    <button
      type={type}
      onClick={onClick}
      className={combinedClassName}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default ButtonAction;

