import React from 'react';
import FulcrumBrandingContent from '../../../components/projects/FulcrumBrandingContent';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Fulcrum Branding | Visual Identity & Marketing | Tim Campbell',
  description: 'Developing a cohesive visual identity that evolved with the company from startup to enterprise platform, including logos, marketing materials, and brand guidelines.',
};

export default function FulcrumBrandingPage() {
  return (
    <div className="project-page">
      <FulcrumBrandingContent />
    </div>
  );
} 