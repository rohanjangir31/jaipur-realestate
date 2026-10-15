import React from 'react';

/**
 * Jaipur Estates Official Vector Architectural Logo Mark
 * Designed with authentic Rajasthani architectural geometry:
 * - Tripartite Portal (Buy, Invest, Stay)
 * - Cusped Jharokha arch contour
 * - Foundation Plinth (Bedrock stability)
 * - Suryavanshi Solar Keystone (Jaipur's solar heritage & prosperity)
 */
export function LogoIcon({ className = 'w-9 h-9', variant = 'dark' }) {
  const isLight = variant === 'light';
  
  const plinthColor = isLight ? '#994126' : '#C86241';
  const mainArchColor = isLight ? '#161513' : '#FAF8F5';
  const wingArchColor = isLight ? '#8C5E35' : '#D4A373';
  const keystoneColor = isLight ? '#B37D28' : '#E3A857';

  return (
    <svg
      className={`${className} shrink-0 transition-transform duration-200 group-hover:scale-105`}
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Jaipur Estates Architectural Mark"
    >
      {/* Ground Foundation Plinth (Durability & Land) */}
      <line x1="16" y1="104" x2="104" y2="104" stroke={plinthColor} strokeWidth="5" strokeLinecap="round" />
      <line x1="26" y1="99" x2="94" y2="99" stroke={keystoneColor} strokeWidth="2" strokeLinecap="round" strokeOpacity="0.75" />

      {/* Central Grand Arch (Stay / Sovereign Haveli Realm) */}
      <path
        d="M44 99V58C44 58 44 42 60 30C76 42 76 58 76 58V99"
        stroke={mainArchColor}
        strokeWidth="5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      
      {/* Cusped Inner Arch Accent */}
      <path
        d="M50 99V62C50 56 54 48 60 42C66 48 70 56 70 62V99"
        stroke={plinthColor}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Left Wing Arch (Buy / Residential Foundation) */}
      <path
        d="M22 99V70C22 70 22 58 33 50C44 58 44 70 44 70V99"
        stroke={wingArchColor}
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Right Wing Arch (Invest / Commercial Capital) */}
      <path
        d="M76 99V70C76 70 76 58 87 50C98 58 98 70 98 99"
        stroke={wingArchColor}
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* The Suryavanshi Keystone / Diamond Apex */}
      <polygon points="60,16 65,23 60,30 55,23" fill={keystoneColor} />
      <circle cx="60" cy="23" r="1.5" fill="#FAF8F5" />
    </svg>
  );
}

/**
 * Full Brand Lockup with tailored optical typography
 */
export default function Logo({
  variant = 'dark',
  showSubtitle = true,
  className = '',
  size = 'md',
}) {
  const isLight = variant === 'light';

  const titlePrimary = isLight ? 'text-stone-900' : 'text-stone-100';
  const titleAccent = isLight ? 'text-[#994126]' : 'text-terracotta-400';
  const subtitleColor = isLight ? 'text-stone-500' : 'text-stone-400';

  const iconSizes = {
    sm: 'w-7 h-7',
    md: 'w-9 h-9',
    lg: 'w-12 h-12',
  };

  const titleSizes = {
    sm: 'text-base',
    md: 'text-lg sm:text-xl',
    lg: 'text-2xl',
  };

  return (
    <div className={`flex items-center gap-3 group ${className}`}>
      <LogoIcon className={iconSizes[size] || iconSizes.md} variant={variant} />
      
      <div className="flex flex-col">
        <div className="flex items-baseline gap-1">
          <span className={`font-serif font-bold tracking-tight ${titleSizes[size] || titleSizes.md} ${titlePrimary}`}>
            Jaipur
          </span>
          <span className={`font-serif font-normal ${titleSizes[size] || titleSizes.md} ${titleAccent}`}>
            Estates
          </span>
        </div>

        {showSubtitle && (
          <span className={`text-[10px] sm:text-[11px] font-sans tracking-wide uppercase ${subtitleColor} -mt-0.5`}>
            Property &amp; Hospitality Bureau
          </span>
        )}
      </div>
    </div>
  );
}
