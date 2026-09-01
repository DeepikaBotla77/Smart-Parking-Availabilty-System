/**
 * Button — clean, professional dark theme.
 */
export default function Button({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  loading = false, 
  disabled = false, 
  className = '', 
  onClick, 
  type = 'button',
  icon,
  ...props 
}) {
  const baseStyles = 'inline-flex items-center justify-center font-medium rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#0B0F19] cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed';
  
  const variants = {
    primary: 'bg-primary text-white hover:bg-primary-dark focus:ring-primary/50',
    secondary: 'bg-secondary text-white hover:bg-secondary-dark focus:ring-secondary/50',
    outline: 'border border-[rgba(255,255,255,0.15)] text-gray-200 hover:bg-white/5 focus:ring-white/20',
    ghost: 'text-gray-400 hover:bg-white/5 hover:text-gray-200 focus:ring-white/10',
    danger: 'bg-danger text-white hover:bg-red-600 focus:ring-danger/50',
  };

  const sizes = {
    sm: 'px-3.5 py-2 text-sm gap-1.5',
    md: 'px-5 py-2.5 text-sm gap-2',
    lg: 'px-6 py-3 text-base gap-2',
  };

  return (
    <button
      type={type}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      onClick={onClick}
      disabled={disabled || loading}
      {...props}
    >
      {loading && (
        <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
        </svg>
      )}
      {icon && !loading && <span className="flex-shrink-0">{icon}</span>}
      {children}
    </button>
  );
}
