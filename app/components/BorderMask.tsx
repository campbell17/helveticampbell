'use client';

import { useEffect, useRef } from 'react';

export default function BorderMask() {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const updateSvg = () => {
      if (!svgRef.current) return;
      
      const width = window.innerWidth;
      const height = window.innerHeight;
      const borderWidth = 40; // Border thickness in pixels
      
      // Create SVG path for the border
      const path = `
        M 0,0
        L ${width},0
        L ${width},${height}
        L 0,${height}
        Z
        M ${borderWidth},${borderWidth}
        L ${width - borderWidth},${borderWidth}
        L ${width - borderWidth},${height - borderWidth}
        L ${borderWidth},${height - borderWidth}
        Z
      `;
      
      svgRef.current.setAttribute('width', width.toString());
      svgRef.current.setAttribute('height', height.toString());
      svgRef.current.querySelector('path')?.setAttribute('d', path);
    };

    updateSvg();
    window.addEventListener('resize', updateSvg);
    return () => window.removeEventListener('resize', updateSvg);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      <svg 
        ref={svgRef}
        className="w-full h-full"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          zIndex: 50,
        }}
      >
        <path
          fill="black"
          fillRule="evenodd"
          d="M 0,0 L 0,0 L 0,0 L 0,0 Z M 0,0 L 0,0 L 0,0 L 0,0 Z"
        />
      </svg>
    </div>
  );
} 