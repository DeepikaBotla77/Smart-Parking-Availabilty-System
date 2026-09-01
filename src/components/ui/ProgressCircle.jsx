import { useEffect, useState } from 'react';

/**
 * SVG-based circular progress indicator with animated fill.
 */
export default function ProgressCircle({ 
  value = 0, 
  max = 100, 
  size = 120, 
  strokeWidth = 10,
  color,
  label,
  sublabel,
  animated = true,
}) {
  const [animatedValue, setAnimatedValue] = useState(0);
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const percentage = (animatedValue / max) * 100;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  // Determine color based on value if not provided
  const getColor = () => {
    if (color) return color;
    if (percentage >= 70) return '#10B981';
    if (percentage >= 40) return '#F59E0B';
    return '#EF4444';
  };

  useEffect(() => {
    if (!animated) {
      setAnimatedValue(value);
      return;
    }
    let start = 0;
    const duration = 1500;
    const startTime = performance.now();
    
    const animate = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setAnimatedValue(Math.round(eased * value));
      if (progress < 1) requestAnimationFrame(animate);
    };
    
    requestAnimationFrame(animate);
  }, [value, animated]);

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="transform -rotate-90">
          {/* Background circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="currentColor"
            strokeWidth={strokeWidth}
            className="text-gray-200 dark:text-gray-700"
          />
          {/* Progress circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={getColor()}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            style={{ transition: animated ? 'stroke-dashoffset 1.5s cubic-bezier(0.4, 0, 0.2, 1)' : 'none' }}
          />
        </svg>
        {/* Center text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-2xl font-bold" style={{ color: getColor() }}>
            {animatedValue}
          </span>
          {sublabel && (
            <span className="text-xs text-text-secondary dark:text-text-dark-secondary">
              {sublabel}
            </span>
          )}
        </div>
      </div>
      {label && (
        <span className="text-sm font-medium text-text-secondary dark:text-text-dark-secondary">
          {label}
        </span>
      )}
    </div>
  );
}
