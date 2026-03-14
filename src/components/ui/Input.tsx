import { InputHTMLAttributes, forwardRef } from 'react';

interface AppInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const AppInput = forwardRef<HTMLInputElement, AppInputProps>(
  ({ label, error, className, ...props }, ref) => (
    <div className="flex flex-col gap-1">
      {label && (
        <label className="text-xs font-medium text-zinc-400 tracking-wide uppercase">
          {label}
        </label>
      )}
      <input
        ref={ref}
        className={[
          'bg-zinc-900 border rounded-lg px-3 py-2 text-white text-sm',
          'placeholder:text-zinc-600 focus:outline-none transition-colors',
          error ? 'border-red-500 focus:border-red-400' : 'border-zinc-700 focus:border-violet-500',
          className ?? '',
        ].join(' ')}
        {...props}
      />
      {error && <p className="text-xs text-red-400">{error}</p>}
    </div>
  )
);

AppInput.displayName = 'AppInput';
