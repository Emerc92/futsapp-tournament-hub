
import React from 'react';
import { cn } from '@/lib/utils';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'full' | 'icon' | 'text';
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ 
  size = 'md', 
  variant = 'full',
  className 
}) => {
  const sizeClasses = {
    sm: 'h-8',
    md: 'h-12',
    lg: 'h-16',
    xl: 'h-24'
  };

  const textSizeClasses = {
    sm: 'text-lg',
    md: 'text-2xl',
    lg: 'text-3xl',
    xl: 'text-5xl'
  };

  const iconSize = {
    sm: 32,
    md: 48,
    lg: 64,
    xl: 96
  };

  // Logo Icon Component
  const LogoIcon = ({ size: iconSizeValue }: { size: number }) => (
    <div className="relative">
      <svg
        width={iconSizeValue}
        height={iconSizeValue}
        viewBox="0 0 100 100"
        className="drop-shadow-lg"
      >
        {/* Gradient Definitions */}
        <defs>
          <linearGradient id="ballGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#10b981" />
            <stop offset="100%" stopColor="#059669" />
          </linearGradient>
          <linearGradient id="fieldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#22c55e" />
            <stop offset="100%" stopColor="#16a34a" />
          </linearGradient>
        </defs>
        
        {/* Campo da calcio stilizzato come sfondo */}
        <rect
          x="10"
          y="25"
          width="80"
          height="50"
          rx="8"
          fill="url(#fieldGradient)"
          stroke="#166534"
          strokeWidth="2"
        />
        
        {/* Linee del campo */}
        <line x1="50" y1="25" x2="50" y2="75" stroke="#bbf7d0" strokeWidth="1.5" />
        <circle cx="50" cy="50" r="12" fill="none" stroke="#bbf7d0" strokeWidth="1.5" />
        <circle cx="50" cy="50" r="2" fill="#bbf7d0" />
        
        {/* Pallone da calcio stilizzato */}
        <circle
          cx="50"
          cy="35"
          r="12"
          fill="url(#ballGradient)"
          stroke="#047857"
          strokeWidth="2"
        />
        
        {/* Pattern esagonale sul pallone */}
        <polygon
          points="50,26 56,30 56,36 50,40 44,36 44,30"
          fill="#065f46"
          opacity="0.7"
        />
        <polygon
          points="50,28 54,31 54,35 50,38 46,35 46,31"
          fill="#10b981"
          opacity="0.8"
        />
        
        {/* Trofeo stilizzato */}
        <path
          d="M 40 80 L 45 70 L 55 70 L 60 80 Z"
          fill="#fbbf24"
          stroke="#f59e0b"
          strokeWidth="1"
        />
        <rect x="46" y="75" width="8" height="5" fill="#f59e0b" />
        <ellipse cx="50" cy="70" rx="6" ry="3" fill="#fcd34d" />
      </svg>
    </div>
  );

  if (variant === 'icon') {
    return (
      <div className={cn('flex items-center justify-center', className)}>
        <LogoIcon size={iconSize[size]} />
      </div>
    );
  }

  if (variant === 'text') {
    return (
      <div className={cn('flex items-center', className)}>
        <span className={cn(
          'font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent',
          textSizeClasses[size]
        )}>
          Futs<span className="text-yellow-500">App</span>
        </span>
      </div>
    );
  }

  return (
    <div className={cn('flex items-center space-x-3', className)}>
      <LogoIcon size={iconSize[size]} />
      <span className={cn(
        'font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent',
        textSizeClasses[size]
      )}>
        Futs<span className="text-yellow-500">App</span>
      </span>
    </div>
  );
};

export default Logo;
