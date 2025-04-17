'use client';

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 h-16 bg-black z-40">
      {/* Content area */}
      <div className="h-full px-8 py-4">
        {/* Add your header content here */}
      </div>
      
      {/* Masking edge */}
      <div 
        className="absolute bottom-0 left-0 right-0 h-4"
        style={{
          background: 'linear-gradient(to bottom, black, transparent)',
        }}
      />
    </header>
  );
} 