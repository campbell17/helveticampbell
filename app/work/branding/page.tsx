import React from 'react';
import BrandingContent from '../../components/projects/BrandingContent';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Branding | Logo Design & Identity | Tim Campbell',
  description: 'Various logo and identity work for businesses across industries.',
};

export default function BrandingPage() {
  return (
    <div className="project-page">
      <BrandingContent />
    </div>
  );
} 