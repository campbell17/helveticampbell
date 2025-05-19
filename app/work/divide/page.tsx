import React from 'react';
import DivideContent from '../../components/projects/DivideContent';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Divide | Action/Adventure Game (PS4) | Tim Campbell',
  description: 'A character-driven, science fiction action/adventure game with a modern take on isometric adventures of the past. I designed the logo, UI assets, icons, menus, HUD, and map, as well as posters and branding for the in-game world.',
};

export default function DividePage() {
  return (
    <div className="project-page">
      <DivideContent />
    </div>
  );
} 