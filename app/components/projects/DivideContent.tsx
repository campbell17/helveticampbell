import React from 'react';
import { H1, H2, H3, Overline } from '../Typography';
import Image from 'next/image';

const DivideContent: React.FC = () => {
  return (
    <div className="p-20 pt-0">
      <div className="mb-16">
        <H1 className="mb-4">Divide</H1>
        <p className="subheading">Branding, UI, game menus, HUD, icons, AR assets, world-building design.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
      </div>
    </div>
  );
}

export default DivideContent; 