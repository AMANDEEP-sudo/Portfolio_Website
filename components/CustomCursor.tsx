'use client';

import { useEffect, useRef } from 'react';

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const cursor = cursorRef.current;
      const dot = dotRef.current;

      if (cursor) {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
      }

      if (dot) {
        dot.style.left = e.clientX + 'px';
        dot.style.top = e.clientY + 'px';
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <>
      <div
        ref={dotRef}
        suppressHydrationWarning
        className="fixed pointer-events-none z-50 w-2 h-2 bg-accent rounded-full mix-blend-screen"
        style={{
          transform: 'translate(-50%, -50%)',
          transition: 'opacity 0.3s ease',
          left: '0px',
          top: '0px',
        }}
      />
      <div
        ref={cursorRef}
        suppressHydrationWarning
        className="fixed pointer-events-none z-50 w-6 h-6 border-2 border-accent rounded-full mix-blend-screen"
        style={{
          transform: 'translate(-50%, -50%)',
          opacity: 0.7,
          left: '0px',
          top: '0px',
        }}
      />
    </>
  );
}
