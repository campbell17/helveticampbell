'use client';

export default function Footer() {
  return (
    <footer className="fixed bottom-0 left-0 right-0 h-16 bg-black z-40">
      {/* Masking edge */}
      <div 
        className="absolute top-0 left-0 right-0 h-4"
        style={{
          background: 'linear-gradient(to top, black, transparent)',
        }}
      />
      
      {/* Content area */}
      <div className="h-full px-8 py-4">
        {/* Add your footer content here */}
      </div>
    </footer>
  );
} 