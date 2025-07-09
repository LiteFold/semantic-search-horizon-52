import React from 'react';

interface HeroHeadingProps {
  children: React.ReactNode;
  className?: string;
}

export function HeroHeading({ children, className = '' }: HeroHeadingProps) {
  return (
    <h1 className={`text-4xl md:text-5xl lg:text-6xl font-serif font-semibold text-center ${className}`}>
      {children}
    </h1>
  );
}

// Example usage:
// <HeroHeading>Build Tomorrow, Today.</HeroHeading> 