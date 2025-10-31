
import React from 'react';

const StethoscopeIcon: React.FC<{ className?: string }> = ({ className }) => (
  // FIX: Removed duplicate strokeLinecap and strokeLinejoin properties.
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4a2 2 0 012-2h12a2 2 0 012 2v2a2 2 0 01-2 2h-2.34a1 1 0 00-.94.69L12 14.5l-2.72-6.81a1 1 0 00-.94-.69H6a2 2 0 01-2-2V4z" />
    <path d="M12 14.5V19a2 2 0 002 2h0a2 2 0 002-2v-1" />
    <path d="M12 14.5V19a2 2 0 01-2 2h0a2 2 0 01-2-2v-1" />
    <circle cx="12" cy="14.5" r="2.5" />
  </svg>
);

export default StethoscopeIcon;
