/**
 * Professional loading spinner with multiple style options.
 */
export default function LoadingSpinner({ size = 'md', text = '', className = '' }) {
  const sizes = {
    sm: 'w-6 h-6',
    md: 'w-10 h-10',
    lg: 'w-16 h-16',
  };

  return (
    <div className={`flex flex-col items-center justify-center gap-3 ${className}`}>
      <div className={`${sizes[size]} relative`}>
        <div className="absolute inset-0 rounded-full border-4 border-gray-200 dark:border-gray-700" />
        <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-primary animate-spin" />
      </div>
      {text && (
        <p className="text-sm font-medium text-text-secondary dark:text-text-dark-secondary animate-pulse">
          {text}
        </p>
      )}
    </div>
  );
}
