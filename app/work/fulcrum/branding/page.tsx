import React from 'react';
import FulcrumContent from '../../../components/projects/FulcrumContent';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Fulcrum Evolution | Branding & Identity | Tim Campbell',
  description: 'As the primary designer for Fulcrum, I led the product\'s visual and user experience evolution, helping build it into a comprehensive enterprise field operations platform used by thousands of organizations worldwide.',
};

export default function FulcrumBrandingPage() {
  return (
    <div className="project-page">
      <FulcrumContent />
    </div>
  );
} 