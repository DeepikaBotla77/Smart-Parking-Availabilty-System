/**
 * Card — #111827, 16px radius, consistent box-shadow.
 */
export default function Card({ 
  children, 
  className = '', 
  variant = 'default',
  hover = true,
  padding = 'p-6',
  onClick,
  style,
}) {
  return (
    <div
      className={`card ${padding} ${className}`}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      style={style}
    >
      {children}
    </div>
  );
}
