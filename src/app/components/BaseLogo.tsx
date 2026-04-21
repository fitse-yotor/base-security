import { useState } from 'react';

/**
 * BASE SECURITY, CLEANING & TRADING PLC
 * Uses the real company logo image with SVG fallback
 */

// SVG fallback that closely matches the real logo style
function BaseLogoSVG({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 120 130"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      aria-label="BASE Security, Cleaning & Trading PLC"
    >
      <defs>
        <linearGradient id="goldBorder" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFD700" />
          <stop offset="40%" stopColor="#FFA500" />
          <stop offset="100%" stopColor="#B8860B" />
        </linearGradient>
        <linearGradient id="darkFill" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#2a2a2a" />
          <stop offset="100%" stopColor="#1a1a1a" />
        </linearGradient>
        <linearGradient id="goldText" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FFD700" />
          <stop offset="100%" stopColor="#CC8800" />
        </linearGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="1.5" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Outer gold shield */}
      <path
        d="M60 3 L112 22 L112 65 Q112 100 60 127 Q8 100 8 65 L8 22 Z"
        fill="url(#goldBorder)"
        filter="url(#glow)"
      />
      {/* Inner dark shield */}
      <path
        d="M60 10 L105 27 L105 65 Q105 96 60 120 Q15 96 15 65 L15 27 Z"
        fill="url(#darkFill)"
      />

      {/* Gear (top) */}
      <g transform="translate(60,36)" fill="url(#goldText)" filter="url(#glow)">
        {[0,30,60,90,120,150,180,210,240,270,300,330].map((a, i) => (
          <rect key={i} x="-2.5" y="-17" width="5" height="6" rx="1"
            transform={`rotate(${a})`} />
        ))}
        <circle cx="0" cy="0" r="9" fill="none" stroke="url(#goldText)" strokeWidth="3.5" />
        <circle cx="0" cy="0" r="4" fill="url(#goldText)" />
      </g>

      {/* Broom handle */}
      <line x1="55" y1="28" x2="68" y2="50" stroke="url(#goldText)" strokeWidth="3"
        strokeLinecap="round" filter="url(#glow)" />
      {/* Broom head */}
      <path d="M50 50 Q60 56 70 50 L68 58 Q60 64 52 58 Z"
        fill="url(#goldText)" filter="url(#glow)" />

      {/* Bucket */}
      <path d="M70 44 L76 44 L74 54 L68 54 Z" fill="url(#goldText)" filter="url(#glow)" />
      <ellipse cx="72" cy="44" rx="3" ry="1.5" fill="url(#goldText)" />

      {/* BASE text */}
      <text x="60" y="82" textAnchor="middle"
        fill="url(#goldText)" fontSize="22" fontWeight="900"
        fontFamily="Arial Black, Arial, sans-serif" letterSpacing="2"
        filter="url(#glow)">
        BASE
      </text>

      {/* Subtitle */}
      <text x="60" y="94" textAnchor="middle"
        fill="url(#goldText)" fontSize="6.5" fontWeight="600"
        fontFamily="Arial, sans-serif" letterSpacing="0.5">
        SECURITY, CLEANING
      </text>
      <text x="60" y="103" textAnchor="middle"
        fill="url(#goldText)" fontSize="6.5" fontWeight="600"
        fontFamily="Arial, sans-serif" letterSpacing="0.5">
        &amp; TRADING PLC
      </text>

      {/* Bottom glow sparkle */}
      <circle cx="105" cy="108" r="2" fill="#FFD700" opacity="0.8" />
      <circle cx="108" cy="112" r="1" fill="#FFD700" opacity="0.5" />
    </svg>
  );
}

export function BaseLogo({ className = 'w-12 h-12' }: { className?: string }) {
  const [imgError, setImgError] = useState(false);

  // Try loading from public folder first
  if (!imgError) {
    return (
      <img
        src="/logo.png"
        alt="BASE Security, Cleaning & Trading PLC"
        className={className}
        style={{ objectFit: 'contain' }}
        onError={() => setImgError(true)}
      />
    );
  }

  // Fallback to SVG
  return <BaseLogoSVG className={className} />;
}
