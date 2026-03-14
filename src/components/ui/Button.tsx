import { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface AppButtonProps {
  children: ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  icon?: ReactNode;
  fullWidth?: boolean;
  type?: 'button' | 'submit' | 'reset';
}

const variantClasses: Record<NonNullable<AppButtonProps['variant']>, string> = {
  primary:   'bg-violet-600 hover:bg-violet-500 text-white shadow-lg shadow-violet-900/30',
  secondary: 'bg-zinc-800 hover:bg-zinc-700 text-white border border-zinc-700',
  ghost:     'bg-transparent hover:bg-zinc-800/60 text-zinc-400 hover:text-white',
  danger:    'bg-red-600/10 hover:bg-red-600/20 text-red-400 border border-red-600/30',
};

const sizeClasses: Record<NonNullable<AppButtonProps['size']>, string> = {
  sm: 'px-3 py-1.5 text-xs gap-1.5',
  md: 'px-4 py-2 text-sm gap-2',
  lg: 'px-6 py-3 text-base gap-2',
};

export function AppButton({
  children,
  onClick,
  variant = 'primary',
  size = 'md',
  disabled,
  icon,
  fullWidth,
  type = 'button',
}: AppButtonProps) {
  return (
    <motion.button
      type={type}
      whileHover={disabled ? {} : { scale: 1.01 }}
      whileTap={disabled ? {} : { scale: 0.97 }}
      onClick={onClick}
      disabled={disabled}
      className={[
        'flex items-center justify-center font-medium rounded-lg transition-colors',
        variantClasses[variant],
        sizeClasses[size],
        fullWidth ? 'w-full' : '',
        disabled ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer',
      ].join(' ')}
    >
      {icon}
      {children}
    </motion.button>
  );
}
